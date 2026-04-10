import { proxy, ref } from "valtio";
import { Stream, StreamSignal } from "./stream";
import { CommandsManager } from "./commands";
import { Ansi, clamp, removeFromArray, Vector2 } from "@prozilla-os/shared";
import { EXIT_CODE, HOSTNAME, USERNAME, WELCOME_MESSAGE } from "../../constants/shell.const";
import { App } from "../apps/app";
import { VirtualFolder, VirtualRoot } from "../virtual-drive";
import { SettingsManager } from "../settings/settingsManager";
import { SystemManager } from "../system/systemManager";

export interface HistoryEntry {
	text?: string;
	isInput: boolean;
	value?: string;
	clear?: boolean;
}

export interface ShellConfig {
	app?: App;
	path?: string;
	input?: string;
	virtualRoot: VirtualRoot;
	systemManager: SystemManager;
	settingsManager: SettingsManager;
	exit: () => void;
	sizeRef: { current: Vector2 };
}

export interface ShellState {
	history: HistoryEntry[];
	inputValue: string;
	historyIndex: number;
	currentDirectory: VirtualFolder;
	prefix: string;
	stream: Stream | null;
	streamOutput: string | null;
}

export interface ProcessIO {
	stdin: Stream;
	stdout: Stream;
	stderr: Stream;
}

export interface Process extends ProcessIO {
	commandName: string;
}

export interface ShellContext extends ProcessIO {
	out: (text: string) => void;
	pushHistory: (entry: HistoryEntry) => void;
	execute: (command: string, streams?: { stdout?: Stream, stderr?: Stream }) => Promise<number>;
	virtualRoot: VirtualRoot;
	currentDirectory: VirtualFolder;
	setCurrentDirectory: (directory: VirtualFolder) => void;
	username: string;
	hostname: string;
	rawInputValue: string;
	options: string[];
	exit: () => void;
	kill: (signal?: StreamSignal) => void;
	inputs: Record<string, string>;
	timestamp: number;
	settingsManager: SettingsManager;
	systemManager: SystemManager;
	app?: App;
	readonly size: Vector2;
};

export class Shell {
	state;
	config;
	pipeline: Process[] = [];

	constructor(config: ShellConfig) {
		this.config = config;
		this.state = proxy<ShellState>({
			history: [{
				text: config.app ? WELCOME_MESSAGE.replace("$APP_NAME", config.app.name) : WELCOME_MESSAGE,
				isInput: false,
			}],
			inputValue: config.input ?? "",
			historyIndex: 0,
			currentDirectory: config.virtualRoot.navigate(config.path ?? "~") as VirtualFolder,
			prefix: "",
			stream: null,
			streamOutput: null,
		});
		this.updatePrefix();
	}

	kill(signal: StreamSignal = "SIGTERM"): void {
		if (signal === "SIGKILL") {
			this.config.exit();
			return;
		}

		const isInterrupt = signal === "SIGINT";
		const hasActiveStream = this.state.stream != null;

		if (hasActiveStream) {
			if (this.state.streamOutput) {
				this.pushHistory({ text: this.state.streamOutput, isInput: false });
			}
			this.state.stream?.signal(signal);
			this.state.stream = null;
			this.state.streamOutput = null;
		}

		if (this.pipeline.length > 0) {
			this.pipeline.forEach((process) => process.stdin.signal(signal));
			this.pipeline = [];
		}

		if (isInterrupt && !hasActiveStream) {
			this.pushHistory({
				text: this.state.prefix + this.state.inputValue + "^C",
				isInput: true,
				value: this.state.inputValue,
			});
			this.resetInput();
		}
	}

	interrupt(): void {
		this.kill("SIGINT");
	}

	updatePrefix() {
		this.state.prefix = Ansi.cyan(`${USERNAME}@${HOSTNAME}`) + ":"
            + Ansi.blue(`${this.state.currentDirectory.root ? "/" : this.state.currentDirectory.path}`) + "$ ";
	}

	setInputValue(value: string | ((prev: string) => string)) {
		if (typeof value === "function") {
			this.state.inputValue = value(this.state.inputValue);
		} else {
			this.state.inputValue = value;
		}
	}

	pushHistory(entry: HistoryEntry) {
		this.state.history.push(entry);
	}

	out(text: string) {
		let remainingText = text;
		if (remainingText.includes("\x1b[2J") || remainingText.includes("\x1b[H")) {
			this.pushHistory({ clear: true, isInput: false });
			this.state.streamOutput = null;
			// eslint-disable-next-line no-control-regex
			remainingText = remainingText.replace(/\x1b\[2J|\x1b\[H/g, "");
		}

		if (remainingText === "") return;

		if (this.state.stream) {
			if (this.state.streamOutput) {
				this.pushHistory({ text: this.state.streamOutput, isInput: false });
			}
			this.state.streamOutput = remainingText;
		} else {
			this.pushHistory({ text: remainingText, isInput: false });
		}
	}

	async submitInput(value: string) {
		this.resetInput();
		return await this.execute(value);
	}

	async execute(input: string, streams?: { stdout?: Stream, stderr?: Stream }) {
		const previousPipeline = this.pipeline;
		const previousStream = this.state.stream;

		if (!streams)
			this.pushHistory({ text: this.state.prefix + input, isInput: true, value: input });

		const commandStrings = input.split("|")
			.map((string) => string.trim())
			.filter((string) => string !== "");

		if (commandStrings.length === 0) return EXIT_CODE.success;

		this.pipeline = commandStrings.map((commandString) => ({
			stdin: new Stream(),
			stdout: new Stream(),
			stderr: new Stream(),
			commandName: commandString.split(" ")[0].toLowerCase(),
		}));

		this.pipeline.forEach((process, i) => {
			const isLast = i === this.pipeline.length - 1;

			if (!isLast) {
				process.stdout.pipe(this.pipeline[i + 1].stdin);
			} else if (streams?.stdout) {
				process.stdout.pipe(streams.stdout);
			} else {
				process.stdout.on(Stream.DATA_EVENT, (data) => this.out(data));
			}

			if (streams?.stderr) {
				process.stderr.pipe(streams.stderr);
			} else {
				process.stderr.on(Stream.DATA_EVENT, (data) => this.out(data));
			}
		});

		const lastProcess = this.pipeline[this.pipeline.length - 1];
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (lastProcess) this.state.stream = ref(lastProcess.stdin);

		const tasks = this.pipeline.map((process, i) => {
			process.stdin.start();
			process.stdout.start();
			process.stderr.start();
			return this.spawn(process, commandStrings[i]);
		});

		const exitCodes = await Promise.all(tasks);

		if (!streams && this.state.streamOutput) {
			this.pushHistory({ text: this.state.streamOutput, isInput: false });
		}

		this.state.stream = null;
		this.pipeline = previousPipeline;
		this.state.stream = previousStream;

		if (!previousStream) this.state.streamOutput = null;

		return exitCodes[exitCodes.length - 1] ?? EXIT_CODE.success;
	}

	async spawn(process: Process, rawLine: string) {
		const { stdin, stdout, stderr, commandName } = process;
		const timestamp = Date.now();

		const args = rawLine.match(/(?:[^\s"]+|"[^"]*")+/g);
		if (!args)
			return EXIT_CODE.generalError;
		if (args[0].toLowerCase() === "sudo")
			args.shift();
		args.shift();

		const command = CommandsManager.find(commandName);

		if (!command)
			return Shell.writeError(stderr, commandName, "Command not found", EXIT_CODE.commandNotFound);

		const options: string[] = [];
		const inputs: Record<string, string> = {};
		args.filter((arg) => arg.startsWith("-")).forEach((option) => {
			const addOption = (key: string) => {
				const commandOption = command.getOption(key);
				key = commandOption?.short ?? key;

				if (options.includes(key))
					return;

				options.push(key);

				if (commandOption?.isInput) {
					const index = args.indexOf(option);
					const value = args[index + 1];
					inputs[commandOption.short] = value;
					removeFromArray(value, args);
				}
			};

			if (option.startsWith("--")) {
				addOption(option.substring(2).toLowerCase());
			} else {
				option.substring(1).split("").forEach((s) => addOption(s));
			}

			removeFromArray(option, args);
		});

		if (command.requireArgs && args.length === 0)
			return Shell.writeError(stderr, commandName, "Requires at least 1 argument");

		try {
			const exitCode = await command.execute(args, {
				stdin, stdout, stderr,
				out: this.out.bind(this),
				pushHistory: this.pushHistory.bind(this),
				execute: this.execute.bind(this),
				virtualRoot: this.config.virtualRoot,
				currentDirectory: this.state.currentDirectory,
				setCurrentDirectory: (dir: VirtualFolder) => {
					this.state.currentDirectory = dir;
					this.updatePrefix();
				},
				username: USERNAME,
				hostname: HOSTNAME,
				rawInputValue: rawLine.substring(rawLine.indexOf(" ") + 1),
				options,
				exit: () => this.kill("SIGKILL"),
				kill: this.kill.bind(this),
				inputs,
				timestamp,
				settingsManager: this.config.settingsManager,
				systemManager: this.config.systemManager,
				app: this.config.app!,
				size: this.config.sizeRef.current,
			});

			return exitCode ?? EXIT_CODE.success;
		} catch (error) {
			console.error(error);
			return Shell.writeError(stderr, commandName, "Command failed");
		} finally {
			stdin.stop();
			stdout.stop();
			stderr.stop();
		}
	}

	resetInput() {
		this.state.inputValue = "";
		this.state.historyIndex = 0;
	}

	updateHistoryIndex(delta: number) {
		const inputHistory = this.state.history.filter(({ isInput }) => isInput);
		const index = clamp(this.state.historyIndex + delta, 0, inputHistory.length);

		if (index === this.state.historyIndex) {
			if (delta < 0)
				this.state.inputValue = "";
			return;
		}

		this.state.inputValue = index === 0 ? "" : inputHistory[inputHistory.length - index].value ?? "";
		this.state.historyIndex = index;
	}

	static writeError(stream: Stream, commandName: string, error: string, exitCode: number = EXIT_CODE.generalError) {
		stream.write(Ansi.red(`${commandName}: ${error}`));
		return exitCode;
	}

	static animate({ stdout, stdin, render, delay, clear = true }: Pick<ShellContext, "stdout" | "stdin"> & { render: (frame: number) => string, delay: number, clear?: boolean }) {
		let frame = 0;

		const interval = setInterval(() => {
			let content = render(frame);

			if (clear) {
				content = "\x1b[2J\x1b[H" + content;
			}

			stdout.write(content);
			frame++;

			if (content.trim().length === 0 && frame > 1) {
				clearInterval(interval);
				stdin.stop();
			}
		}, delay);

		stdin.on(Stream.STOP_EVENT, () => {
			clearInterval(interval);
		});

		return stdin.wait(EXIT_CODE.success);
	}
}
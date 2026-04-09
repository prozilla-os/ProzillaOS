import { proxy } from "valtio";
import { Stream } from "./stream";
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
		if (this.state.stream) this.state.streamOutput = text;
		else this.pushHistory({ text, isInput: false });
	}

	async submitInput(value: string) {
		this.state.inputValue = "";
		this.state.historyIndex = 0;
		return await this.execute(value);
	}

	stop() {
		if (this.state.stream) {
			this.state.stream.stop();
			this.state.stream = null;
			this.state.streamOutput = null;
		}

		if (!this.pipeline.length)
			return;

		this.pipeline.forEach((proc) => {
			proc.stdin.stop();
			proc.stdout.stop();
			proc.stderr.stop();
		});
		this.pipeline = [];
		this.out("^C\n");
	}

	async execute(input: string, streams?: { stdout?: Stream, stderr?: Stream }) {
		this.pushHistory({
			text: this.state.prefix + input,
			isInput: true,
			value: input,
		});

		const commandStrings = input.split("|").map((s) => s.trim()).filter((s) => s !== "");
    
		if (commandStrings.length === 0) 
			return EXIT_CODE.success;

		this.pipeline = commandStrings.map((cmdStr) => ({
			stdin: new Stream(),
			stdout: new Stream(),
			stderr: new Stream(),
			commandName: cmdStr.split(" ")[0].toLowerCase(),
		}));

		this.pipeline.forEach((proc, i) => {
			const isLast = i === this.pipeline.length - 1;

			if (!isLast) {
				proc.stdout.pipe(this.pipeline[i + 1].stdin);
			} else {
				if (streams?.stdout) proc.stdout.pipe(streams.stdout);
				else proc.stdout.on(Stream.DATA_EVENT, (data) => this.out(data));
			}

			if (streams?.stderr) proc.stderr.pipe(streams.stderr);
			else proc.stderr.on(Stream.DATA_EVENT, (data) => this.out(data));
		});

		const tasks = this.pipeline.map((process, i) => {
			process.stdin.start();
			process.stdout.start();
			process.stderr.start();
			return this.spawn(process, commandStrings[i]);
		});

		this.resetInput();
    
		const exitCodes = await Promise.all(tasks);
		this.pipeline = [];

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
				exit: this.config.exit,
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

	static animate({ stdout, stdin }: Pick<ShellContext, "stdout" | "stdin">, getFrame: (frame: number) => string, delay: number) {
		let frame = 0;

		const interval = setInterval(() => {
			const content = getFrame(frame);
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
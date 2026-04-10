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
	/** The application that owns this shell. */
	app?: App;
	/** The initial working directory. */
	path?: string;
	/** The initial input. */
	input?: string;
	virtualRoot: VirtualRoot;
	systemManager: SystemManager;
	settingsManager: SettingsManager;
	/** Function that closes this shell. */
	exit: () => void;
	/** Ref object with the size of the shell, measured in rows and columns. */
	sizeRef: { current: Vector2 };
}

export interface ShellState {
	/** The history of the shell. */
	history: HistoryEntry[];
	/** The current input value. */
	inputValue: string;
	/** The index of the selected history entry. */
	historyIndex: number;
	/** The working directory. */
	currentDirectory: VirtualFolder;
	prefix: string;
	/** The active stream. */
	stream: Stream | null;
	/** The output of the active stream. */
	ttyBuffer: string | null;
	/** Whether the shell is currently using the alternate screen. */
	isUsingAltScreen: boolean;
}

export interface ProcessIO {
	/** Standard input stream. */
	stdin: Stream;
	/** Standard output stream. */
	stdout: Stream;
	/** Standard error stream. */
	stderr: Stream;
}

export interface Process extends ProcessIO {
	/** Name of the command that is being executed by this process. */
	commandName: string;
	/** The parsed arguments for the command. */
	args: string[];
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

/**
 * Simulates a Unix-like shell.
 */
export class Shell {
	state: ShellState;
	config: ShellConfig;
	pipeline: Process[] = [];

	static readonly COMMAND_NOT_FOUND_ERROR = "Command not found";
	static readonly MISSING_ARGS_ERROR = "requires at least 1 argument";
	static readonly MISSING_OPTIONS_ERROR = "requires at least 1 option";
	static readonly COMMAND_FAILED_ERROR = "Command failed";
	static readonly USAGE_ERROR = "Incorrect usage";

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
			ttyBuffer: null,
			isUsingAltScreen: false,
		});
		this.updatePrefix();
	}

	/**
	 * Sends a signal to the shell.
	 */
	kill(signal: StreamSignal = "SIGTERM") {
		if (signal === "SIGKILL") {
			this.config.exit();
			return;
		}

		const isInterrupt = signal === "SIGINT";
		const hasActiveStream = this.state.stream != null;

		if (hasActiveStream) {
			// Commit buffer only if not in alt screen
			if (this.state.ttyBuffer && !this.state.isUsingAltScreen) {
				this.pushHistory({ text: this.state.ttyBuffer, isInput: false });
			}
			
			this.state.stream?.signal(signal);
			this.state.stream = null;
			this.state.ttyBuffer = null;
			this.state.isUsingAltScreen = false;
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

	/**
	 * Sends the interrupt signal to the shell.
	 */
	interrupt() {
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

		if (remainingText.includes("\x1b[?1049h")) {
			this.state.isUsingAltScreen = true;
			// eslint-disable-next-line no-control-regex
			remainingText = remainingText.replace(/\x1b\[\?1049h/g, "");
		}

		if (remainingText.includes("\x1b[?1049l")) {
			this.state.isUsingAltScreen = false;
			this.state.ttyBuffer = null;
			// eslint-disable-next-line no-control-regex
			remainingText = remainingText.replace(/\x1b\[\?1049l/g, "");
		}

		if (remainingText.includes("\x1b[2J") || remainingText.includes("\x1b[H")) {
			// Only push clear to history if we are not in the alternate screen
			if (!this.state.isUsingAltScreen) {
				this.pushHistory({ clear: true, isInput: false });
			}
			this.state.ttyBuffer = null;
			// eslint-disable-next-line no-control-regex
			remainingText = remainingText.replace(/\x1b\[2J|\x1b\[H/g, "");
		}

		if (remainingText === "") return;

		if (this.state.stream || this.state.isUsingAltScreen) {
			if (this.state.ttyBuffer && !this.state.isUsingAltScreen) {
				this.pushHistory({ text: this.state.ttyBuffer, isInput: false });
			}
			this.state.ttyBuffer = remainingText;
		} else {
			this.pushHistory({ text: remainingText, isInput: false });
		}
	}

	async submitInput(value: string) {
		this.resetInput();
		return await this.execute(value);
	}

	/**
	 * Parses and executes an input string.
	 * @param input - The input string.
	 * @param streams - Optional overrides for output Streams.
	 * @returns The final exit code.
	 */
	async execute(input: string, streams?: { stdout?: Stream, stderr?: Stream }) {
		const previousPipeline = this.pipeline;
		const previousStream = this.state.stream;

		if (!streams)
			this.pushHistory({ text: this.state.prefix + input, isInput: true, value: input });

		const commandStrings = input.match(/(?:[^|"]+|"[^"]*")+/g)
			?.map((string) => string.trim())
			.filter((string) => string !== "") ?? [];

		if (commandStrings.length === 0) return EXIT_CODE.success;

		this.pipeline = commandStrings.map((commandString) => {
			const args = Shell.parseCommand(commandString);
			let commandName = args[0]?.toLowerCase() ?? "";

			if (commandName === "sudo" && args.length > 1) {
				commandName = args[1].toLowerCase();
			}

			return {
				stdin: new Stream(),
				stdout: new Stream(),
				stderr: new Stream(),
				commandName,
				args,
			};
		});

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

		if (!streams && this.state.ttyBuffer)
			this.pushHistory({ text: this.state.ttyBuffer, isInput: false });

		this.state.stream = null;
		this.pipeline = previousPipeline;
		this.state.stream = previousStream;

		if (!previousStream) this.state.ttyBuffer = null;

		return exitCodes[exitCodes.length - 1] ?? EXIT_CODE.success;
	}

	/**
	 * Spawns a new process with input and output streams and runs it.
	 * @param process - The process to spawn. 
	 * @param rawLine - The raw input string.
	 * @returns The exit code of the process.
	 */
	async spawn({ stdin, stdout, stderr, commandName, args }: Process, rawLine: string) {
		const timestamp = Date.now();

		if (args.length === 0) return EXIT_CODE.generalError;

		const commandArgs = [...args];
		if (commandArgs[0].toLowerCase() === "sudo") commandArgs.shift();
		commandArgs.shift();

		const command = CommandsManager.find(commandName);
		if (!command)
			return Shell.writeError(stderr, commandName, Shell.COMMAND_NOT_FOUND_ERROR, EXIT_CODE.commandNotFound);

		const options: string[] = [];
		const inputs: Record<string, string> = {};
		
		// Only treat as an option if it starts with "-" and is not quoted
		commandArgs.filter((arg) => arg.startsWith("-") && !arg.startsWith("\"")).forEach((option) => {
			const addOption = (key: string) => {
				const commandOption = command.getOption(key);
				key = commandOption?.short ?? key;

				if (options.includes(key))
					return;

				options.push(key);

				if (commandOption?.isInput) {
					const index = commandArgs.indexOf(option);
					const value = commandArgs[index + 1];
					inputs[commandOption.short] = value;
					removeFromArray(value, commandArgs);
				}
			};

			if (option.startsWith("--")) {
				addOption(option.substring(2).toLowerCase());
			} else {
				option.substring(1).split("").forEach((s) => addOption(s));
			}

			removeFromArray(option, commandArgs);
		});

		// Strip quotes from remaining arguments
		const cleanArgs = commandArgs.map((arg) => arg.replace(/^"|"$/g, ""));

		if (command.requireArgs && !cleanArgs.length)
			return Shell.writeError(stderr, commandName, [Shell.USAGE_ERROR, `${commandName} ${Shell.MISSING_ARGS_ERROR}`]);
		if (command.requireOptions && !options.length)
			return Shell.writeError(stderr, commandName, [Shell.USAGE_ERROR, `${commandName} ${Shell.MISSING_OPTIONS_ERROR}`]);

		try {
			const exitCode = await command.execute(cleanArgs, {
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
			return Shell.writeError(stderr, commandName);
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

	static parseCommand(input: string): string[] {
		return input.match(/(?:[^\s"]+|"[^""]*")+/g) ?? [];
	}

	/**
	 * Writes an error message to the given stream and returns the exit code.
	 * @param stream - The stream to write the error message to (usually `stderr`).
	 * @param commandName - The name of the command that has caused the error.
	 * @param error - The error message.
	 * @param exitCode - The exit code.
	 * @returns The exit code.
	 */
	static writeError(stream: Stream, commandName: string, error?: string, exitCode?: number): number
	/**
	 * Writes an error message to the given stream and returns the exit code.
	 * @param stream - The stream to write the error message to (usually `stderr`).
	 * @param commandName - The name of the command that has caused the error.
	 * @param error - The error messages.
	 * @param exitCode - The exit code.
	 * @returns The exit code.
	 */
	static writeError(stream: Stream, commandName: string, error: string[], exitCode?: number): number
	static writeError(stream: Stream, commandName: string, error: string | string[] = Shell.COMMAND_FAILED_ERROR, exitCode: number = EXIT_CODE.generalError): number {
		stream.write(Ansi.red(`${commandName}: ${typeof error === "string" ? error : error.join(": ")}`));
		return exitCode;
	}

	static animate({ stdout, stdin, render, delay, clear = true }: Pick<ShellContext, "stdout" | "stdin"> & {
		/** The function that renders each frame. */
		render: (frame: number) => string,
		/** The delay between each frame, in ms. */
		delay: number,
		/** Whether to clear the terminal before each frame. */
		clear?: boolean
	}) {
		let frame = 0;

		// Enter Alternate Screen Buffer
		stdout.write("\x1b[?1049h");

		function stopAnimation(interval: ReturnType<typeof setInterval>) {
			clearInterval(interval);
			stdout.write("\x1b[?1049l");
			stdin.stop();
		}

		const interval = setInterval(() => {
			let content = render(frame);

			if (clear) {
				// Clear screen and home cursor
				content = "\x1b[2J\x1b[H" + content;
			}

			stdout.write(content);
			frame++;

			if (content.trim().length === 0 && frame > 1) {
				stopAnimation(interval);
			}
		}, delay);

		stdin.on(Stream.STOP_EVENT, () => {
			stopAnimation(interval);
		});

		return stdin.wait(EXIT_CODE.success);
	}
}
import { proxy } from "valtio";
import { Stream, StreamSignal } from "./stream";
import { CommandsManager } from "./commands";
import { ANSI, Ansi, clamp, getLongestCommonPrefix, Vector2 } from "@prozilla-os/shared";
import { EXIT_CODE, HOSTNAME, USERNAME, WELCOME_MESSAGE } from "../../constants/shell.const";
import { App } from "../apps/app";
import { VirtualFolder, VirtualRoot } from "../virtual-drive";
import { SettingsManager } from "../settings/settingsManager";
import { SystemManager } from "../system/systemManager";
import { ShellEnvironment } from "./shellEnvironment";
import { ShellInterpreter } from "./shellInterpreter";
import { CommandOutput } from "./command";

/**
 * Represents a single entry in the shell's output history.
 */
export interface HistoryEntry {
	/** The text content to display. */
	text?: string;
	/** Whether this entry represents a user-inputted command. */
	isCommand: boolean;
	/** The raw string value of the command. */
	value?: string;
	/** If true, the terminal view should be cleared before rendering this entry. */
	clear?: boolean;
}

/**
 * Configuration options for initializing a new Shell instance.
 */
export interface ShellConfig {
	/** The application instance that owns and manages this shell. */
	app?: App;
	/** The initial working directory path (e.g., "~" or "/bin"). */
	path?: string;
	/** A string to pre-fill the shell input with. */
	input?: string;
	virtualRoot: VirtualRoot;
	systemManager: SystemManager;
	settingsManager: SettingsManager;
	/** Callback function to trigger when the shell process should be terminated. */
	exit: () => void;
	/** A reactive reference containing the current terminal dimensions in rows and columns. */
	sizeRef: { current: Vector2 };
	/** Optional initial environment variables to populate the shell with. */
	env?: Record<string, string>;
}

/**
 * The internal reactive state of the shell.
 */
export interface ShellState {
	/** An array of all past outputs and commands displayed in the terminal. */
	history: HistoryEntry[];
	/** The current, unsubmitted text in the input line. */
	line: string;
	/** Current position in the history search (0 is the current line). */
	historyOffset: number;
	/** The current directory the shell is operating within. */
	workingDirectory: VirtualFolder;
	/** The formatted prompt string (e.g., "user@host:~$ "). */
	prompt: string;
	/** The current active input stream for a running process. */
	stream: Stream | null;
	/** Temporary storage for data written to the terminal while a stream is active. */
	ttyBuffer: string | null;
	/** Indicates if a process has requested the Alternate Screen Buffer (e.g., a text editor). */
	isUsingAltScreen: boolean;
	/** A reactive view of the current environment variables. */
	env: Record<string, string>;
}

/**
 * Standard input, output, and error streams for a process.
 */
export interface ProcessIO {
	/** The stream used to receive input data. */
	stdin: Stream;
	/** The stream used to output standard data. */
	stdout: Stream;
	/** The stream used to output error messages. */
	stderr: Stream;
}

/**
 * Represents an active or pending process within the shell.
 */
export interface Process extends ProcessIO {
	/** The executable name or alias being invoked. */
	commandName: string;
	/** Array of string arguments passed to the command. */
	args: string[];
}

/**
 * The context object provided to command execution functions.
 */
export interface ShellContext extends ProcessIO {
	/** Reference to the parent Shell instance. */
	shell: Shell;
	/** The directory where the command was executed. */
	workingDirectory: VirtualFolder;
	/** The name of the user executing the command. */
	username: string;
	/** The hostname of the virtual system. */
	hostname: string;
	/** The full, unparsed command line string (excluding pipes/redirects). */
	rawLine: string;
	/** Array of parsed flags in their short form (e.g., ["l", "a"]). */
	options: string[];
	/**
	 * Function to kill the shell session.
	 * @see {@link Shell.kill}
	 */
	exit: () => void;
	/** Map of option keys in their short form to their provided values. */
	inputs: Record<string, string>;
	/** Millisecond timestamp of when the command was started. */
	timestamp: number;
	virtualRoot: VirtualRoot;
	settingsManager: SettingsManager;
	systemManager: SystemManager;
	/** The owning application, if any. */
	app?: App;
	/** The current dimensions of the terminal window. */
	readonly size: Vector2;
	/** The scoped environment variables for this process. */
	env: ShellEnvironment;
}

/**
 * A Unix-like shell emulator that handles command parsing, environment management, 
 * autocompletion, and process I/O.
 */
export class Shell {
	/** The reactive state of this shell. */
	state: ShellState;
	/** The configuration used to initialize this shell. */
	config: ShellConfig;
	/** The environment variable manager for this shell. */
	env: ShellEnvironment;
	/** The logic handler for parsing and executing command strings. */
	interpreter: ShellInterpreter;

	static readonly COMMAND_NOT_FOUND_ERROR = "Command not found";
	static readonly MISSING_ARGS_ERROR = "requires at least 1 argument";
	static readonly MISSING_OPTIONS_ERROR = "requires at least 1 option";
	static readonly COMMAND_FAILED_ERROR = "Command failed";
	static readonly USAGE_ERROR = "Incorrect usage";
	static readonly INVALID_PATH_ERROR = "No such file or directory";

	static readonly SUDO_COMMAND = "sudo";
	/** Regex used to strip specific ANSI escape codes from the TTY buffer. */
	static readonly STRIP_ANSI_REGEX = new RegExp(
		[ANSI.screen.enterAltBuffer, ANSI.screen.exitAltBuffer, ANSI.screen.clear, ANSI.screen.home]
			.map((code) => code.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
			.join("|"),
		"g"
	);

	constructor(config: ShellConfig) {
		this.config = config;
		const workingDirectory = config.virtualRoot.navigateToFolder(config.path ?? "~") ?? config.virtualRoot;
			
		this.env = new ShellEnvironment({
			USER: USERNAME,
			HOSTNAME: HOSTNAME,
			HOME: config.virtualRoot.navigateToFolder("~")?.absolutePath ?? "~",
			PWD: workingDirectory.root ? "/" : workingDirectory.path,
			OLDPWD: workingDirectory.root ? "/" : workingDirectory.path,
			...config.env,
		});

		this.state = proxy<ShellState>({
			history: [{
				text: config.app ? WELCOME_MESSAGE.replace("$APP_NAME", config.app.name) : WELCOME_MESSAGE,
				isCommand: false,
			}],
			line: config.input ?? "",
			historyOffset: 0,
			workingDirectory: workingDirectory,
			prompt: "",
			stream: null,
			ttyBuffer: null,
			isUsingAltScreen: false,
			env: this.env.store,
		});

		this.interpreter = new ShellInterpreter(this);
		this.updatePrompt();
	}

	/**
	 * Sends a signal to the shell or the currently active foreground process.
	 * @param signal - The signal to send. Defaults to `"SIGTERM"`.
	 */
	terminate(signal: StreamSignal = "SIGTERM") {
		if (signal === "SIGKILL") {
			this.config.exit();
			return;
		}

		const isInterrupt = signal === "SIGINT";
		const hasActiveStream = this.state.stream != null;

		if (hasActiveStream) {
			// Commit buffer only if not in alt screen
			if (this.state.ttyBuffer && !this.state.isUsingAltScreen)
				this.pushHistory({ text: this.state.ttyBuffer, isCommand: false });
			
			this.state.stream?.signal(signal);
			this.state.stream = null;
			this.state.ttyBuffer = null;
			this.state.isUsingAltScreen = false;
		}

		this.interpreter.terminatePipeline(signal);

		if (isInterrupt && !hasActiveStream) {
			this.pushHistory({
				text: this.state.prompt + this.state.line + "^C",
				isCommand: true,
				value: this.state.line,
			});
			this.clearLine();
		}
	}

	/**
	 * Convenience method to send the `SIGINT` (Interrupt) signal.
	 * @see {@link Shell.terminate}
	 */
	interrupt() {
		this.terminate("SIGINT");
	}

	/**
	 * Convenience method to send the `SIGKILL` (Kill) signal, closing the shell.
	 * @see {@link Shell.terminate}
	 */
	kill() {
		this.terminate("SIGKILL");
	}

	/**
	 * Recalculates the prompt string based on the current user, hostname, and working directory.
	 */
	updatePrompt() {
		const username = this.env.get("USER") ?? USERNAME;
		const hostname = this.env.get("HOSTNAME") ?? HOSTNAME;
		this.state.prompt = Ansi.cyan(`${username}@${hostname}`) + ":"
			+ Ansi.blue(`${this.state.workingDirectory.root ? "/" : this.state.workingDirectory.path}`) + "$ ";
	}

	/**
	 * Updates the text in the current input line.
	 * @param value - The new string value or a function that receives the previous value.
	 */
	setLine(value: string | ((prev: string) => string)) {
		this.state.line = typeof value === "function" ? value(this.state.line) : value;
	}

	/**
	 * Appends a new entry to the terminal history.
	 * @param entry - The history entry to add.
	 */
	pushHistory(entry: HistoryEntry) {
		this.state.history.push(entry);
	}

	/**
	 * Writes raw text to the shell, handling ANSI escape codes for screen clearing and alt buffers.
	 * @param text - The string data to write to the TTY.
	 */
	write(text: string) {
		let remainingText = text;

		if (remainingText.includes(ANSI.screen.enterAltBuffer))
			this.state.isUsingAltScreen = true;

		if (remainingText.includes(ANSI.screen.exitAltBuffer)) {
			this.state.isUsingAltScreen = false;
			this.state.ttyBuffer = null;
		}

		if (remainingText.includes(ANSI.screen.clear) || remainingText.includes(ANSI.screen.home)) {
			if (!this.state.isUsingAltScreen)
				this.pushHistory({ clear: true, isCommand: false });
			this.state.ttyBuffer = null;
		}

		remainingText = remainingText.replace(Shell.STRIP_ANSI_REGEX, "");

		if (remainingText === "") 
			return;

		if (this.state.stream || this.state.isUsingAltScreen) {
			if (this.state.ttyBuffer && !this.state.isUsingAltScreen)
				this.pushHistory({ text: this.state.ttyBuffer, isCommand: false });
			this.state.ttyBuffer = remainingText;
		} else {
			this.pushHistory({ text: remainingText, isCommand: false });
		}
	}

	/**
	 * Clears the current input line and executes the given command string.
	 * @param input - The command string to execute.
	 * @returns A promise that resolves with the final exit code of the execution.
	 */
	async run(input: string) {
		this.clearLine();
		return await this.interpreter.execute(input);
	}

	/**
	 * Clears the current input line and resets the history search offset.
	 */
	clearLine() {
		this.state.line = "";
		this.state.historyOffset = 0;
	}

	/**
	 * Navigates through command history.
	 * @param direction - Positive to go back in time, negative to go forward.
	 */
	historySearch(direction: number) {
		const inputHistory = this.state.history.filter(({ isCommand }) => isCommand);
		const index = clamp(this.state.historyOffset + direction, 0, inputHistory.length);

		if (index === this.state.historyOffset) {
			if (direction < 0)
				this.state.line = "";
			return;
		}

		this.state.line = index === 0 ? "" : inputHistory[inputHistory.length - index].value ?? "";
		this.state.historyOffset = index;
	}

	/**
	 * Changes the current working directory and updates `PWD`/`OLDPWD` environment variables.
	 * @param directory - The virtual folder to switch to.
	 */
	setWorkingDirectory(directory: VirtualFolder) {
		const path = directory.root ? "/" : directory.path;
		const previousPath = this.env.get("PWD");
		
		if (previousPath !== path) {
			this.env.set("OLDPWD", previousPath ?? path);
			this.env.set("PWD", path);
		}

		this.state.workingDirectory = directory;
		this.updatePrompt();
	}

	/**
	 * Calculates possible completions for the current input based on commands and file paths.
	 * @returns An array of string suggestions.
	 */
	getCompletions() {
		const words = this.state.line.split(" ");
		const lastWord = words[words.length - 1] ?? "";
		const isFirstWord = words.length <= 1;

		let completions: string[] = [];

		if (isFirstWord && !lastWord.includes("/")) {
			completions = CommandsManager.COMMANDS
				.filter((command) => command.name.startsWith(lastWord))
				.map((command) => command.name);
		}

		if (!isFirstWord || lastWord.includes("/") || lastWord.startsWith(".")) {
			const pathParts = lastWord.split("/");
			const searchTerm = pathParts.pop() ?? "";
			const path = pathParts.join("/") || (lastWord.startsWith("/") ? "/" : ".");

			const directory = this.state.workingDirectory.navigateToFolder(path);
			if (directory) {
				const entries = [...directory.getSubFolders(true), ...directory.getFiles(true)];
				const pathCompletions = entries
					.map((entry) => entry.id + (entry.isFolder() ? "/" : ""))
					.filter((id) => id.startsWith(searchTerm));
				
				completions = [...completions, ...pathCompletions];
			}
		}

		return completions;
	}

	/**
	 * Performs an auto-completion action. If one match is found, it completes the line. 
	 * If multiple are found, it lists them in the history.
	 */
	autoComplete() {
		const completions = this.getCompletions();
		if (!completions.length) return;

		const parts = this.state.line.split(" ");
		const lastWord = parts.pop() ?? "";
		const commonPrefix = getLongestCommonPrefix(completions);

		const pathParts = lastWord.split("/");
		const searchTerm = pathParts.pop() ?? "";

		// If there's a common prefix longer than the current input, complete it
		if (commonPrefix.length > searchTerm.length) {
			pathParts.push(commonPrefix);
			parts.push(pathParts.join("/"));
			this.setLine(parts.join(" "));
			return;
		}

		// Handle single or multiple matches
		if (completions.length === 1) {
			pathParts.push(completions[0]);
			parts.push(pathParts.join("/"));
			this.setLine(parts.join(" "));
		} else {
			this.pushHistory({
				text: this.state.prompt + this.state.line,
				isCommand: true,
				value: this.state.line,
			});
			this.pushHistory({
				text: completions.join("  "),
				isCommand: false,
			});
		}
	}

	/**
	 * Utility to write a formatted error message to a stream and return an exit code.
	 * @param stream - The stream to receive the error output.
	 * @param commandName - The name of the command reporting the error.
	 * @param error - A single string or array of strings representing the error message.
	 * @param exitCode - The numerical exit code to return.
	 * @returns `exitCode`.
	 */
	static writeError(stream: Stream, commandName: string, error: string | string[] = Shell.COMMAND_FAILED_ERROR, exitCode: number = EXIT_CODE.generalError): number {
		stream.write(Ansi.red(`${commandName}: ${typeof error === "string" ? error : error.join(": ")}`));
		return exitCode;
	}

	/**
	 * Executes a frame-based animation in the terminal using the Alternate Screen Buffer.
	 * @returns A promise that resolves when the animation is stopped.
	 */
	static animate({ stdout, stdin, render, delay, clear = true, stopOnBlank = true }: Pick<ShellContext, "stdout" | "stdin"> & {
		/** The function that renders each frame. */
		render: (frame: number) => string,
		/** The delay between each frame, in ms. */
		delay: number,
		/** Whether to clear the terminal before each frame. */
		clear?: boolean,
		/** Whether to stop the animation when the rendered frame is blank. */
		stopOnBlank?: boolean,
	}) {
		let frame = 0;

		stdout.write(ANSI.screen.enterAltBuffer);

		function stopAnimation(interval: ReturnType<typeof setInterval>) {
			clearInterval(interval);
			stdout.write(ANSI.screen.exitAltBuffer);
			stdin.stop();
		}

		const interval = setInterval(() => {
			const rendered = render(frame);
			let content = rendered;

			if (clear) {
				content = ANSI.screen.clear + ANSI.screen.home + content;
			}

			stdout.write(content);
			frame++;

			if (stopOnBlank && !rendered.trim().length && frame > 1) {
				stopAnimation(interval);
			}
		}, delay);

		stdin.on(Stream.STOP_EVENT, () => {
			stopAnimation(interval);
		});

		return stdin.wait(EXIT_CODE.success);
	}

	/**
	 * Reads input data. If `rawLine` is provided, it processes it immediately via the callback.
	 * Otherwise, it waits for data from the `stdin` stream.
	 * @param rawLine - The pre-provided input string.
	 * @param stdin - The input stream to fall back on.
	 * @param callback - Function to process the collected input data.
	 */
	static async readInput(rawLine: string, stdin: Stream, callback: (data: string) => CommandOutput) {
		if (rawLine.length > 0) {
			return callback(rawLine);
		}

		let buffer = "";
		stdin.on(Stream.DATA_EVENT, (data) => {
			buffer += data;
		});

		return stdin.wait().then(() => {
			return buffer.length ? callback(buffer) : EXIT_CODE.success;
		});
	}
}
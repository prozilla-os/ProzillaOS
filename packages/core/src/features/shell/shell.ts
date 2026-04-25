import { proxy, ref } from "valtio";
import { Stream, StreamSignal } from "./streams/stream";
import { ExecutableResolver } from "./executableResolver";
import { ANSI, Ansi, clamp, getLongestCommonPrefix, Vector2 } from "@prozilla-os/shared";
import { EXIT_CODE, HOSTNAME, USERNAME, WELCOME_MESSAGE } from "../../constants/shell.const";
import { App } from "../apps/app";
import { VirtualFolder, VirtualRoot } from "../virtual-drive";
import { SettingsManager } from "../settings/settingsManager";
import { SystemManager } from "../system/systemManager";
import { ShellEnvironment } from "./shellEnvironment";
import { ShellInterpreter } from "./shellInterpreter";
import { CommandOutput } from "./command";
import { KeyboardEvent } from "react";

export enum HistoryFlags {
	None = 0,
	Command = 1 << 0,
	Clear = 1 << 1,
}

/**
 * Represents a single entry in the shell's output history.
 */
export interface HistoryEntry {
	/** The text content to display in the terminal. */
	displayText?: string;
	/** The raw input string of the command in this entry. */
	input?: string;
	flags: HistoryFlags;
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
	/** Indicates whether the shell is currently in raw mode, forwarding all keystrokes directly to the active stream. */
    isRawMode: boolean;
	/** The position of the cursor in raw mode. */
	cursorPosition: Vector2;
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
	/** The environment the process may read from or write to. */
	env: ShellEnvironment; 
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

	static readonly MISSING_ARGS_ERROR = "requires at least 1 argument";
	static readonly MISSING_OPTIONS_ERROR = "requires at least 1 option";
	static readonly COMMAND_FAILED_ERROR = "Command failed";
	static readonly USAGE_ERROR = "Incorrect usage";
	static readonly INVALID_PATH_ERROR = "No such file or directory";

	static readonly SUDO_COMMAND = "sudo";
	/** Regex used to strip specific ANSI escape codes from the TTY buffer. */
	private static readonly STRIP_ANSI_REGEX = new RegExp(
		[ANSI.screen.enterAltBuffer, ANSI.screen.exitAltBuffer, ANSI.screen.clear, ANSI.screen.home]
			.map((code) => code.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
			.join("|"),
		"g"
	);
	// eslint-disable-next-line no-control-regex
	private static readonly CURSOR_REGEX = /\x1b\[(\d+);(\d+)H/g;

	private static readonly KEY_TO_ANSI: Record<string, string> = {
		"Enter": ANSI.input.lineFeed,
		"Tab": ANSI.input.horizontalTab,
		"Backspace": ANSI.input.backspace,
		"ArrowUp": ANSI.input.arrowUp,
		"ArrowDown": ANSI.input.arrowDown,
		"ArrowRight": ANSI.input.arrowRight,
		"ArrowLeft": ANSI.input.arrowLeft,
		"Escape": ANSI.input.escape,
	};

	constructor(config: ShellConfig) {
		this.config = config;
		const workingDirectory = config.virtualRoot.navigateToFolder(config.path ?? "~") ?? config.virtualRoot;
			
		this.env = new ShellEnvironment({
			[ShellEnvironment.USER]: USERNAME,
			[ShellEnvironment.HOSTNAME]: HOSTNAME,
			[ShellEnvironment.PROMPT]: `${Ansi.cyan("\\u@\\h")}:${Ansi.blue("\\w")}$ `,
			[ShellEnvironment.HOME]: config.virtualRoot.navigateToFolder("~")?.absolutePath ?? "~",
			[ShellEnvironment.WORKING_DIRECTORY]: workingDirectory.root ? "/" : workingDirectory.path,
			[ShellEnvironment.PREVIOUS_WORKING_DIRECTORY]: workingDirectory.root ? "/" : workingDirectory.path,
			...config.env,
		});

		this.state = proxy<ShellState>({
			history: [{
				displayText: config.app ? WELCOME_MESSAGE.replace("$APP_NAME", config.app.name) : WELCOME_MESSAGE,
				flags: HistoryFlags.None,
			}],
			line: config.input ?? "",
			historyOffset: 0,
			workingDirectory: ref(workingDirectory),
			prompt: "",
			stream: null,
			ttyBuffer: null,
			isUsingAltScreen: false,
			env: this.env.store,
			isRawMode: false,
			cursorPosition: Vector2.ZERO,
		});

		this.interpreter = new ShellInterpreter(this);
		void this.updatePrompt();
	}

	public async handleKeyDown(event: KeyboardEvent) {
		const { key } = event;

		if ((event.ctrlKey || event.metaKey) && key === "c" && !event.shiftKey) {
			event.preventDefault();
			this.interrupt();
			return;
		}

		if (this.state.stream) {
			if (this.state.isRawMode) {
				event.preventDefault();
				const data = Shell.KEY_TO_ANSI[key] ?? (key.length === 1 ? key : "");
				if (data)
					await this.state.stream.write(data);
			}
			
			return;
		}

		if (key === "Tab") {
			event.preventDefault();
			this.autoComplete();
		} else if (key === "Enter") {
			await this.run(this.state.line);
		} else if (key === "ArrowUp") {
			event.preventDefault();
			this.historySearch(1);
		} else if (key === "ArrowDown") {
			event.preventDefault();
			this.historySearch(-1);
		}
	}

	/**
     * Toggles raw mode, which forwards all keystrokes directly to the active stream.
     * @param rawMode - Whether to enable raw mode.
     */
	public setRawMode(rawMode: boolean) {
		this.state.isRawMode = rawMode;
	}

	/**
	 * Sends a signal to the shell or the currently active foreground process.
	 * @param signal - The signal to send. Defaults to `"SIGTERM"`.
	 */
	public terminate(signal: StreamSignal = "SIGTERM") {
		if (signal === "SIGKILL") {
			this.config.exit();
			return;
		}

		const isInterrupt = signal === "SIGINT";
		const hasActiveStream = this.state.stream != null;

		if (hasActiveStream) {
			const output = (this.state.ttyBuffer ?? "") + (isInterrupt ? "^C" : "");
            
			if (output && !this.state.isUsingAltScreen)
				this.pushHistory({ displayText: output, flags: HistoryFlags.None });
            
			this.state.stream?.signal(signal);
			this.state.stream?.end();
			this.state.stream = null;
			this.state.ttyBuffer = null;
			this.state.isUsingAltScreen = false;
			this.state.isRawMode = false;
		}

		this.interpreter.terminatePipeline(signal);

		if (isInterrupt && !hasActiveStream) {
			this.pushHistory({
				displayText: this.state.prompt + this.state.line + "^C",
				flags: HistoryFlags.Command,
				input: this.state.line,
			});
			this.clearLine();
		}
	}

	/**
	 * Convenience method to send the `SIGINT` (Interrupt) signal.
	 * @see {@link Shell.terminate}
	 */
	public interrupt() {
		this.terminate("SIGINT");
	}

	/**
	 * Convenience method to send the `SIGKILL` (Kill) signal, closing the shell.
	 * @see {@link Shell.terminate}
	 */
	public kill() {
		this.terminate("SIGKILL");
	}

	/**
	 * Refreshes the prompt string based on the current user, hostname, and working directory.
	 */
	public async updatePrompt() {
		const prompt = this.env.get(ShellEnvironment.PROMPT) ?? "\\u@\\h:\\w$ ";
		this.state.prompt = await this.interpreter.evaluatePrompt(prompt, this.env);
	}

	/**
	 * Updates the text in the current input line.
	 * @param value - The new string value or a function that receives the previous value.
	 */
	public setLine(value: string | ((prev: string) => string)) {
		this.state.line = typeof value === "function" ? value(this.state.line) : value;
	}

	/**
	 * Appends a new entry to the terminal history.
	 * @param entry - The history entry to add.
	 */
	public pushHistory(entry: HistoryEntry) {
		this.state.history.push(entry);
	}

	/**
	 * Writes raw text to the shell, handling ANSI escape codes for screen clearing and alt buffers.
	 * @param text - The string data to write to the TTY.
	 */
	public write(text: string) {
		if (text.includes(ANSI.screen.enterAltBuffer)) {
			this.state.isUsingAltScreen = true;
			this.state.ttyBuffer = null;
		}

		if (text.includes(ANSI.screen.clear) || text.includes(ANSI.screen.home)) {
			if (!this.state.isUsingAltScreen) {
				this.pushHistory({ flags: HistoryFlags.Clear });
			}
			this.state.ttyBuffer = null;
		}

		if (text.includes(ANSI.screen.exitAltBuffer)) {
			this.state.isUsingAltScreen = false;
			this.state.ttyBuffer = null;
		}

		let match;
		while ((match = Shell.CURSOR_REGEX.exec(text)) !== null) {
			const row = parseInt(match[1]) - 1;
			const col = parseInt(match[2]) - 1;
			this.state.cursorPosition = new Vector2(col, row);
		}

		const remainingText = text.replace(Shell.STRIP_ANSI_REGEX, "")
			.replace(Shell.CURSOR_REGEX, "");
		if (!remainingText.length)
			return;

		this.state.ttyBuffer = (this.state.ttyBuffer ?? "") + remainingText;

		if (!this.state.isUsingAltScreen && this.state.ttyBuffer.includes("\n")) {
			const lines = this.state.ttyBuffer.split("\n");
			const lastLine = lines.pop() ?? "";

			for (const line of lines) {
				this.pushHistory({ displayText: line, flags: HistoryFlags.None });
			}

			this.state.ttyBuffer = lastLine;
		}
	}

	/**
	 * Submits the current input line and executes the given command string.
	 * @param input - The command string to execute.
	 * @returns A promise that resolves with the final exit code of the execution.
	 */
	public async run(input: string) {
		const prefix = this.state.ttyBuffer ?? "";
		this.state.ttyBuffer = null;
		this.clearLine();
		
		this.pushHistory({ 
			displayText: prefix + this.state.prompt + input, 
			flags: HistoryFlags.Command, 
			input: input, 
		});
		
		const exitCode = await this.interpreter.execute(input);
		await this.updatePrompt();
		return exitCode;
	}

	/**
	 * Clears the current input line and resets the history search offset.
	 */
	public clearLine() {
		this.state.line = "";
		this.state.historyOffset = 0;
	}

	/**
	 * Navigates through command history.
	 * @param direction - Positive to go back in time, negative to go forward.
	 */
	public historySearch(direction: number) {
		const inputHistory = this.state.history.filter(({ flags }) => (flags & HistoryFlags.Command) !== 0);
		const index = clamp(this.state.historyOffset + direction, 0, inputHistory.length);

		if (index === this.state.historyOffset) {
			if (direction < 0)
				this.state.line = "";
			return;
		}

		this.state.line = index === 0 ? "" : inputHistory[inputHistory.length - index].input ?? "";
		this.state.historyOffset = index;
	}

	/**
	 * Changes the current working directory and updates `PWD`/`OLDPWD` environment variables.
	 * @param directory - The virtual folder to switch to.
	 */
	public setWorkingDirectory(directory: VirtualFolder) {
		const path = directory.root ? "/" : directory.path;
		const previousPath = this.env.get(ShellEnvironment.WORKING_DIRECTORY);
		
		if (previousPath !== path) {
			this.env.set(ShellEnvironment.PREVIOUS_WORKING_DIRECTORY, previousPath ?? path);
			this.env.set(ShellEnvironment.WORKING_DIRECTORY, path);
		}

		this.state.workingDirectory = directory;
	}

	/**
	 * Calculates possible completions for the current input based on commands and file paths.
	 * @returns An array of string suggestions.
	 */
	public getCompletions() {
		const words = this.state.line.split(" ");
		const lastWord = words.at(-1) ?? "";
		const isFirstWord = words.length <= 1;

		let completions: string[] = [];

		if (isFirstWord && !lastWord.includes("/")) {
			completions = ExecutableResolver.builtins
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
	public autoComplete() {
		const completions = this.getCompletions();
		if (!completions.length)
			return;

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
				displayText: this.state.prompt + this.state.line,
				flags: HistoryFlags.Command,
				input: this.state.line,
			});
			this.pushHistory({
				displayText: completions.join("  "),
				flags: HistoryFlags.None,
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
	public static async writeError(stream: Stream, commandName: string, error: string | string[] = Shell.COMMAND_FAILED_ERROR, exitCode: number = EXIT_CODE.generalError) {
		await Shell.printLn(stream, Ansi.red(`${commandName}: ${typeof error === "string" ? error : error.join(": ")}`));
		return exitCode;
	}

	/**
	 * Executes a task repeatedly and writes its output to `stdout`.
	 * @returns A promise that resolves when the loop is finished.
	 */
	public static async loop({ stdout, stdin, task, delay = 0, maxIterations }: Pick<ProcessIO, "stdout" | "stdin"> & {
		task: () => string,
		delay?: number,
		maxIterations?: number,
	}) {
		return await this.animate({
			stdout,
			stdin,
			render: (iterations) => {
				if (maxIterations !== undefined && iterations >= maxIterations)
					stdin.end();
				return task();
			},
			delay,
			clear: false,
			stopOnBlank: false,
			useAltBuffer: false,
		});
	}

	/**
	 * Executes a frame-based animation in the terminal using the Alternate Screen Buffer.
	 * @returns A promise that resolves when the animation is stopped.
	 */
	public static async animate({ stdout, stdin, render, delay, clear = true, stopOnBlank = true, useAltBuffer = true }: Pick<ProcessIO, "stdout" | "stdin"> & {
		/** The function that renders each frame. */
		render: (frame: number) => string,
		/** The delay between each frame, in ms. */
		delay: number,
		/** Whether to clear the terminal before each frame. */
		clear?: boolean,
		/** Whether to stop the animation when the rendered frame is blank. */
		stopOnBlank?: boolean,
		/** Whether to use the alt buffer while rendering this animation. */
		useAltBuffer?: boolean,
	}) {
		let frame = 0;

		if (useAltBuffer)
			await stdout.write(ANSI.screen.enterAltBuffer);

		async function stopAnimation(interval: ReturnType<typeof setInterval>) {
			clearInterval(interval);
			if (useAltBuffer)
				await stdout.write(ANSI.screen.exitAltBuffer);
			stdin.end();
		}

		const interval = setInterval(() => {
			const rendered = render(frame);
			let content = rendered;

			if (clear)
				content = ANSI.screen.clear + ANSI.screen.home + content;

			void stdout.write(content).then(() => {
				frame++;

				if (stopOnBlank && !rendered.trim().length && frame > 1)
					void stopAnimation(interval);
			});
		}, delay);

		stdin.on(Stream.END_EVENT, () => {
			void stopAnimation(interval);
		});

		return await stdin.wait(EXIT_CODE.success);
	}

	/**
	 * Reads input data. If `rawLine` is provided, it processes it immediately via the callback.
	 * Otherwise, it waits for data from the `stdin` stream.
	 * @param rawLine - The pre-provided input string.
	 * @param stdin - The input stream to fall back on.
	 * @param callback - Function to process the collected input data.
	 */
	public static async readInput(rawLine: string, stdin: Stream, callback: (data: string) => Promise<CommandOutput> | CommandOutput) {
		if (rawLine.length > 0) {
			return await callback(rawLine);
		}

		let buffer = "";
		stdin.on(Stream.DATA_EVENT, (data) => {
			buffer += data;
		});

		return await stdin.wait().then(async () => {
			return buffer.length ? await callback(buffer) : EXIT_CODE.success;
		});
	}

	/**
	 * Utility function that writes `text` followed by a newline (`"\n"`) to `stream`.
	 * @param stream - The stream to write to.
	 * @param text - The text to write.
	 */
	public static async printLn(stream: Stream, text = "") {
		await stream.write(text + "\n");
	}
}
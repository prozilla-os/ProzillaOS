import { ref } from "valtio";
import { EXIT_CODE, HOSTNAME, USERNAME } from "../../constants";
import { VirtualFile } from "../virtual-drive";
import { Process, Shell } from "./shell";
import { Stream, StreamSignal } from "./stream";
import { CommandsManager } from "./commands";
import { removeFromArray } from "@prozilla-os/shared";

/**
 * Handles the parsing, expansion, and execution of shell commands and scripts.
 * Manages the process pipeline and stream redirection.
 */
export class ShellInterpreter {
	private shell: Shell;
	pipeline: Process[] = [];

	constructor(shell: Shell) {
		this.shell = shell;
	}

	/**
	 * Sends a termination signal to all processes currently in the pipeline.
	 * @param signal - The signal to send.
	 */
	terminatePipeline(signal: StreamSignal) {
		if (!this.pipeline.length) return;
		this.pipeline.forEach((process) => process.stdin.signal(signal));
		this.pipeline = [];
	}

	/**
	 * Parses and executes a shell script.
	 * @param script - The script content or a virtual file.
	 * @returns The exit code of the last command executed in the script.
	 */
	async executeScript(script: string | VirtualFile) {
		if (typeof script !== "string") {
			const content = await script.read();
			if (!content)
				return EXIT_CODE.commandNotExecutable;
			script = content;
		}

		const lines = script.split("\n");
		let lastExitCode: number = EXIT_CODE.success;

		for (const line of lines) {
			const commandPart = line.split(/(?<!["'])\s#/)[0].trim();
			if (!commandPart)
				continue;

			lastExitCode = await this.execute(commandPart);
		}

		return lastExitCode;
	}

	/**
	 * Parses and executes an input string, handling environment expansion and piping.
	 * @param input - The raw command line string.
	 * @param streams - Optional output streams to override default TTY behavior.
	 * @returns A promise that resolves with the final exit code of the execution.
	 */
	async execute(input: string, streams?: { stdout?: Stream, stderr?: Stream }) {
		const previousPipeline = this.pipeline;
		const previousStream = this.shell.state.stream;

		if (!streams)
			this.shell.pushHistory({ text: this.shell.state.prompt + input, isCommand: true, value: input });

		input = this.shell.env.expand(input);

		// Split by pipe operator while respecting quoted strings
		const commandStrings = input.match(/(?:[^|"]+|"[^"]*")+/g)
			?.map((string) => string.trim())
			.filter((string) => string !== "") ?? [];

		if (commandStrings.length === 0) return EXIT_CODE.success;

		this.pipeline = commandStrings.map((commandString) => {
			const args = ShellInterpreter.parseCommand(commandString);
			let commandName = args[0]?.toLowerCase() ?? "";

			if (commandName === Shell.SUDO_COMMAND && args.length > 1)
				commandName = args[1].toLowerCase();

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
				process.stdout.on(Stream.DATA_EVENT, (data) => this.shell.write(data));
			}

			if (streams?.stderr) {
				process.stderr.pipe(streams.stderr);
			} else {
				process.stderr.on(Stream.DATA_EVENT, (data) => this.shell.write(data));
			}
		});

		const lastProcess = this.pipeline[this.pipeline.length - 1];
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (lastProcess) this.shell.state.stream = ref(lastProcess.stdin);

		// Spawn processes in reverse to support piping stdin and reverse to make order of exit codes correct
		const tasks = [...this.pipeline].reverse().map((process) => {
			process.stdin.start();
			process.stdout.start();
			process.stderr.start();
			return this.spawn(process);
		}).reverse();

		const exitCodes = await Promise.all(tasks);
		const finalExitCode = exitCodes[exitCodes.length - 1] ?? EXIT_CODE.success;

		this.shell.env.set("?", finalExitCode.toString());

		if (!streams && this.shell.state.ttyBuffer)
			this.shell.pushHistory({ text: this.shell.state.ttyBuffer, isCommand: false });

		this.pipeline = previousPipeline;
		this.shell.state.stream = previousStream;

		if (!previousStream) 
			this.shell.state.ttyBuffer = null;

		return finalExitCode;
	}

	/**
	 * Resolves a command, parses flags/options, and executes the command logic.
	 * @returns The resulting exit code from the command execution.
	 */
	async spawn({ stdin, stdout, stderr, commandName, args }: Process) {
		const timestamp = Date.now();

		try {
			if (args.length === 0) return EXIT_CODE.generalError;

			if (this.shell.env.parseAssignment(args[0])) return EXIT_CODE.success;

			const commandArgs = [...args];
			if (commandArgs[0].toLowerCase() === Shell.SUDO_COMMAND) commandArgs.shift();
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

			const cleanArgs = commandArgs.map((arg) => arg.replace(/^"|"$/g, ""));
			const isPiped = this.pipeline.findIndex((process) => process.stdin === stdin) > 0;

			if (command.requireArgs && !cleanArgs.length && !isPiped)
				return Shell.writeError(stderr, commandName, [Shell.USAGE_ERROR, `${commandName} ${Shell.MISSING_ARGS_ERROR}`]);
			if (command.requireOptions && !options.length)
				return Shell.writeError(stderr, commandName, [Shell.USAGE_ERROR, `${commandName} ${Shell.MISSING_OPTIONS_ERROR}`]);

			const exitCode = await command.execute(cleanArgs, {
				stdin,
				stdout,
				stderr,
				shell: this.shell,
				workingDirectory: this.shell.state.workingDirectory,
				username: this.shell.env.get("USER") ?? USERNAME,
				hostname: this.shell.env.get("HOSTNAME") ?? HOSTNAME,
				rawLine: cleanArgs.join(" "),
				options,
				exit: () => this.shell.kill(),
				inputs,
				timestamp,
				virtualRoot: this.shell.config.virtualRoot,
				settingsManager: this.shell.config.settingsManager,
				systemManager: this.shell.config.systemManager,
				app: this.shell.config.app!,
				size: this.shell.config.sizeRef.current,
				env: this.shell.env.fork(),
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

	/**
	 * Splits a command string into an array of arguments, respecting single and double quotes.
	 */
	static parseCommand(input: string): string[] {
		return input.match(/(?:[^\s"']+|"(?:[^"\\]|\\.)*"|'[^']*')+/g) ?? [];
	}
}
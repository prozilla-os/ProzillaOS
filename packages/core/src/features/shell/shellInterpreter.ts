import { ref } from "valtio";
import { EXIT_CODE, HOSTNAME, USERNAME } from "../../constants";
import { VirtualFile } from "../virtual-drive";
import { Process, Shell } from "./shell";
import { Stream, StreamSignal } from "./stream";
import { CommandsManager } from "./commands";
import { removeFromArray } from "@prozilla-os/shared";
import { Command } from "./command";

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
		if (script instanceof VirtualFile) {
			const content = await script.read();
			if (!content)
				return EXIT_CODE.commandNotExecutable;
			script = content;
		}

		let lastExitCode: number = EXIT_CODE.success;

		for (const line of script.split("\n")) {
			const commandPart = line.split(/(?<!["'])\s#/)[0].trim();
			if (commandPart)
				lastExitCode = await this.execute(commandPart);
		}

		return lastExitCode;
	}

	/**
	 * Parses and executes an input string, handling environment expansion, piping, and conditional chaining (`&&`, `||`).
	 * @param input - The raw command line string.
	 * @param streams - Optional output streams to override default TTY behavior.
	 * @returns A promise that resolves with the final exit code of the execution.
	 */
	async execute(input: string, streams?: { stdout?: Stream, stderr?: Stream }) {
		if (!streams)
			this.shell.pushHistory({ text: this.shell.state.prompt + input, isCommand: true, value: input });

		input = this.shell.env.expand(input);

		// Split by logical operators while respecting quotes
		const segments = input.match(/(?:(?:"[^"]*"|'[^']*'|[^&|'"])+|&&|\|\|)/g) ?? [];
		let lastExitCode: number = EXIT_CODE.success;
		let operator: "&&" | "||" | null = null;

		for (const segment of segments) {
			const trimmed = segment.trim();
			if (!trimmed) continue;

			if (trimmed === "&&" || trimmed === "||") {
				operator = trimmed;
				continue;
			}

			if (operator === "&&" && lastExitCode !== EXIT_CODE.success) break;
			if (operator === "||" && lastExitCode === EXIT_CODE.success) break;
			operator = null;

			lastExitCode = await this.executePipeline(trimmed, streams);
		}

		this.shell.env.set("?", lastExitCode.toString());

		if (!streams) {
			if (this.shell.state.ttyBuffer)
				this.shell.pushHistory({ text: this.shell.state.ttyBuffer, isCommand: false });
			this.shell.state.ttyBuffer = null;
		}

		return lastExitCode;
	}

	/**
	 * Handles the execution of a single command or a pipeline of piped commands.
	 */
	async executePipeline(input: string, streams?: { stdout?: Stream, stderr?: Stream }) {
		const previousPipeline = this.pipeline;
		const previousStream = this.shell.state.stream;

		// Split by pipe operator while respecting quoted strings
		const commandStrings = input.match(/(?:[^|"]+|"[^"]*")+/g)
			?.map((string) => string.trim())
			.filter(Boolean) ?? [];

		if (!commandStrings.length) return EXIT_CODE.success;

		this.pipeline = commandStrings.map((commandString) => {
			const rawArgs = ShellInterpreter.parseCommand(commandString);
			const args = rawArgs.flatMap((argument) => ShellInterpreter.expandBraces(argument));
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
			const nextStdin = !isLast ? this.pipeline[i + 1].stdin : null;

			if (nextStdin) {
				process.stdout.pipe(nextStdin);
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

		const lastProcess = this.pipeline.at(-1);
		if (lastProcess) this.shell.state.stream = ref(lastProcess.stdin);

		// Spawn processes in reverse to support piping stdin and reverse to make order of exit codes correct
		const tasks = [...this.pipeline].reverse().map((process) => {
			process.stdin.start();
			process.stdout.start();
			process.stderr.start();
			return this.spawn(process);
		}).reverse();

		const exitCodes = await Promise.all(tasks);

		this.pipeline = previousPipeline;
		this.shell.state.stream = previousStream;

		return exitCodes.at(-1) ?? EXIT_CODE.success;
	}

	/**
	 * Resolves a command, parses flags/options, and executes the command logic.
	 * @returns The resulting exit code from the command execution.
	 */
	async spawn({ stdin, stdout, stderr, commandName, args }: Process) {
		const timestamp = Date.now();

		try {
			if (!args.length) return EXIT_CODE.generalError;
			if (this.shell.env.parseAssignment(args[0])) return EXIT_CODE.success;

			const commandArgs = [...args];
			if (commandArgs[0].toLowerCase() === Shell.SUDO_COMMAND) commandArgs.shift();
			commandArgs.shift();

			const command = CommandsManager.find(commandName);
			if (!command)
				return Shell.writeError(stderr, commandName, Shell.COMMAND_NOT_FOUND_ERROR, EXIT_CODE.commandNotFound);

			const { options, inputs } = this.parseOptions(command, commandArgs);

			const cleanArgs = commandArgs.map((arg) => arg.replace(/^"|"$/g, ""));
			const isPiped = this.pipeline.some((process, i) => i > 0 && process.stdin === stdin);

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
	 * Parses flags and options out of a mutable args array, returning the collected options and
	 * input values. Flag args are removed from `commandArgs` in place as a side-effect.
	 * @param command - The command, used to look up option definitions.
	 * @param commandArgs - The mutable argument list to parse from. Modified in place.
	 * @returns An object containing the parsed option keys and any input values keyed by the option's short name.
	 */
	parseOptions(command: Command, commandArgs: string[]) {
		const options: string[] = [];
		const inputs: Record<string, string> = {};

		const flagArgs = commandArgs.filter((arg) => arg.startsWith("-") && !arg.startsWith("\""));

		for (const flag of flagArgs) {
			const keys = flag.startsWith("--")
				? [flag.substring(2).toLowerCase()]
				: flag.substring(1).split("");

			for (const key of keys) {
				const commandOption = command.getOption(key);
				const optionKey = commandOption?.short ?? key;

				if (options.includes(optionKey))
					continue;
				options.push(optionKey);

				if (commandOption?.isInput) {
					const index = commandArgs.indexOf(flag);
					const value = commandArgs[index + 1];
					inputs[commandOption.short] = value;
					removeFromArray(value, commandArgs);
				}
			}

			removeFromArray(flag, commandArgs);
		}

		return { options, inputs };
	}

	/**
	 * Splits a command string into an array of arguments, respecting single and double quotes.
	 */
	static parseCommand(input: string) {
		return input.match(/(?:[^\s"']+|"(?:[^"\\]|\\.)*"|'[^']*')+/g) ?? [];
	}

	/**
	 * Expands braces in a shell argument (e.g., "file{1..3}.txt" or "img.{jpg,png}").
	 * Supports nested expansion and numeric sequences.
	 */
	static expandBraces(argument: string): string[] {
		if (argument.startsWith("'") || argument.startsWith("\"")) return [argument];

		const braceMatch = argument.match(/\{([^{}]+)\}/);
		if (!braceMatch) return [argument];

		const [fullMatch, innerContent] = braceMatch;
		const prefix = argument.slice(0, braceMatch.index);
		const suffix = argument.slice((braceMatch.index ?? 0) + fullMatch.length);

		const sequenceMatch = innerContent.match(/^(\d+)\.\.(\d+)$/);
		if (sequenceMatch) {
			const start = parseInt(sequenceMatch[1]);
			const end = parseInt(sequenceMatch[2]);
			const step = start <= end ? 1 : -1;
			const expanded: string[] = [];

			for (let i = start; i !== end + step; i += step) {
				expanded.push(...this.expandBraces(`${prefix}${i}${suffix}`));
			}

			return expanded;
		}

		if (innerContent.includes(",")) {
			return innerContent
				.split(",")
				.flatMap((part) => this.expandBraces(`${prefix}${part}${suffix}`));
		}

		return [argument];
	}
}
import { ref } from "valtio";
import { EXIT_CODE, HOSTNAME, USERNAME } from "../../constants";
import { VirtualFile } from "../virtual-drive";
import { Process, Shell } from "./shell";
import { Stream, StreamSignal } from "./stream";
import { CommandsManager } from "./commands";
import { ShellParser } from "./shellParser";
import { ShellAST, ShellEnvironment } from ".";

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
	public terminatePipeline(signal: StreamSignal) {
		if (!this.pipeline.length)
			return;
		
		this.pipeline.forEach((process) => process.stdin.signal(signal));
		this.pipeline = [];
	}

	/**
	 * Parses and executes a shell script.
	 * @param script - The script content or a virtual file.
	 * @param streams - Optional output streams to override default TTY behavior.
	 * @returns The exit code of the last command executed in the script.
	 */
	public async executeScript(script: string | VirtualFile, streams?: { stdout?: Stream, stderr?: Stream }) {
		if (script instanceof VirtualFile) {
			const content = await script.read();
			
			if (!content)
				return EXIT_CODE.commandNotExecutable;
			
			script = content;
		}

		const block = ShellParser.parseScript(script);
		return await this.executeBlock(block, streams);
	}

	private async executeBlock(block: ShellAST.Block, streams?: { stdout?: Stream, stderr?: Stream }) {
		let lastExitCode: number = EXIT_CODE.success;

		for (const node of block) {
			if (node.type === ShellParser.COMMAND) {
				lastExitCode = await this.execute(node.command, streams);
			} else if (node.type === ShellParser.ASSIGNMENT) {
				const expandedValue = this.shell.env.expand(node.value);
				this.shell.env.set(node.name, expandedValue);
				lastExitCode = EXIT_CODE.success;
			} else if (node.type === ShellParser.IF) {
				const conditionExitCode = await this.execute(node.condition, streams);

				if (conditionExitCode === EXIT_CODE.success) {
					lastExitCode = await this.executeBlock(node.thenBranch, streams);
				} else {
					let elifMet = false;

					for (const elif of node.elifBranches) {
						const elifCode = await this.execute(elif.condition, streams);
					
						if (elifCode === EXIT_CODE.success) {
							lastExitCode = await this.executeBlock(elif.thenBranch, streams);
							elifMet = true;
							break;
						}
					}

					if (!elifMet && node.elseBranch.length > 0)
						lastExitCode = await this.executeBlock(node.elseBranch, streams);
				}
			} else if (node.type === ShellParser.WHILE) {
				while (await this.execute(node.condition, streams) === EXIT_CODE.success) {
					lastExitCode = await this.executeBlock(node.body, streams);
				}
			} else {
				const items = node.items.flatMap((item) => {
					const expanded = this.shell.env.expand(item);
					return ShellParser.expandBraces(expanded);
				});

				for (const item of items) {
					this.shell.env.set(node.variableName, item);
					lastExitCode = await this.executeBlock(node.body, streams);
				}
			}
		}

		return lastExitCode;
	}

	/**
	 * Parses and executes an input string, handling environment expansion, piping, and conditional chaining (`&&`, `||`).
	 * @param input - The raw command line string.
	 * @param streams - Optional output streams to override default TTY behavior.
	 * @returns A promise that resolves with the final exit code of the execution.
	 */
	public async execute(input: string, streams?: { stdout?: Stream, stderr?: Stream }) {
		if (!streams)
			this.shell.pushHistory({ text: this.shell.state.prompt + input, isCommand: true, value: input });

		input = this.shell.env.expand(input);

		// Split by logical operators while respecting quotes
		const segments = input.match(/(?:(?:"[^"]*"|'[^']*'|[^&|'"]|\|(?![|])|&(?![&]))+|&&|\|\|)/g) ?? [];
		let lastExitCode: number = EXIT_CODE.success;
		let operator: "&&" | "||" | null = null;

		for (const segment of segments) {
			const trimmed = segment.trim();
			if (!trimmed)
				continue;

			if (trimmed === "&&" || trimmed === "||") {
				operator = trimmed;
				continue;
			}

			if (operator === "&&" && lastExitCode !== EXIT_CODE.success)
				break;
			
			if (operator === "||" && lastExitCode === EXIT_CODE.success)
				break;
			
			operator = null;
			lastExitCode = await this.executePipeline(trimmed, streams);
		}

		this.shell.env.set(ShellEnvironment.EXIT_CODE, lastExitCode.toString());

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
	private async executePipeline(input: string, streams?: { stdout?: Stream, stderr?: Stream }) {
		const previousPipeline = this.pipeline;
		const previousStream = this.shell.state.stream;

		// Split by pipe operator while respecting quoted strings
		const commandStrings = input.match(/(?:[^|"]+|"[^"]*")+/g)
			?.map((string) => string.trim())
			.filter(Boolean) ?? [];

		if (!commandStrings.length)
			return EXIT_CODE.success;

		this.pipeline = commandStrings.map((commandString) => {
			const rawArgs = ShellParser.parseCommand(commandString);
			const args = rawArgs.flatMap((argument) => ShellParser.expandBraces(argument));
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
		if (lastProcess)
			this.shell.state.stream = ref(lastProcess.stdin);

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
	private async spawn({ stdin, stdout, stderr, commandName, args }: Process) {
		const timestamp = Date.now();

		try {
			if (!args.length)
				return EXIT_CODE.generalError;
			if (this.shell.env.parseAssignment(args[0]))
				return EXIT_CODE.success;

			const commandArgs = [...args];
			if (commandArgs[0].toLowerCase() === Shell.SUDO_COMMAND)
				commandArgs.shift();

			commandArgs.shift();

			const command = CommandsManager.find(commandName);
			
			if (!command)
				return Shell.writeError(stderr, commandName, Shell.COMMAND_NOT_FOUND_ERROR, EXIT_CODE.commandNotFound);

			const { options, inputs } = ShellParser.parseOptions(command, commandArgs);
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
}
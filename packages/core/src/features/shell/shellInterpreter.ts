import { ref } from "valtio";
import { EXIT_CODE, HOSTNAME, USERNAME } from "../../constants";
import { VirtualFile } from "../virtual-drive";
import { Process, Shell } from "./shell";
import { Stream, StreamSignal } from "./stream";
import { CommandsManager } from "./commands";
import { ShellParser } from "./shellParser";
import { ShellAST, ShellEnvironment } from ".";
import { ArithmeticParser } from "./arithmetic/arithmeticParser";

/**
 * Handles the parsing, expansion, and execution of shell commands and scripts.
 * Manages the process pipeline and stream redirection.
 */
export class ShellInterpreter {
	private shell: Shell;
	private arithmetic: ArithmeticParser;
	pipeline: Process[] = [];

	constructor(shell: Shell) {
		this.shell = shell;
		this.arithmetic = new ArithmeticParser(this.shell.env);
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
	 * @param args - The arguments to execute the script with.
	 * @param streams - Optional output streams to override default TTY behavior.
	 * @returns The exit code of the last command executed in the script.
	 */
	public async executeScript(script: string | VirtualFile, args: string[] = [], streams?: { stdout?: Stream, stderr?: Stream }, env: ShellEnvironment = this.shell.env) {
		let scriptName = "anonymous";
		if (script instanceof VirtualFile) {			
			const content = await script.read();
			if (!content)
				return EXIT_CODE.commandNotExecutable;
			
			scriptName = script.name;
			script = content;
		}

		env.set("0", scriptName);
		env.set("#", args.length.toString());
		
		const joinedArgs = args.join(" ");
		env.set("*", joinedArgs);
		env.set("@", joinedArgs);

		for (let i = 0; i < args.length; i++) {
			const positionalIndex = i + 1;
			env.set(positionalIndex.toString(), args[i]);
		}

		const block = ShellParser.parseScript(script);
		return await this.executeBlock(block, streams, env);
	}

	private async executeBlock(block: ShellAST.Block, streams?: { stdout?: Stream, stderr?: Stream }, env: ShellEnvironment = this.shell.env) {
		let lastExitCode: number = EXIT_CODE.success;

		for (const node of block) {
			switch (node.type) {
				case ShellParser.COMMAND:
					lastExitCode = await this.execute(node.command, streams, env);
					break;
				case ShellParser.ASSIGNMENT: {
					const expandedValue = env.expand(node.value);
					env.set(node.name, expandedValue);
					lastExitCode = EXIT_CODE.success;
					break;
				}
				case ShellParser.ARITHMETIC:
					lastExitCode = this.evaluateArithmetic(node.expression, env);
					break;
				case ShellParser.IF: {
					const ifBranch = node.ifBranch;
					const conditionExitCode = await this.executeCondition(ifBranch.condition, streams, env);

					if (conditionExitCode === EXIT_CODE.success) {
						lastExitCode = await this.executeBlock(ifBranch.thenBranch, streams, env);
					} else {
						let elifMet = false;

						for (const elif of node.elifBranches) {
							const elifCode = await this.executeCondition(elif.condition, streams, env);
						
							if (elifCode === EXIT_CODE.success) {
								lastExitCode = await this.executeBlock(elif.thenBranch, streams, env);
								elifMet = true;
								break;
							}
						}

						if (!elifMet && node.elseBranch.length > 0)
							lastExitCode = await this.executeBlock(node.elseBranch, streams, env);
					}
					break;
				}
				case ShellParser.WHILE:
					while (await this.executeCondition(node.condition, streams, env) === EXIT_CODE.success) {
						lastExitCode = await this.executeBlock(node.body, streams, env);
					}
					break;
				case ShellParser.FOR_IN: {
					const items = node.items.flatMap((item) => {
						const expanded = env.expand(item);
						return ShellParser.expandBraces(expanded);
					});

					for (const item of items) {
						env.set(node.variableName, item);
						lastExitCode = await this.executeBlock(node.body, streams, env);
					}
					break;
				}
				case ShellParser.FOR_EXPRESSION:
					this.evaluateArithmetic(node.setup.expression, env);

					while (this.evaluateArithmetic(node.condition.expression, env) === EXIT_CODE.success) {
						lastExitCode = await this.executeBlock(node.body, streams, env);
						this.evaluateArithmetic(node.step.expression, env);
					}
					break;
				default:
					throw new Error("Unknown node: " + JSON.stringify(node));
			}
		}

		return lastExitCode;
	}

	private async executeCondition(condition: ShellAST.ConditionNode["condition"], streams?: { stdout?: Stream, stderr?: Stream }, env: ShellEnvironment = this.shell.env): Promise<number> {
		return condition.type === ShellParser.ARITHMETIC
			? this.evaluateArithmetic(condition.expression, env)
			: await this.execute(condition.command, streams, env);
	}

	private evaluateArithmetic(expression: string, env: ShellEnvironment): number {
		const trimmed = expression.trim();
		if (!trimmed.length)
			return EXIT_CODE.success;

		try {
			const result = new ArithmeticParser(env).evaluate(expression);
			return result !== 0 ? EXIT_CODE.success : EXIT_CODE.generalError;
		} catch (error) {
			console.error(error);
			return EXIT_CODE.generalError;
		}
	}

	/**
	 * Parses and executes an input string, handling environment expansion, piping, and conditional chaining (`&&`, `||`).
	 * @param input - The raw command line string.
	 * @param streams - Optional output streams to override default TTY behavior.
	 * @param env - Optional environment to use.
	 * @returns A promise that resolves with the final exit code of the execution.
	 */
	public async execute(input: string, streams?: { stdout?: Stream, stderr?: Stream }, env: ShellEnvironment = this.shell.env) {
		if (!streams)
			this.shell.pushHistory({ text: this.shell.state.prompt + input, isCommand: true, value: input });

		input = env.expand(input);

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

			if (operator === "&&" && lastExitCode !== EXIT_CODE.success
				|| operator === "||" && lastExitCode === EXIT_CODE.success)
				break;
			
			operator = null;

			const isArithmetic = trimmed.startsWith(ShellParser.ARITHMETIC_PREFIX_TOKEN) && trimmed.endsWith(ShellParser.ARITHMETIC_SUFFIX_TOKEN);
			if (isArithmetic) {
				lastExitCode = this.evaluateArithmetic(trimmed.substring(ShellParser.ARITHMETIC_PREFIX_TOKEN.length, trimmed.length - ShellParser.ARITHMETIC_SUFFIX_TOKEN.length), env);
			} else {
				lastExitCode = await this.executePipeline(trimmed, streams, env);
			}
		}

		env.set(ShellEnvironment.EXIT_CODE, lastExitCode.toString());

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
	private async executePipeline(input: string, streams?: { stdout?: Stream, stderr?: Stream }, env: ShellEnvironment = this.shell.env) {
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
			const args = rawArgs.flatMap((argument) => env.expand(argument));
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
			const isFirst = i === 0;
			const isLast = i === this.pipeline.length - 1;
			const nextProcess = !isLast ? this.pipeline[i + 1] : null;

			process.stdout.start();
			process.stderr.start();

			if (isFirst)
				process.stdin.start();

			if (nextProcess) {
				process.stdout.pipe(nextProcess.stdin);
			} else {
				const targetStdout = streams?.stdout;
				process.stdout.on(Stream.DATA_EVENT, (data) => targetStdout ? targetStdout.write(data) : this.shell.write(data));
			}

			const targetStderr = streams?.stderr;
			process.stderr.on(Stream.DATA_EVENT, (data) => targetStderr ? targetStderr.write(data) : this.shell.write(data));
		});

		const lastProcess = this.pipeline.at(-1);
		if (lastProcess)
			this.shell.state.stream = ref(lastProcess.stdin);

		// Spawn processes in reverse to support piping stdin and reverse to make order of exit codes correct
		const tasks = [...this.pipeline].reverse()
			.map((process) => this.spawn(process, env))
			.reverse();

		const exitCodes = await Promise.all(tasks);

		this.pipeline = previousPipeline;
		this.shell.state.stream = previousStream;

		return exitCodes.at(-1) ?? EXIT_CODE.success;
	}

	/**
	 * Resolves a command, parses flags/options, and executes the command logic.
	 * @returns The resulting exit code from the command execution.
	 */
	private async spawn(process: Process, env: ShellEnvironment): Promise<number> {
		const { stdin, stdout, stderr, commandName, args } = process;
		const timestamp = Date.now();

		try {
			if (!args.length)
				return EXIT_CODE.generalError;
			if (env.parseAssignment(args[0]))
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
			
			const processIndex = this.pipeline.indexOf(process);
			const isPiped = processIndex > 0;

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
				username: env.get("USER") ?? USERNAME,
				hostname: env.get("HOSTNAME") ?? HOSTNAME,
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
				env: env.fork(),
			});

			return exitCode ?? EXIT_CODE.success;
		} catch (error) {
			console.error(error);
			return Shell.writeError(stderr, commandName);
		} finally {
			stdout.stop();
			stderr.stop();
		}
	}
}
import { ref } from "valtio";
import { EXIT_CODE, HOSTNAME, USERNAME } from "../../constants";
import { VirtualFile } from "../virtual-drive";
import { Process, ProcessIO, Shell } from "./shell";
import { Stream, StreamSignal } from "./stream";
import { ShellParser } from "./shellParser";
import { ArithmeticParser } from "./arithmetic/arithmeticParser";
import { ShellEnvironment } from "./shellEnvironment";
import { ExecutableResolver } from "./executableResolver";
import { ShellAST } from ".";

/**
 * Handles the parsing, expansion, and execution of shell commands and scripts.
 * Manages the process pipeline and stream redirection.
 */
export class ShellInterpreter {
	private shell: Shell;
	pipeline: Process[] = [];

	private static readonly PROMPT_ESCAPES: Record<string, (env: ShellEnvironment) => string> = {
		u: (env) => env.get(ShellEnvironment.USER) ?? USERNAME,
		h: (env) => env.get(ShellEnvironment.HOSTNAME) ?? HOSTNAME,
		w: (env) => {
			const pwd = env.get(ShellEnvironment.WORKING_DIRECTORY) ?? "/";
			const home = env.get(ShellEnvironment.HOME) ?? "~";
			return pwd.startsWith(home) ? pwd.replace(home, "~") : pwd;
		},
		W: (env) => (env.get(ShellEnvironment.WORKING_DIRECTORY) ?? "/").split("/").pop() || "/",
		"$": (env) => env.get(ShellEnvironment.USER) === "root" ? "#" : "$",
		n: () => "\n",
	};

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
	 * @param input - The script content or a virtual file.
	 * @param io - Optional output streams to override default TTY behavior.
	 * @returns The exit code of the last command executed in the script.
	 */
	public async execute(input: string | VirtualFile, io?: Partial<ProcessIO>) {
		if (input instanceof VirtualFile) {         
			const content = await input.read();
			if (!content)
				return EXIT_CODE.commandNotExecutable;
			
			input = content;
		}

		const block = ShellParser.parseScript(input);
		// console.log(block);

		const env = io?.env ?? this.shell.env;
		return await this.executeBlock(block, {
			...io,
			env,
		});
	}

	/**
	 * Executes a block of nodes, passing along stream overrides.
	 */
	private async executeBlock(block: ShellAST.Block, io?: Partial<ProcessIO>) {
		let exitCode: number = EXIT_CODE.success;
		for (const node of block) {
			exitCode = await this.executeNode(node, io);
		}
		return exitCode;
	}

	/**
	 * Dispatches an AST node to its specific execution logic.
	 */
	private async executeNode(node: ShellAST.Node, io?: Partial<ProcessIO>): Promise<number> {
		let exitCode: number = EXIT_CODE.success;
		const env = io?.env ?? this.shell.env;
		switch (node.type) {
			case ShellAST.NodeType.Command:
				exitCode = await this.executeCommands([node], io);
				break;
			case ShellAST.NodeType.Pipeline:
				exitCode = await this.executeCommands(node.commands, io);
				break;
			case ShellAST.NodeType.Logical: {
				const logicalNode = node;
				exitCode = await this.executeNode(logicalNode.left, io);
				
				if (logicalNode.operator === "&&" && exitCode === EXIT_CODE.success) {
					exitCode = await this.executeNode(logicalNode.right, io);
				} else if (logicalNode.operator === "||" && exitCode !== EXIT_CODE.success) {
					exitCode = await this.executeNode(logicalNode.right, io);
				}
				break;
			}
			case ShellAST.NodeType.Assignment: {
				const assignmentNode = node;
				const expandedValue = await this.evaluateArgument(assignmentNode.value, env);
				env.set(assignmentNode.name, expandedValue);
				exitCode = EXIT_CODE.success;
				break;
			}
			case ShellAST.NodeType.Arithmetic:
				exitCode = this.evaluateArithmetic(node.expression, env);
				break;
			case ShellAST.NodeType.If: {
				const ifNode = node;
				const conditionCode = await this.executeNode(ifNode.ifBranch.condition, io);

				if (conditionCode === EXIT_CODE.success) {
					exitCode = await this.executeBlock(ifNode.ifBranch.thenBranch, io);
				} else {
					let elifMet = false;
					for (const elif of ifNode.elifBranches) {
						const elifConditionCode = await this.executeNode(elif.condition, io);
						if (elifConditionCode === EXIT_CODE.success) {
							elifMet = true;
							exitCode = await this.executeBlock(elif.thenBranch, io);
							break;
						}
					}
					if (!elifMet) {
						if (ifNode.elseBranch.length) {
							exitCode = await this.executeBlock(ifNode.elseBranch, io);
						} else {
							exitCode = EXIT_CODE.success;
						}
					}
				}
				break;
			}
			case ShellAST.NodeType.While: {
				const whileNode = node;
				while ((exitCode = await this.executeNode(whileNode.condition, io)) === EXIT_CODE.success) {
					exitCode = await this.executeBlock(whileNode.body, io);
				}
				break;
			}
			case ShellAST.NodeType.ForIn: {
				const forInNode = node;
				const items: string[] = [];

				for (const argument of forInNode.items) {
					const expandedString = await this.evaluateArgument(argument, env);
					items.push(...ShellParser.expandBraces(expandedString));
				}

				for (const item of items) {
					env.set(forInNode.variableName, item);
					exitCode = await this.executeBlock(forInNode.body, io);
				}

				break;
			}
			case ShellAST.NodeType.ForExpression: {
				const forExprNode = node;
				exitCode = this.evaluateArithmetic(forExprNode.setup.expression, env);
				while ((exitCode = this.evaluateArithmetic(forExprNode.condition.expression, env)) === EXIT_CODE.success) {
					exitCode = await this.executeBlock(forExprNode.body, io);
					exitCode = this.evaluateArithmetic(forExprNode.step.expression, env);
				}
				break;
			}
			default:
				throw new Error("Unknown node: " + JSON.stringify(node));
		}

		env.set(ShellEnvironment.EXIT_CODE, exitCode.toString());
		return exitCode;
	}

	/**
	 * Handles the piping logic for any list of executable nodes.
	 */
	private async executeCommands(nodes: ShellAST.ExecutableNode[], io?: Partial<ProcessIO>) {
		const previousPipeline = this.pipeline;
		const previousStream = this.shell.state.stream;

		if (!nodes.length)
			return EXIT_CODE.success;

		const pipelineProcesses: Process[] = [];
		const tasks: Promise<number>[] = [];
		const env = io?.env ?? this.shell.env;

		for (const node of nodes) {
			const process: Process = {
				stdin: new Stream(),
				stdout: new Stream(),
				stderr: new Stream(),
				commandName: node.type === ShellAST.NodeType.Command ? "" : `<${node.type}>`,
				args: [],
				env,
			};

			if (node.type === ShellAST.NodeType.Command) {
				const commandNode = node;
				for (const argParts of commandNode.args) {
					process.args.push(await this.evaluateArgument(argParts, env));
				}
				process.commandName = process.args[0] ?? "";
				if (process.commandName === Shell.SUDO_COMMAND && process.args.length > 1) {
					process.commandName = process.args[1];
				}
			}

			pipelineProcesses.push(process);
		}

		this.pipeline = pipelineProcesses;

		pipelineProcesses.forEach((process, i) => {
			const isFirst = i === 0;
			const isLast = i === pipelineProcesses.length - 1;
			const nextProcess = !isLast ? pipelineProcesses[i + 1] : null;

			process.stdout.start();
			process.stderr.start();

			if (isFirst) {
				if (io?.stdin) {
					io.stdin.pipe(process.stdin);
				}
				process.stdin.start();
			}

			if (nextProcess) {
				process.stdout.pipe(nextProcess.stdin);
			} else {
				const targetStdout = io?.stdout;
				process.stdout.on(Stream.DATA_EVENT, (data) => targetStdout ? targetStdout.write(data) : this.shell.write(data));
			}

			const targetStderr = io?.stderr;
			process.stderr.on(Stream.DATA_EVENT, (data) => targetStderr ? targetStderr.write(data) : this.shell.write(data));
		});

		const lastProcess = pipelineProcesses.at(-1);
		if (lastProcess)
			this.shell.state.stream = ref(lastProcess.stdin);

		for (let i = nodes.length - 1; i >= 0; i--) {
			const node = nodes[i];
			const process = pipelineProcesses[i];
			
			if (node.type === ShellAST.NodeType.Command) {
				tasks.unshift(this.spawn(process));
			} else {
				tasks.unshift(this.executeNode(node, {
					stdin: process.stdin,
					stdout: process.stdout,
					stderr: process.stderr,
					env: process.env,
				}));
			}
		}

		const exitCodes = await Promise.all(tasks);

		this.pipeline = previousPipeline;
		this.shell.state.stream = previousStream;

		return exitCodes.at(-1) ?? EXIT_CODE.success;
	}

	private async evaluateArgument(parts: ShellAST.Argument, env: ShellEnvironment): Promise<string> {
		let result = "";

		for (const part of parts) {
			if (typeof part === "string") {
				result += part;
				continue;
			}

			switch (part.type) {
				case ShellAST.NodeType.ParameterExpansion: {
					let expandedDefault = "";
					if (part.argument)
						expandedDefault = await this.evaluateArgument(part.argument, env);

					result += env.expand(part, expandedDefault);
					break;
				}
				case ShellAST.NodeType.ArithmeticExpansion: {
					result += this.evaluateArithmetic(part.content.expression, env).toString();
					break;
				}
				case ShellAST.NodeType.CommandSubstitution: {
					const captureStream = new Stream();
					let output = "";
					captureStream.on("data", (data: string) => output += data);

					captureStream.start();
					await this.executeBlock(part.content, { stdout: captureStream, env });
					captureStream.stop();

					result += output.trim();
					break;
				}
			}
		}

		return this.removeQuotes(result);
	}

	private removeQuotes(input: string): string {
		let result = "";
		let inSingleQuote = false;
		let inDoubleQuote = false;

		for (let i = 0; i < input.length; i++) {
			const character = input[i];

			if (character === "'" && !inDoubleQuote) {
				inSingleQuote = !inSingleQuote;
			} else if (character === "\"" && !inSingleQuote) {
				inDoubleQuote = !inDoubleQuote;
			} else {
				result += character;
			}
		}

		return result;
	}

	public evaluateArithmetic(expression: string, env: ShellEnvironment): number {
		const trimmed = expression.trim();
		if (!trimmed.length)
			return EXIT_CODE.generalError;

		try {
			const result = new ArithmeticParser(env).evaluate(expression);
			return result !== 0 ? EXIT_CODE.success : EXIT_CODE.generalError;
		} catch (error) {
			console.error(error);
			return EXIT_CODE.generalError;
		}
	}

	/**
	 * Resolves a command, parses flags/options, and executes the command logic.
	 * @returns The resulting exit code from the command execution.
	 */
	private async spawn(process: Process): Promise<number> {
		const { stdin, stdout, stderr, commandName, args, env: parentEnv } = process;
		const timestamp = Date.now();

		try {
			if (!args.length)
				return EXIT_CODE.generalError;

			const commandArgs = [...args];
			commandArgs.shift();

			const result = await ExecutableResolver.resolve(commandName, parentEnv, this.shell.state.workingDirectory);
			if (result.isError())
				return Shell.writeError(stderr, commandName, result.error, EXIT_CODE.commandNotFound);

			const env = parentEnv.fork();
			env.set("0", commandName);
			env.set("#", commandArgs.length.toString());
			
			const joinedArgs = commandArgs.join(" ");
			env.set("*", joinedArgs);
			env.set("@", joinedArgs);

			for (let i = 0; i < commandArgs.length; i++) {
				const positionalIndex = i + 1;
				env.set(positionalIndex.toString(), commandArgs[i]);
			}

			if (result.value instanceof VirtualFile)
				return await this.execute(result.value, { stdin, stdout, stderr, env });

			const command = result.value;
			const { options, inputs } = ShellParser.parseOptions(command, commandArgs);
			
			const processIndex = this.pipeline.indexOf(process);
			const isPiped = processIndex > 0;

			if (command.requireArgs && !commandArgs.length && !isPiped)
				return Shell.writeError(stderr, commandName, [Shell.USAGE_ERROR, `${commandName} ${Shell.MISSING_ARGS_ERROR}`]);
			if (command.requireOptions && !options.length)
				return Shell.writeError(stderr, commandName, [Shell.USAGE_ERROR, `${commandName} ${Shell.MISSING_OPTIONS_ERROR}`]);
			
			const exitCode = await command.execute(commandArgs, {
				stdin,
				stdout,
				stderr,
				shell: this.shell,
				workingDirectory: this.shell.state.workingDirectory,
				username: env.get("USER") ?? USERNAME,
				hostname: env.get("HOSTNAME") ?? HOSTNAME,
				rawLine: joinedArgs,
				options,
				exit: () => this.shell.kill(),
				inputs,
				timestamp,
				virtualRoot: this.shell.config.virtualRoot,
				settingsManager: this.shell.config.settingsManager,
				systemManager: this.shell.config.systemManager,
				app: this.shell.config.app!,
				size: this.shell.config.sizeRef.current,
				env,
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

	/**
	 * Evaluates a prompt string by resolving escape sequences and shell expansions.
	 */
	public async evaluatePrompt(format: string, env = this.shell.env): Promise<string> {
		const result = format.replace(/\\([uhwW$n])/g, (match, key: string) => {
			const resolver = ShellInterpreter.PROMPT_ESCAPES[key];
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			return resolver ? resolver(env) : match;
		});

		try {
			const nodes = ShellParser.parseArgument(result);
			return await this.evaluateArgument(nodes, this.shell.env);
		} catch {
			return result;
		}
	}
}
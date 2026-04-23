import { ref } from "valtio";
import { EXIT_CODE, HOSTNAME, USERNAME } from "../../constants";
import { VirtualFile } from "../virtual-drive";
import { Process, ProcessIO, Shell } from "./shell";
import { Stream, StreamSignal } from "./streams/stream";
import { ShellParser } from "./shellParser";
import { ArithmeticParser } from "./arithmetic/arithmeticParser";
import { ShellEnvironment } from "./shellEnvironment";
import { ExecutableResolver } from "./executableResolver";
import { FileInputStream, FileOutputStream, ShellAST } from ".";
import { Result } from "@prozilla-os/shared";

/**
 * Handles the parsing, expansion, and execution of shell commands and scripts.
 * Manages the process pipeline and stream redirection.
 */
export class ShellInterpreter {
	private shell: Shell;
	pipeline: Process[] = [];

	private static readonly PROMPT_ESCAPES: Record<string, (env: ShellEnvironment) => string> = {
		"u": (env) => env.get(ShellEnvironment.USER) ?? USERNAME,
		"h": (env) => env.get(ShellEnvironment.HOSTNAME) ?? HOSTNAME,
		"w": (env) => {
			const path = env.get(ShellEnvironment.WORKING_DIRECTORY) ?? "/";
			const home = env.get(ShellEnvironment.HOME) ?? "~";
			return path.startsWith(home) ? path.replace(home, "~") : path;
		},
		"W": (env) => (env.get(ShellEnvironment.WORKING_DIRECTORY) ?? "/").split("/").pop() || "/",
		"$": (env) => env.get(ShellEnvironment.USER) === "root" ? "#" : "$",
		"n": () => "\n",
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
		console.log(block);

		const env = io?.env ?? this.shell.env;
		return await this.executeBlock(block, { ...io, env });
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
			case ShellAST.NodeType.Logical:
				exitCode = await this.executeLogicalNode(node, io);
				break;
			case ShellAST.NodeType.Assignment:
				exitCode = await this.executeAssignmentNode(node, env);
				break;
			case ShellAST.NodeType.Arithmetic:
				exitCode = this.evaluateArithmetic(node, env);
				break;
			case ShellAST.NodeType.If:
				exitCode = await this.executeIfNode(node, io);
				break;
			case ShellAST.NodeType.While:
				exitCode = await this.executeWhileNode(node, io);
				break;
			case ShellAST.NodeType.ForIn:
				exitCode = await this.executeForInNode(node, env, io);
				break;
			case ShellAST.NodeType.ForExpression:
				exitCode = await this.executeForExpressionNode(node, env, io);
				break;
			default:
				throw new Error("Unknown node: " + JSON.stringify(node));
		}

		env.set(ShellEnvironment.EXIT_CODE, exitCode.toString());
		return exitCode;
	}

	private async executeLogicalNode(node: ShellAST.LogicalNode, io?: Partial<ProcessIO>): Promise<number> {
		let exitCode = await this.executeNode(node.left, io);
		const isAndSuccess = node.operator === "&&" && exitCode === EXIT_CODE.success;
		const isOrFailure = node.operator === "||" && exitCode !== EXIT_CODE.success;

		if (isAndSuccess || isOrFailure) {
			exitCode = await this.executeNode(node.right, io);
		}
		return exitCode;
	}

	private async executeAssignmentNode(node: ShellAST.AssignmentNode, env: ShellEnvironment): Promise<number> {
		const expandedValue = await this.evaluateArgument(node.value, env);
		env.set(node.name, expandedValue);
		return EXIT_CODE.success;
	}

	private async executeIfNode(node: ShellAST.IfNode, io?: Partial<ProcessIO>): Promise<number> {
		const conditionCode = await this.executeNode(node.ifBranch.condition, io);

		if (conditionCode === EXIT_CODE.success) {
			return await this.executeBlock(node.ifBranch.thenBranch, io);
		}

		for (const elif of node.elifBranches) {
			if (await this.executeNode(elif.condition, io) === EXIT_CODE.success) {
				return await this.executeBlock(elif.thenBranch, io);
			}
		}

		if (node.elseBranch.length) {
			return await this.executeBlock(node.elseBranch, io);
		}

		return EXIT_CODE.success;
	}

	private async executeWhileNode(node: ShellAST.WhileNode, io?: Partial<ProcessIO>): Promise<number> {
		let exitCode: number = EXIT_CODE.success;
		while ((exitCode = await this.executeNode(node.condition, io)) === EXIT_CODE.success) {
			exitCode = await this.executeBlock(node.body, io);
		}
		return exitCode;
	}

	private async executeForInNode(node: ShellAST.ForInNode, env: ShellEnvironment, io?: Partial<ProcessIO>): Promise<number> {
		let exitCode: number = EXIT_CODE.success;
		const items: string[] = [];

		for (const argument of node.items) {
			const expanded = await this.evaluateArgument(argument, env);
			items.push(...ShellParser.expandBraces(expanded));
		}

		for (const item of items) {
			env.set(node.variableName, item);
			exitCode = await this.executeBlock(node.body, io);
		}
		return exitCode;
	}

	private async executeForExpressionNode(node: ShellAST.ForExpressionNode, env: ShellEnvironment, io?: Partial<ProcessIO>): Promise<number> {
		let exitCode = this.evaluateArithmetic(node.setup, env);
		while (this.evaluateArithmetic(node.condition, env) === EXIT_CODE.success) {
			exitCode = await this.executeBlock(node.body, io);
			exitCode = this.evaluateArithmetic(node.step, env);
		}
		return exitCode;
	}

	/**
	 * Handles the piping logic for any list of executable nodes.
	 */
	private async executeCommands(nodes: ShellAST.ExecutableNode[], io?: Partial<ProcessIO>): Promise<number> {
		if (!nodes.length)
			return EXIT_CODE.success;

		const previousPipeline = this.pipeline;
		const previousStream = this.shell.state.stream;
		const env = io?.env ?? this.shell.env;

		const pipelineProcesses = await this.createPipeline(nodes, env);
		this.pipeline = pipelineProcesses;

		this.linkStreams(pipelineProcesses, io);

		const lastProcess = pipelineProcesses.at(-1);
		if (lastProcess)
			this.shell.state.stream = ref(lastProcess.stdin);

		const tasks: Promise<number>[] = [];
		for (let i = nodes.length - 1; i >= 0; i--) {
			const node = nodes[i];
			const process = pipelineProcesses[i];

			if (node.type === ShellAST.NodeType.Command) {
				tasks.unshift(this.spawn(process, node.redirections));
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

	private async createPipeline(nodes: ShellAST.ExecutableNode[], env: ShellEnvironment): Promise<Process[]> {
		const processes: Process[] = [];
		for (const node of nodes) {
			const process: Process = { stdin: new Stream(), stdout: new Stream(), stderr: new Stream(), commandName: "", args: [], env };
			if (node.type === ShellAST.NodeType.Command) {
				for (const argumentParts of node.args) {
					process.args.push(await this.evaluateArgument(argumentParts, env));
				}
				process.commandName = process.args[0] ?? "";
				if (process.commandName === Shell.SUDO_COMMAND && process.args.length > 1)
					process.commandName = process.args[1];
			} else {
				process.commandName = `<${node.type}>`;
			}
			processes.push(process);
		}
		return processes;
	}

	private linkStreams(processes: Process[], io?: Partial<ProcessIO>) {
		processes.forEach((process, i) => {
			const next = processes[i + 1];
		
			if (i === 0 && io?.stdin)
				io.stdin.pipe(process.stdin);

			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (next) {
				process.stdout.pipe(next.stdin);
			} else if (io?.stdout) {
				process.stdout.pipe(io.stdout, false);
			} else {
				process.stdout.on(Stream.DATA_EVENT, (data) => this.shell.write(data));
			}
		
			if (io?.stderr) {
				process.stderr.pipe(io.stderr, false);
			} else {
				process.stderr.on(Stream.DATA_EVENT, (data) => this.shell.write(data));
			}
		});
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
					const defaultValue = part.argument ? await this.evaluateArgument(part.argument, env) : "";
					result += env.expand(part, defaultValue);
					break;
				}
				case ShellAST.NodeType.ArithmeticExpansion:
					result += this.evaluateArithmetic(part.content, env).toString();
					break;
				case ShellAST.NodeType.CommandSubstitution:
					result += await this.captureCommandOutput(part.content, env);
					break;
			}
		}
		return this.removeQuotes(result);
	}

	private async captureCommandOutput(block: ShellAST.Block, env: ShellEnvironment): Promise<string> {
		const outputStream = new Stream();
		let output = "";
		outputStream.on(Stream.DATA_EVENT, (data: string) => output += data);
		await this.executeBlock(block, { stdout: outputStream, env });
		outputStream.end();
		return output.trim();
	}

	private removeQuotes(input: string): string {
		let result = "";
		let inSingle = false;
		let inDouble = false;
		for (const char of input) {
			if (char === "'" && !inDouble) {
				inSingle = !inSingle;
			} else if (char === "\"" && !inSingle) {
				inDouble = !inDouble;
			} else {
				result += char;
			}
		}
		return result;
	}

	/**
	 * Evaluates an arithmetic expression using an {@link ArithmeticParser} and returns an exit code.
	 * @param node - The arithmetic operation.
	 * @param env - The {@link ShellEnvironment} used for variable resolution within this instance.
	 * @returns `EXIT_CODE.success` if the {@link ArithmeticParserResult} is successful and non-zero, 
	 * or `EXIT_CODE.generalError` otherwise.
	 */
	public evaluateArithmetic(node: ShellAST.ArithmeticNode,  env: ShellEnvironment): number {
		return Result.ok(node.expression.trim())
			.filter((expression) => expression.length !== 0, () => "Empty expression")
			.next((expression) => new ArithmeticParser(env).evaluate(expression))
			.match((result) => node.isCondition ? result !== 0 ? EXIT_CODE.success : EXIT_CODE.generalError : result, (error) => {
				console.error(error);
				return EXIT_CODE.generalError;
			});
	}

	private async executeRedirections(redirections: ShellAST.RedirectionNode[], io: ProcessIO) {
		const streamMap: Record<number, Stream> = { 0: io.stdin, 1: io.stdout, 2: io.stderr };

		for (const redirection of redirections) {
			const targetPath = await this.evaluateArgument(redirection.target, io.env);
			const descriptor = redirection.fileDescriptor;

			if (redirection.operator === ">&" || redirection.operator === "<&") {
				const targetDescriptor = parseInt(targetPath);
				const sourceStream = streamMap[descriptor];
				const targetStream = streamMap[targetDescriptor];
			
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				if (sourceStream && targetStream)
					targetStream.pipe(sourceStream);
				continue;
			}

			const isOutput = redirection.operator === ">" || redirection.operator === ">>";
			const target = this.shell.state.workingDirectory.navigate(targetPath, isOutput);

			if (!target || !target.isFile())
				continue;

			if (redirection.operator === "<" && descriptor === 0) {
				io.stdin = new FileInputStream(target);
			} else if (isOutput) {
				const stream = new FileOutputStream(target);

				if (redirection.operator === ">>") {
					const content = await target.read();
					if (content != null)
						await stream.write(content);
				}
			
				if (descriptor === 1) {
					io.stdout = stream;
				} else if (descriptor === 2) {
					io.stderr = stream;
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				} else if (streamMap[descriptor]) {
					streamMap[descriptor] = stream;
				}
			}
		}
	}

	/**
	 * Resolves a command, parses flags/options, and executes the command logic.
	 * @returns The resulting exit code from the command execution.
	 */
	private async spawn(process: Process, redirections: ShellAST.RedirectionNode[] = []): Promise<number> {
		const { stdin, stdout, stderr, commandName, args, env: parentEnv } = process;
		const io: ProcessIO = { stdin, stdout, stderr, env: parentEnv };
		
		const timestamp = Date.now();

		try {
			if (!args.length)
				return EXIT_CODE.generalError;

			const result = await ExecutableResolver.resolve(commandName, parentEnv, this.shell.state.workingDirectory);
			if (result.isError())
				return Shell.writeError(stderr, commandName, result.error, EXIT_CODE.commandNotFound);

			const commandArgs = args.slice(1);
			io.env = parentEnv.fork();
			io.env.setCommandArguments(commandName, commandArgs);

			await this.executeRedirections(redirections, io);

			if (result.value instanceof VirtualFile)
				return await this.execute(result.value, io);

			const command = result.value;
			const { options, inputs } = ShellParser.parseOptions(command, commandArgs);
			const isPiped = this.pipeline.indexOf(process) > 0;

			if (command.requireArgs && !commandArgs.length && !isPiped)
				return Shell.writeError(stderr, commandName, [Shell.USAGE_ERROR, `${commandName} ${Shell.MISSING_ARGS_ERROR}`]);
			if (command.requireOptions && !options.length)
				return Shell.writeError(stderr, commandName, [Shell.USAGE_ERROR, `${commandName} ${Shell.MISSING_OPTIONS_ERROR}`]);
			
			const exitCode = await command.execute(commandArgs, {
				stdin: io.stdin,
				stdout: io.stdout,
				stderr: io.stderr,
				shell: this.shell,
				workingDirectory: this.shell.state.workingDirectory,
				username: io.env.get("USER") ?? USERNAME,
				hostname: io.env.get("HOSTNAME") ?? HOSTNAME,
				rawLine: commandArgs.join(" "),
				options,
				exit: () => this.shell.kill(),
				inputs,
				timestamp,
				virtualRoot: this.shell.config.virtualRoot,
				settingsManager: this.shell.config.settingsManager,
				systemManager: this.shell.config.systemManager,
				app: this.shell.config.app!,
				size: this.shell.config.sizeRef.current,
				env: io.env,
			});

			return exitCode ?? EXIT_CODE.success;
		} catch (error) {
			console.error(error);
			return Shell.writeError(stderr, commandName);
		} finally {
			stdout.end();
			stderr.end();

			if (io.stdout !== stdout)
				io.stdout.end();
			if (io.stderr !== stderr)
				io.stderr.end();
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
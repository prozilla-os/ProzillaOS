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
	 * @param input - The script content or a virtual file.
	 * @param args - The arguments to execute the script with.
	 * @param streams - Optional output streams to override default TTY behavior.
	 * @returns The exit code of the last command executed in the script.
	 */
	public async execute(input: string | VirtualFile, args: string[] = [], streams?: { stdout?: Stream, stderr?: Stream }, env = this.shell.env) {
		let scriptName = "anonymous";
		if (input instanceof VirtualFile) {         
			const content = await input.read();
			if (!content)
				return EXIT_CODE.commandNotExecutable;
			
			scriptName = input.name;
			input = content;
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

		const block = ShellParser.parseScript(input);
		// console.log(block);
		return await this.executeBlock(block, streams, env);
	}

	/**
	 * Executes a block of nodes, passing along stream overrides.
	 */
	private async executeBlock(block: ShellAST.Block, streams?: { stdin?: Stream, stdout?: Stream, stderr?: Stream }, env = this.shell.env) {
		let lastExitCode: number = EXIT_CODE.success;

		for (const node of block) {
			lastExitCode = await this.executeNode(node, streams, env);
		}

		env.set(ShellEnvironment.EXIT_CODE, lastExitCode.toString());

		if (!streams) {
			if (this.shell.state.ttyBuffer) {
				this.shell.pushHistory({ text: this.shell.state.ttyBuffer, isCommand: false });
			}
			this.shell.state.ttyBuffer = null;
		}

		return lastExitCode;
	}

	/**
	 * Dispatches an AST node to its specific execution logic.
	 */
	private async executeNode(node: ShellAST.Node, streams?: { stdin?: Stream, stdout?: Stream, stderr?: Stream }, env = this.shell.env): Promise<number> {
		switch (node.type) {
			case ShellParser.COMMAND:
				return await this.executeCommands([node], streams, env);
			case ShellParser.PIPELINE:
				return await this.executeCommands(node.commands, streams, env);
			case ShellParser.LOGICAL: {
				const logicalNode = node;
				let exitCode = await this.executeNode(logicalNode.left, streams, env);
				
				if (logicalNode.operator === "&&" && exitCode === EXIT_CODE.success) {
					exitCode = await this.executeNode(logicalNode.right, streams, env);
				} else if (logicalNode.operator === "||" && exitCode !== EXIT_CODE.success) {
					exitCode = await this.executeNode(logicalNode.right, streams, env);
				}
				
				return exitCode;
			}
			case ShellParser.ASSIGNMENT: {
				const assignmentNode = node;
				const expandedValue = await this.resolveExpansions(assignmentNode.value, env);
				env.set(assignmentNode.name, expandedValue);
				return EXIT_CODE.success;
			}
			case ShellParser.ARITHMETIC:
				return this.evaluateArithmetic(node.expression, env);
			case ShellParser.IF: {
				const ifNode = node;
				const conditionExitCode = await this.executeNode(ifNode.ifBranch.condition, streams, env);

				if (conditionExitCode === EXIT_CODE.success) {
					return await this.executeBlock(ifNode.ifBranch.thenBranch, streams, env);
				} else {
					let elifMet = false;
					for (const elif of ifNode.elifBranches) {
						const elifCode = await this.executeNode(elif.condition, streams, env);
						if (elifCode === EXIT_CODE.success) {
							elifMet = true;
							return await this.executeBlock(elif.thenBranch, streams, env);
						}
					}
					// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
					if (!elifMet && ifNode.elseBranch.length)
						return await this.executeBlock(ifNode.elseBranch, streams, env);
				}
				return EXIT_CODE.success;
			}
			case ShellParser.WHILE: {
				const whileNode = node;
				let lastExitCode: number = EXIT_CODE.success;
				while (await this.executeNode(whileNode.condition, streams, env) === EXIT_CODE.success) {
					lastExitCode = await this.executeBlock(whileNode.body, streams, env);
				}
				return lastExitCode;
			}
			case ShellParser.FOR_IN: {
				const forInNode = node;
				let lastExitCode: number = EXIT_CODE.success;
				const items: string[] = [];

				for (const argument of forInNode.items) {
					const expandedString = await this.resolveExpansions(argument, env);
					items.push(...ShellParser.expandBraces(expandedString));
				}

				for (const item of items) {
					env.set(forInNode.variableName, item);
					lastExitCode = await this.executeBlock(forInNode.body, streams, env);
				}

				return lastExitCode;
			}
			case ShellParser.FOR_EXPRESSION: {
				const forExprNode = node;
				let lastExitCode: number = EXIT_CODE.success;
				this.evaluateArithmetic(forExprNode.setup.expression, env);
				while (this.evaluateArithmetic(forExprNode.condition.expression, env) === EXIT_CODE.success) {
					lastExitCode = await this.executeBlock(forExprNode.body, streams, env);
					this.evaluateArithmetic(forExprNode.step.expression, env);
				}
				return lastExitCode;
			}
			default:
				throw new Error("Unknown node: " + JSON.stringify(node));
		}
	}

	/**
	 * Handles the piping logic for any list of executable nodes.
	 */
	private async executeCommands(nodes: ShellAST.ExecutableNode[], streams?: { stdin?: Stream, stdout?: Stream, stderr?: Stream }, env = this.shell.env) {
		const previousPipeline = this.pipeline;
		const previousStream = this.shell.state.stream;

		if (!nodes.length)
			return EXIT_CODE.success;

		const pipelineProcesses: Process[] = [];
		const tasks: Promise<number>[] = [];

		for (const node of nodes) {
			const proc: Process = {
				stdin: new Stream(),
				stdout: new Stream(),
				stderr: new Stream(),
				commandName: node.type === ShellParser.COMMAND ? "" : `<${node.type}>`,
				args: [],
			};

			if (node.type === ShellParser.COMMAND) {
				const commandNode = node;
				for (const argParts of commandNode.args) {
					proc.args.push(await this.resolveExpansions(argParts, env));
				}
				proc.commandName = proc.args[0]?.toLowerCase() ?? "";
				if (proc.commandName === Shell.SUDO_COMMAND && proc.args.length > 1) {
					proc.commandName = proc.args[1].toLowerCase();
				}
			}

			pipelineProcesses.push(proc);
		}

		this.pipeline = pipelineProcesses;

		pipelineProcesses.forEach((process, i) => {
			const isFirst = i === 0;
			const isLast = i === pipelineProcesses.length - 1;
			const nextProcess = !isLast ? pipelineProcesses[i + 1] : null;

			process.stdout.start();
			process.stderr.start();

			if (isFirst) {
				if (streams?.stdin) {
					streams.stdin.pipe(process.stdin);
				}
				process.stdin.start();
			}

			if (nextProcess) {
				process.stdout.pipe(nextProcess.stdin);
			} else {
				const targetStdout = streams?.stdout;
				process.stdout.on(Stream.DATA_EVENT, (data) => targetStdout ? targetStdout.write(data) : this.shell.write(data));
			}

			const targetStderr = streams?.stderr;
			process.stderr.on(Stream.DATA_EVENT, (data) => targetStderr ? targetStderr.write(data) : this.shell.write(data));
		});

		const lastProcess = pipelineProcesses.at(-1);
		if (lastProcess)
			this.shell.state.stream = ref(lastProcess.stdin);

		for (let i = nodes.length - 1; i >= 0; i--) {
			const node = nodes[i];
			const proc = pipelineProcesses[i];
			
			if (node.type === ShellParser.COMMAND) {
				tasks.unshift(this.spawn(proc, env));
			} else {
				tasks.unshift(this.executeNode(node, {
					stdin: proc.stdin,
					stdout: proc.stdout,
					stderr: proc.stderr,
				}, env));
			}
		}

		const exitCodes = await Promise.all(tasks);

		this.pipeline = previousPipeline;
		this.shell.state.stream = previousStream;

		return exitCodes.at(-1) ?? EXIT_CODE.success;
	}

	private async resolveExpansions(parts: (string | ShellAST.ExpansionNode)[], env: ShellEnvironment): Promise<string> {
		let result = "";

		for (const part of parts) {
			if (typeof part === "string") {
				result += part;
				continue;
			}

			switch (part.type) {
				case ShellParser.PARAMETER_EXPANSION: {
					let expandedDefault = "";
					if (part.argument)
						expandedDefault = await this.resolveExpansions(part.argument, env);

					result += env.expand(part, expandedDefault);
					break;
				}
				case ShellParser.ARITHMETIC_EXPANSION: {
					result += this.evaluateArithmetic(part.content.expression, env).toString();
					break;
				}
				case ShellParser.COMMAND_SUBSTITUTION: {
					const captureStream = new Stream();
					let output = "";
					captureStream.on("data", (data: string) => output += data);

					captureStream.start();
					await this.executeBlock(part.content, { stdout: captureStream }, env);
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
	 * Resolves a command, parses flags/options, and executes the command logic.
	 * @returns The resulting exit code from the command execution.
	 */
	private async spawn(process: Process, env: ShellEnvironment): Promise<number> {
		const { stdin, stdout, stderr, commandName, args } = process;
		const timestamp = Date.now();

		try {
			if (!args.length)
				return EXIT_CODE.generalError;

			const commandArgs = [...args];
			if (commandArgs[0].toLowerCase() === Shell.SUDO_COMMAND)
				commandArgs.shift();
			commandArgs.shift();

			const command = CommandsManager.find(commandName);
			if (!command)
				return Shell.writeError(stderr, commandName, Shell.COMMAND_NOT_FOUND_ERROR, EXIT_CODE.commandNotFound);

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
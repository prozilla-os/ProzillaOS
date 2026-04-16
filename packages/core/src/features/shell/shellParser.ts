import { ShellAST } from ".";
import { Command } from "./command";
import { removeFromArray } from "@prozilla-os/shared";

/**
 * A static utility class for parsing shell scripts into an Abstract Syntax Tree (AST).
 * Handles tokenization, control flow parsing (if, while, for), and shell-specific expansions.
 * @hideconstructor
 */
export class ShellParser {
	static readonly KEYWORD_IF = "if";
	static readonly KEYWORD_THEN = "then";
	static readonly KEYWORD_ELIF = "elif";
	static readonly KEYWORD_ELSE = "else";
	static readonly KEYWORD_FI = "fi";
	static readonly KEYWORD_WHILE = "while";
	static readonly KEYWORD_FOR = "for";
	static readonly KEYWORD_DO = "do";
	static readonly KEYWORD_DONE = "done";
	static readonly KEYWORD_IN = "in";

	static readonly ARITHMETIC_PREFIX_TOKEN = "((";
	static readonly ARITHMETIC_SUFFIX_TOKEN = "))";

	static readonly COMMAND = "command";
	static readonly IF = "if";
	static readonly CONDITIONAL_BLOCK = "conditionalBlock";
	static readonly WHILE = "while";
	static readonly FOR_IN = "forIn";
	static readonly FOR_EXPRESSION = "forExpression";
	static readonly ASSIGNMENT = "assignment";
	static readonly ARITHMETIC = "arithmetic";

	/**
	 * High-level method to transform a raw script string into a structured AST.
	 * @param script - The raw shell script string.
	 * @returns An array of AST nodes representing the script execution flow.
	 */
	public static parseScript(script: string) {
		const lines = this.tokenizeScript(script);
		return this.parseStatements(lines, 0, []).nodes;
	}

	/**
	 * Breaks a script into individual lines/commands, handling quotes, comments, and semicolons.
	 * @param script - The script content to tokenize.
	 * @returns An array of sanitized command strings.
	 */
	private static tokenizeScript(script: string) {
		const lines: string[] = [];
		let currentLine = "";
		let inSingleQuote = false;
		let inDoubleQuote = false;
		let inComment = false;
		let parenthesisDepth = 0;
		let braceDepth = 0;

		for (let i = 0; i < script.length; i++) {
			const char = script[i];

			if (inComment) {
				if (char === "\n") {
					inComment = false;
					if (currentLine.trim())
						lines.push(currentLine.trim());
					currentLine = "";
				}
				continue;
			}

			if (char === "'" && !inDoubleQuote) {
				inSingleQuote = !inSingleQuote;
			} else if (char === "\"" && !inSingleQuote) {
				inDoubleQuote = !inDoubleQuote;
			} else if (!inSingleQuote && !inDoubleQuote) {
				if (char === "#" && (currentLine.trim() === "" || currentLine.endsWith(" "))) {
					inComment = true;
					continue;
				}
				if (char === "(")
					parenthesisDepth++;
				if (char === ")")
					parenthesisDepth--;
				
				if (char === "{" && script[i - 1] === "$")
					braceDepth++;
				if (char === "}" && braceDepth > 0)
					braceDepth--;
			}

			if ((char === "\n" || char === ";") && !inSingleQuote && !inDoubleQuote && parenthesisDepth === 0 && braceDepth === 0) {
				if (currentLine.trim())
					lines.push(currentLine.trim());
				currentLine = "";
			} else {
				currentLine += char;
			}
		}

		if (currentLine.trim())
			lines.push(currentLine.trim());
		return lines;
	}

	/**
	 * Iteratively parses lines into AST nodes until an end token is reached or lines run out.
	 * @param lines - The array of tokenized lines.
	 * @param startIndex - The index to start parsing from.
	 * @param endTokens - Tokens that signal the end of a block (e.g., `fi`, `done`).
	 * @returns An object containing the parsed nodes and the stopping context.
	 */
	private static parseStatements(lines: string[], startIndex: number, endTokens: string[]) {
		const nodes: ShellAST.Block = [];
		let index = startIndex;

		while (index < lines.length) {
			const line = lines[index];
			const tokens = this.parseCommand(line);
			const firstWord = tokens[0] ?? "";

			if (endTokens.includes(firstWord))
				return { nodes, nextIndex: index, endToken: firstWord };

			switch (firstWord) {
				case this.KEYWORD_IF: {
					const block = this.parseIf(lines, index);
					nodes.push(block.node);
					index = block.nextIndex;
					break;
				}
				case this.KEYWORD_WHILE: {
					const block = this.parseWhile(lines, index);
					nodes.push(block.node);
					index = block.nextIndex;
					break;
				}
				case this.KEYWORD_FOR: {
					const block = this.parseFor(lines, index);
					nodes.push(block.node);
					index = block.nextIndex;
					break;
				}
				case this.KEYWORD_THEN:
				case this.KEYWORD_DO:
					if (tokens.length > 1) {
						lines[index] = line.substring(line.indexOf(tokens[1]));
					} else {
						index++;
					}
					break;
				case "":
					index++;
					break;
				default: {
					const isArithmetic = line.startsWith(this.ARITHMETIC_PREFIX_TOKEN) && line.endsWith(this.ARITHMETIC_SUFFIX_TOKEN);
					const isAssignment = /^[a-zA-Z_][a-zA-Z0-9_]*(\+|-|\*|\/|%)?=/.test(line);

					if (isArithmetic) {
						const expressionLength = 2;
						nodes.push(this.parseArithmetic(line.substring(expressionLength, line.length - expressionLength)));
					} else if (isAssignment) {
						nodes.push(this.parseAssignment(line));
					} else {
						nodes.push({ type: this.COMMAND, command: line });
					}
					index++;
				}
			}
		}

		return { nodes, nextIndex: index };
	}

	/**
	 * If `keyword` appears on `lines[index]` and has trailing content, rewrites the line to
	 * start at that content and returns the same index (so it gets re-processed). Otherwise
	 * advances past the keyword-only line and returns the incremented index.
	 */
	private static advancePastKeyword(lines: string[], index: number, keyword: string): number {
		const tokens = this.parseCommand(lines[index]);
		const keywordIndex = tokens.indexOf(keyword);

		if (keywordIndex !== -1 && keywordIndex < tokens.length - 1) {
			lines[index] = lines[index].substring(lines[index].indexOf(tokens[keywordIndex + 1]));
			return index;
		}

		return index + 1;
	}

	/**
	 * Parses `if`/`elif`/`else` blocks into an {@link ShellAST.IfNode}.
	 * @param lines - The array of tokenized lines.
	 * @param startIndex - The line index where the `if` starts.
	 * @returns The generated {@link ShellAST.IfNode} and the index to resume parsing.
	 */
	private static parseIf(lines: string[], startIndex: number) {
		let index = startIndex;
		const rawCondition = lines[index].replace(/^if\s+/i, "").split(/;?\s+then(?:\s|$)/i)[0].trim();
		const condition = this.resolveCondition(rawCondition);

		index = this.advancePastKeyword(lines, index, this.KEYWORD_THEN);

		const thenResult = this.parseStatements(lines, index, [this.KEYWORD_ELIF, this.KEYWORD_ELSE, this.KEYWORD_FI]);
		const ifBranch: ShellAST.ConditionalBlockNode = { type: this.CONDITIONAL_BLOCK, condition, thenBranch: thenResult.nodes };
		
		index = thenResult.nextIndex;
		let currentEndToken = thenResult.endToken;

		const elifBranches: ShellAST.ConditionalBlockNode[] = [];
		while (currentEndToken === this.KEYWORD_ELIF) {
			const result = this.parseElifBranch(lines, index);
			elifBranches.push(result.branch);
			index = result.nextIndex;
			currentEndToken = result.endToken;
		}

		let elseBranch: ShellAST.Block = [];
		if (currentEndToken === this.KEYWORD_ELSE) {
			const result = this.parseElseBranch(lines, index);
			elseBranch = result.nodes;
			index = result.nextIndex;
			currentEndToken = result.endToken;
		}

		if (currentEndToken === this.KEYWORD_FI) index++;

		const node: ShellAST.IfNode = { type: this.IF, ifBranch, elifBranches, elseBranch };
		return { node, nextIndex: index };
	}

	/**
	 * Parses an `elif` branch, returning the branch data and the end token that stopped it.
	 */
	private static parseElifBranch(lines: string[], startIndex: number) {
		let index = startIndex;
		const rawCondition = lines[index].replace(/^elif\s+/i, "").split(/;?\s+then(?:\s|$)/i)[0].trim();
		const condition = this.resolveCondition(rawCondition);

		index = this.advancePastKeyword(lines, index, this.KEYWORD_THEN);

		const result = this.parseStatements(lines, index, [this.KEYWORD_ELIF, this.KEYWORD_ELSE, this.KEYWORD_FI]);
		const branch: ShellAST.ConditionalBlockNode = {
			type: this.CONDITIONAL_BLOCK,
			condition,
			thenBranch: result.nodes,
		};

		return {
			branch,
			nextIndex: result.nextIndex,
			endToken: result.endToken,
		};
	}

	/**
	 * Parses an `else` branch of an `if` block, returning its body and the end token (`fi`).
	 */
	private static parseElseBranch(lines: string[], startIndex: number) {
		let index = startIndex;
		const tokens = this.parseCommand(lines[index]);

		if (tokens.length > 1) {
			lines[index] = lines[index].substring(lines[index].indexOf(tokens[1]));
		} else {
			index++;
		}

		const result = this.parseStatements(lines, index, [this.KEYWORD_FI]);
		return { nodes: result.nodes, nextIndex: result.nextIndex, endToken: result.endToken };
	}

	/**
	 * Parses a while-loop structure into a {@link ShellAST.WhileNode}.
	 * @param lines - The tokenized lines.
	 * @param startIndex - The line index where the `while` starts.
	 * @returns The generated {@link ShellAST.WhileNode} and next index.
	 */
	private static parseWhile(lines: string[], startIndex: number) {
		let index = startIndex;
		const rawCondition = lines[index].replace(/^while\s+/i, "").split(/;?\s+do(?:\s|$)/i)[0].trim();
		const condition = this.resolveCondition(rawCondition);

		index = this.advancePastKeyword(lines, index, this.KEYWORD_DO);

		const result = this.parseStatements(lines, index, [this.KEYWORD_DONE]);
		index = result.nextIndex;
		if (result.endToken === this.KEYWORD_DONE) index++;

		const node: ShellAST.WhileNode = { type: this.WHILE, condition, body: result.nodes };
		return { node, nextIndex: index };
	}

	/**
	 * Parses a for-loop structure into a {@link ShellAST.ForNode}, extracting the iterator variable and items.
	 * @param lines - The tokenized lines.
	 * @param startIndex - The line index where the `for` starts.
	 * @returns The generated {@link ShellAST.ForNode} and next index.
	 */
	private static parseFor(lines: string[], startIndex: number) {
		const line = lines[startIndex];
		return /for\s*\(\(/.test(line)
			? this.parseForExpression(lines, startIndex)
			: this.parseForIn(lines, startIndex);
	}

	private static parseForExpression(lines: string[], startIndex: number) {
		let index = startIndex;
		const line = lines[index];

		const match = line.match(/for\s*\(\(\s*(.*?)\s*\)\)/);
		if (!match)
			throw new Error(`Invalid arithmetic for loop syntax at: ${line}`);

		const parts = match[1].split(";").map((p) => p.trim()).filter(Boolean);
        
		const setup = this.parseArithmetic(parts[0] || "0");
		const condition = this.parseArithmetic(parts[1] || "1");
		const step = this.parseArithmetic(parts[2] || "0");

		index = this.advancePastKeyword(lines, index, this.KEYWORD_DO);

		const result = this.parseStatements(lines, index, [this.KEYWORD_DONE]);
		index = result.nextIndex;
        
		if (result.endToken === this.KEYWORD_DONE)
			index++;

		const node: ShellAST.ForExpressionNode = { 
			type: this.FOR_EXPRESSION, 
			setup, 
			condition, 
			step, 
			body: result.nodes, 
		};

		return { node, nextIndex: index };
	}

	private static parseForIn(lines: string[], startIndex: number) {
		let index = startIndex;
		const tokens = this.parseCommand(lines[index]);
		const variableName = tokens[1];
		const inIndex = tokens.indexOf(this.KEYWORD_IN);
		const doIndex = tokens.indexOf(this.KEYWORD_DO);

		const itemLimit = doIndex !== -1 ? doIndex : tokens.length;
		const items = inIndex !== -1
			? tokens.slice(inIndex + 1, itemLimit).map((item) => item.replace(/;$/, ""))
			: [];

		index = this.advancePastKeyword(lines, index, this.KEYWORD_DO);

		const result = this.parseStatements(lines, index, [this.KEYWORD_DONE]);
		index = result.nextIndex;
		
		if (result.endToken === this.KEYWORD_DONE)
			index++;

		const node: ShellAST.ForInNode = { 
			type: this.FOR_IN, 
			variableName, 
			items, 
			body: result.nodes, 
		};

		return { node, nextIndex: index };
	}

	private static parseAssignment(line: string): ShellAST.AssignmentNode {
		const assignmentIndex = line.indexOf("=");
		let name = line.substring(0, assignmentIndex).trim();
		const rawValue = line.substring(assignmentIndex + 1).trim();

		const operatorMatch = name.match(/(\+|-|\*|\/|%)$/);
		if (operatorMatch) {
			const operator = operatorMatch[0];
			name = name.slice(0, -1).trim();
            
			return {
				type: this.ASSIGNMENT,
				name,
				value: `\${${name}}${operator}${rawValue}`,
			};
		}
        
		return {
			type: this.ASSIGNMENT,
			name,
			value: rawValue,
		};
	}
	
	private static parseArithmetic(expression: string): ShellAST.ArithmeticNode {
		return { 
			type: this.ARITHMETIC, 
			expression: expression.trim(), 
		};
	}

	/**
	 * Converts a raw string condition into a CommandNode or ArithmeticNode.
	 */
	private static resolveCondition(rawCondition: string): ShellAST.CommandNode | ShellAST.ArithmeticNode {
		const trimmed = rawCondition.trim();
		if (trimmed.startsWith(this.ARITHMETIC_PREFIX_TOKEN) && trimmed.endsWith(this.ARITHMETIC_SUFFIX_TOKEN)) {
			const expression = trimmed.substring(2, trimmed.length - 2).trim();
			return this.parseArithmetic(expression || "0");
		}
		return { type: this.COMMAND, command: rawCondition };
	}

	/**
	 * Splits a command string into an array of arguments, respecting single and double quotes.
	 * @param input - The raw command line string.
	 * @returns An array of string tokens/arguments.
	 */
	public static parseCommand(input: string): string[] {
		return input.match(/(?:[^\s"']+|"(?:[^"\\]|\\.)*"|'[^']*')+/g) ?? [];
	}

	/**
	 * Expands braces in a shell argument (e.g., `"file{1..3}.txt"` or `"img.{jpg,png}"`).
	 * Supports nested expansion and numeric sequences.
	 * @param input - The raw string.
	 * @returns An array of strings with all permutations expanded.
	 */
	public static expandBraces(input: string): string[] {
		if (input.startsWith("'") || input.startsWith("\""))
			return [input];

		const braceMatch = input.match(/\{([^{}]+)\}/);
		if (!braceMatch)
			return [input];

		const [fullMatch, innerContent] = braceMatch;
		const prefix = input.slice(0, braceMatch.index);
		const suffix = input.slice((braceMatch.index ?? 0) + fullMatch.length);
		
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

		return [input];
	}

	/**
	 * Parses flags and options out of a mutable args array, returning the collected options and
	 * input values. Flag args are removed from `commandArgs` in place as a side-effect.
	 * @param command - The command used to validate and look up option definitions.
	 * @param commandArgs - The mutable argument list to parse from. Modified in place.
	 * @returns An object containing the parsed option keys and any input values keyed by the option's short name.
	 */
	public static parseOptions(command: Command, commandArgs: string[]) {
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
					removeFromArray(flag, commandArgs);
				}
			}

			removeFromArray(flag, commandArgs);
		}

		return { options, inputs };
	}
}
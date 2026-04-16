import { ShellParser } from "./shellParser";

export interface BaseNode {
	type: string;
}

export interface BaseConditionNode extends BaseNode {
	condition: ExecutableNode;
}

/**
 * Represents a pairing of a condition and a code block.
 * Used for the primary IF branch and subsequent ELIF branches.
 */
export interface ConditionalBlockNode extends BaseConditionNode {
	type: typeof ShellParser.CONDITIONAL_BLOCK;
	thenBranch: Block;
}

/**
 * A sequence of strings and expansion nodes that form a single argument.
 */
export type Argument = (string | ExpansionNode)[];

export interface ParameterExpansionNode extends BaseNode {
	type: typeof ShellParser.PARAMETER_EXPANSION;
	/** The name of the variable (e.g., 'HOME' in ${HOME}). */
	name: string;
	/** The expansion operator (e.g., '-', '=', '+', '?'). */
	operator?: "-" | "=" | "+" | "?";
	/** The optional argument following the operator, which may contain further expansions. */
	argument?: Argument;
}

export interface ArithmeticExpansionNode extends BaseNode {
	type: typeof ShellParser.ARITHMETIC_EXPANSION;
	content: ArithmeticNode;
}

/**
 * Represents a node that gets replaced with the output of a block of code.
 */
export interface CommandSubstitutionNode extends BaseNode {
	type: typeof ShellParser.COMMAND_SUBSTITUTION;
	/** The node to execute for substitution. */
	content: Block;
}

export type ExpansionNode = ParameterExpansionNode | ArithmeticExpansionNode | CommandSubstitutionNode;

/**
 * Represents a basic shell command to be executed.
 */
export interface CommandNode extends BaseNode {
	type: typeof ShellParser.COMMAND;
	/** The individual arguments of the command, each potentially containing expansions. */
	args: Argument[];
}

/**
 * Represents logical execution flow (`&&` or `||`).
 */
export interface LogicalNode extends BaseNode {
	type: typeof ShellParser.LOGICAL;
	left: ExecutableNode;
	operator: "&&" | "||";
	right: ExecutableNode;
}

/**
 * Represents a sequence of commands where the output of one is piped to the next.
 */
export interface PipelineNode extends BaseNode {
	type: typeof ShellParser.PIPELINE;
	/**
	 * A list of executable nodes where the `stdout` of one 
	 * is connected to the `stdin` of the next.
	 */
	commands: ExecutableNode[];
}

/**
 * Represents a conditional branching structure.
 */
export interface IfNode extends BaseNode {
	type: typeof ShellParser.IF;
	/** The primary conditional branch. */
	ifBranch: ConditionalBlockNode;
	/** An array of additional conditional branches. */
	elifBranches: ConditionalBlockNode[];
	/** The block to execute if no conditions are met. */
	elseBranch: Block;
}

/**
 * Represents a node that repeatedly executes a block of code.
 */
export interface BaseLoopNode extends BaseNode {
	/** The block to execute for every iteration. */
	body: Block;
}

/**
 * Represents a `while` loop structure.
 */
export interface WhileNode extends BaseLoopNode, BaseConditionNode {
	type: typeof ShellParser.WHILE;
}

/**
 * Represents a `for` loop structure for iterating over a list of items.
 */
export interface ForInNode extends BaseLoopNode {
	type: typeof ShellParser.FOR_IN;
	/** The name of the environment variable assigned to the current item. */
	variableName: string;
	/** The list of raw strings or patterns to iterate over. */
	items: Argument[];
}

export interface ForExpressionNode extends BaseLoopNode {
	type: typeof ShellParser.FOR_EXPRESSION;
	setup: ArithmeticNode;
	condition: ArithmeticNode;
	step: ArithmeticNode;
}

/**
 * Represents an assignment of an environment variable.
 */
export interface AssignmentNode extends BaseNode {
	type: typeof ShellParser.ASSIGNMENT;
	/** The name of the environment variable to assign. */
	name: string;
	/** The value to assign to the variable, decomposed for expansion. */
	value: (string | ExpansionNode)[];
}

export interface ArithmeticNode extends BaseNode {
	type: typeof ShellParser.ARITHMETIC;
	/** The math expression. */
	expression: string;
}

/**
 * Represents a node that acts as an executable unit capable of 
 * handling standard input and output streams and returning an exit code.
 */
export type ExecutableNode =
	| CommandNode
	| LogicalNode
	| PipelineNode
	| IfNode
	| WhileNode
	| ForInNode
	| ForExpressionNode
	| AssignmentNode
	| ArithmeticNode;

/**
 * Represents a node in the shell's Abstract Syntax Tree (AST).
 */
export type Node =
	| ExecutableNode
	| ConditionalBlockNode
	| ExpansionNode;

/**
 * A sequence of AST nodes representing a block of code.
 */
export type Block = Node[];
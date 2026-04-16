import { ShellParser } from "./shellParser";

export interface BaseNode {
    type: string;
}

export interface ConditionNode extends BaseNode {
	condition: CommandNode | ArithmeticNode;
}

/**
 * Represents a pairing of a condition and a code block.
 * Used for the primary IF branch and subsequent ELIF branches.
 */
export interface ConditionalBlockNode extends ConditionNode {
    type: typeof ShellParser.CONDITIONAL_BLOCK;
    thenBranch: Block;
}

/**
 * Represents a basic shell command to be executed.
 */
export interface CommandNode extends BaseNode {
    type: typeof ShellParser.COMMAND;
    /** The raw command string including its arguments. */
    command: string;
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

export interface LoopNode extends BaseNode {
    /** The block to execute for every iteration. */
    body: Block;
}

/**
 * Represents a `while` loop structure.
 */
export interface WhileNode extends LoopNode, ConditionNode {
    type: typeof ShellParser.WHILE;
}

/**
 * Represents a `for` loop structure for iterating over a list of items.
 */
export interface ForInNode extends LoopNode {
    type: typeof ShellParser.FOR_IN;
    /** The name of the environment variable assigned to the current item. */
    variableName: string;
    /** The list of raw strings or patterns to iterate over. */
    items: string[];
}

export interface ForExpressionNode extends LoopNode {
    type: typeof ShellParser.FOR_EXPRESSION;
    setup: ArithmeticNode;
    condition: ArithmeticNode;
    step: ArithmeticNode;
}

/**
 * Represents an assigment of an environment variable.
 */
export interface AssignmentNode extends BaseNode {
    type: typeof ShellParser.ASSIGNMENT;
    /** The name of the environment variable to assign. */
    name: string;
    /** The value to assign to the variable. */
    value: string;
}

export interface ArithmeticNode extends BaseNode {
    type: typeof ShellParser.ARITHMETIC;
    /** The math expression. */
    expression: string;
}

/**
 * Represents a node in the shell's Abstract Syntax Tree (AST).
 */
export type Node =
    | CommandNode
    | IfNode
    | WhileNode
    | ForInNode
    | ForExpressionNode
    | AssignmentNode
    | ArithmeticNode
    | ConditionalBlockNode;

/**
 * A sequence of AST nodes representing a block of code.
 */
export type Block = Node[];
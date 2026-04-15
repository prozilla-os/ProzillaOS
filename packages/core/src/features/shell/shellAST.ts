import { ShellParser } from "./shellParser";

/**
 * Represents a basic shell command to be executed.
 */
export interface CommandNode {
	type: typeof ShellParser.COMMAND;
	/** The raw command string including its arguments. */
	command: string;
}

/**
 * Represents a conditional branching structure.
 */
export interface IfNode {
	type: typeof ShellParser.IF;
	/** The shell command or expression used as the truth condition. */
	condition: string;
	/** The block to execute if the primary condition is met. */
	thenBranch: Block;
	/** An array of additional conditional branches. */
	elifBranches: {
		/** The condition for this branch. */
		condition: string;
		/** The block to execute if this elif condition is met. */
		thenBranch: Block;
	}[];
	/** The block to execute if no conditions are met. */
	elseBranch: Block;
}

/**
 * Represents a 'while' loop structure.
 */
export interface WhileNode {
	type: typeof ShellParser.WHILE;
	/** The condition checked before each iteration. */
	condition: string;
	/** The nodes to be executed repeatedly while the condition remains successful. */
	body: Block;
}

/**
 * Represents a 'for' loop structure for iterating over a list of items.
 */
export interface ForNode {
	type: typeof ShellParser.FOR;
	/** The name of the environment variable assigned to the current item. */
	variableName: string;
	/** The list of raw strings or patterns to iterate over. */
	items: string[];
	/** The block to execute for every item in the list. */
	body: Block;
}

/**
 * Represents an assigment of an environment variable.
 */
export interface AssignmentNode {
	type: typeof ShellParser.ASSIGNMENT;
	/** The name of the environment variable to assign. */
	name: string;
	/** The value to assign to the variable. */
	value: string;
}

/**
 * Represents a node in the shell's Abstract Syntax Tree (AST).
 */
export type Node = CommandNode | IfNode | WhileNode | ForNode | AssignmentNode;

/**
 * A sequence of AST nodes representing a block of code.
 */
export type Block = Node[];
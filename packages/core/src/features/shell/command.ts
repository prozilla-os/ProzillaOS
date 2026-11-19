import { ShellContext } from "./shell";

/**
 * Represents a command-line flag or parameter.
 */
export interface Option {
	/** The full name of the option (e.g., `"all"` for `--all`). */
	long?: string;
	/** The single-character alias (e.g., `"a"` for `-a`). */
	short?: string;
	/** If true, the shell expects a value to follow this option (e.g., `--file <name>`). */
	isInput: boolean;
}

/**
 * Documentation metadata used by the `help` or `man` commands.
 */
export interface Manual {
	/** A brief one-line summary of what the command does. */
	purpose?: string;
	/** A string representing the syntax (e.g., `"ls [OPTION]... [FILE]..."`). */
	usage?: string;
	/** A detailed explanation of the command's behavior. */
	description?: string;
	/** A mapping of option names to their descriptions for the help output. */
	options?: Record<string, string>;
}

export type CommandOutput = number | undefined | void;
export type Execute = (args: string[], context: ShellContext) => Promise<CommandOutput> | CommandOutput;

/**
 * Defines a shell command, including its execution logic, arguments requirements, and manual page.
 */
export class Command {
	#name?: string;
	#aliases: string[] = [];
	options: Option[] = [];
	manual?: Manual;
	requireArgs?: boolean;
	requireOptions?: boolean;

	/**
	 * The core logic to run when the command is invoked.
	 */
	execute: Execute = () => {};

	/**
	 * Sets the command name and initializes the default usage string if not already set.
	 */
	setName(name?: string): this {
		this.#name = name;

		if (name && !this.manual?.usage) {
			if (!this.manual) this.manual = {};
			this.manual.usage = name;
		}

		return this;
	}

	matches(name: string) {
		return this.name === name || this.aliases.includes(name);
	}

	get name(): string {
		return this.#name ?? "";
	}

	get aliases(): string[] {
		return this.#aliases;
	}

	setExecute(execute: Execute): this {
		this.execute = execute;
		return this;
	}

	setRequireArgs(value: boolean): this {
		this.requireArgs = value;
		return this;
	}

	setRequireOptions(value: boolean): this {
		this.requireOptions = value;
		return this;
	}

	setManual({ purpose, usage, description, options }: Manual): this {
		this.manual = { purpose, usage, description, options };
		return this;
	}

	/**
	 * Registers a new option/flag for this command.
	 */
	addOption({ short, long, isInput = false }: Omit<Option, "isInput"> & Partial<Pick<Option, "isInput">>): this {
		this.options.push({ short, long, isInput });
		return this;
	}

	/**
	 * Retrieves an option definition by either its short or long name.
	 */
	getOption(key: string): Option | undefined {
		return this.options.find((option) => option.short === key || option.long === key);
	}

	addAlias(alias: string): this {
		this.#aliases.push(alias);
		return this;
	}
}
import { ShellContext } from "./shell";

export interface Option {
	long: string;
	short: string;
	isInput: boolean;
}

export interface Manual {
	purpose?: string;
	usage?: string;
	description?: string;
	options?: object;
}

export type CommandOutput = number | undefined | void;
export type Execute = (args: string[], context: ShellContext) => Promise<CommandOutput> | CommandOutput;

export class Command {
	#name?: string;
	options: Option[] = [];
	manual?: Manual;
	requireArgs?: boolean;
	requireOptions?: boolean;

	execute: Execute = () => {};

	setName(name?: string): Command {
		this.#name = name;

		if (name && !this.manual?.usage) {
			if (!this.manual) this.manual = {};
			this.manual.usage = name;
		}

		return this;
	}

	get name(): string {
		return this.#name ?? "";
	}

	setExecute(execute: Execute): Command {
		this.execute = execute;
		return this;
	}

	setRequireArgs(value: boolean): Command {
		this.requireArgs = value;
		return this;
	}

	setRequireOptions(value: boolean): Command {
		this.requireOptions = value;
		return this;
	}

	setManual({ purpose, usage, description, options }: Manual): Command {
		this.manual = { purpose, usage, description, options };
		return this;
	}

	addOption({ short, long, isInput = false }: Omit<Option, "isInput"> & { isInput?: boolean }): Command {
		this.options.push({ short, long, isInput });
		return this;
	}

	getOption(key: string): Option | undefined {
		return this.options.find((option) => option.short === key || option.long === key);
	}
}
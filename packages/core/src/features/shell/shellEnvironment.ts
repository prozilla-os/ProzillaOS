import { proxy } from "valtio";
import { ShellAST } from ".";

/**
 * Manages environment variabels for {@link Shell}.
 */
export class ShellEnvironment {
	store: Record<string, string> = {};
	parent: ShellEnvironment | null = null;
	exportedKeys: Set<string> = new Set();

	static readonly USER = "USER";
	static readonly HOSTNAME = "HOSTNAME";
	static readonly WORKING_DIRECTORY = "PWD";
	static readonly PREVIOUS_WORKING_DIRECTORY = "OLDPWD";
	static readonly HOME = "HOME";
	static readonly PROMPT = "PS1";

	static readonly EXIT_CODE = "?";
	static readonly ARGUMENT_COUNT = "#";
	static readonly PROCESS_ID = "$";

	/** List of variables that should never be exported. */
	static readonly INTERNAL_VARS = [
		ShellEnvironment.EXIT_CODE,
		ShellEnvironment.ARGUMENT_COUNT,
		ShellEnvironment.PROCESS_ID,
		"!",
		"*",
		"@",
	];

	constructor(initialVars: Record<string, string> = {}, parent: ShellEnvironment | null = null) {
		this.store = proxy({
			[ShellEnvironment.EXIT_CODE]: "0",
			[ShellEnvironment.PROCESS_ID]: Math.floor(Math.random() * 100000).toString(),
			...initialVars,
		});
		this.parent = parent;
		
		Object.keys(this.store).forEach((key) => {
			if (!ShellEnvironment.INTERNAL_VARS.includes(key)) {
				this.exportedKeys.add(key);
			}
		});
	}

	get(key: string): string | undefined {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (this.store[key] !== undefined)
			return this.store[key];
		return this.parent?.get(key);
	}

	set(key: string, value: string, isExported: boolean = false) {
		this.store[key] = value;
		if (isExported && !ShellEnvironment.INTERNAL_VARS.includes(key))
			this.exportedKeys.add(key);
	}

	/**
	 * Marks an existing variable as exported.
	 */
	export(key: string) {
		if (!ShellEnvironment.INTERNAL_VARS.includes(key))
			this.exportedKeys.add(key);
	}

	/**
	 * Replaces variable placeholders in a string with their corresponding values based on a pre-parsed node.
	 * The expandedArgument must be pre-resolved by the interpreter to handle nested expansions.
	 */
	public expand(node: ShellAST.ParameterExpansionNode, expandedArgument = ""): string {
		const name = node.name;
		const operator = node.operator;

		const currentValue = this.get(name);
		const isUnsetOrNull = currentValue === undefined || currentValue === "";

		if (!operator) return currentValue ?? "";

		switch (operator) {
			case "-":
				if (isUnsetOrNull) return expandedArgument;
				return currentValue;
			case "=":
				if (isUnsetOrNull) {
					this.set(name, expandedArgument);
					return expandedArgument;
				}
				return currentValue;
			case "+":
				if (isUnsetOrNull) return "";
				return expandedArgument;
			case "?":
				if (isUnsetOrNull) {
					const message = expandedArgument || "parameter null or not set";
					throw new Error(`${name}: ${message}`);
				}
				return currentValue;
			default:
				return this.get(name) ?? "";
		}
	}

	/**
	 * Parses an assignment string (e.g., KEY=VALUE) and updates the environment.
	 * @returns `true` if the string was a valid assignment.
	 */
	parseAssignment(input: string) {
		const match = input.match(/^([a-zA-Z_][a-zA-Z0-9_]*)=(.*)$/);
		if (match) {
			const key = match[1];
			const value = match[2].replace(/^["']|["']$/g, "");
			this.set(key, value, true);
			return true;
		}
		return false;
	}

	/**
	 * Returns only variables that are marked for export.
	 */
	get exportedVariables(): Record<string, string> {
		const parentVariables = this.parent?.exportedVariables ?? {};
		const currentExported: Record<string, string> = {};
		
		this.exportedKeys.forEach((key) => {
			currentExported[key] = this.store[key];
		});

		return { ...parentVariables, ...currentExported };
	}

	/**
	 * Returns all variables visible to this scope (including internal).
	 */
	get variables(): Record<string, string> {
		return { ...this.parent?.variables, ...this.store };
	}

	/**
	 * Creates a child scope for subshells or command execution.
	 */
	fork() {
		return new ShellEnvironment({}, this);
	}
}
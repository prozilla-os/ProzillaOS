/**
 * Manages environment variabels for {@link Shell}.
 */
export class ShellEnvironment {
	variables: Record<string, string> = {};
	parent: ShellEnvironment | null = null;
	exportedKeys: Set<string> = new Set();

	/** List of variables that should never be exported. */
	static readonly INTERNAL_VARS = ["?", "#", "$", "!", "*", "@"];

	constructor(initialVars: Record<string, string> = {}, parent: ShellEnvironment | null = null) {
		this.variables = {
			"?": "0",
			"$": Math.floor(Math.random() * 100000).toString(),
			...initialVars,
		};
		this.parent = parent;
		
		Object.keys(this.variables).forEach((key) => {
			if (!ShellEnvironment.INTERNAL_VARS.includes(key)) {
				this.exportedKeys.add(key);
			}
		});
	}

	get(key: string): string | undefined {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (this.variables[key] !== undefined)
			return this.variables[key];
		return this.parent?.get(key);
	}

	set(key: string, value: string, isExported: boolean = false) {
		this.variables[key] = value;
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
	 * Replaces variable placeholders in a string with their corresponding values.
	 */
	expand(input: string) {
		const variables = this.allVariables;
		return input.replace(/\$(?:\{([a-zA-Z_][a-zA-Z0-9_]*)\}|([a-zA-Z_][a-zA-Z0-9_]*|[?$#!*]))/g, (_match, braced?: string, plain?: string) => {
			const key = braced || plain;
			if (!key) return "";
			return variables[key] ?? "";
		});
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
			currentExported[key] = this.variables[key];
		});

		return { ...parentVariables, ...currentExported };
	}

	/**
	 * Returns all variables visible to this scope (including internal).
	 */
	get allVariables(): Record<string, string> {
		return { ...this.parent?.allVariables, ...this.variables };
	}

	/**
	 * Creates a child scope for subshells or command execution.
	 */
	fork() {
		return new ShellEnvironment({}, this);
	}
}
import { VirtualFile, VirtualFolder } from "../virtual-drive";
import { Command } from "./command";
import { ShellEnvironment } from "./shellEnvironment";

const modules = import.meta.glob("./commands/*.ts");

/**
 * An executable command or file.
 */
export type Executable = Command | VirtualFile;

/**
 * Represent the result of the resolution of an executable.
 */
export type ExecutableResolutionResult =
	| { executable: Executable }
	| { executable: null, error: typeof ExecutableResolver.NOT_FOUND_ERROR | typeof ExecutableResolver.IS_DIRECTORY_ERROR };

export class ExecutableResolver {
	static builtins: Command[] = [];
	private static loadingTask: Promise<void> | null = null;

	static readonly NOT_FOUND_ERROR = "Command not found";
	static readonly IS_DIRECTORY_ERROR = "Is a directory";

	/**
	 * Finds the executable with the given name.
	 * @param name - The name of the executable.
	 * @param env - The environment to read the path variable from.
	 * @param workingDirectory - The directory to search in.
	 */
	public static async resolve(name: string, env: ShellEnvironment, workingDirectory: VirtualFolder): Promise<ExecutableResolutionResult> {
		if (this.loadingTask)
			await this.loadingTask;

		if (name.includes("/"))
			return this.resolvePath(name, workingDirectory);

		const builtin = this.getBuiltin(name);
		return builtin ? { executable: builtin } : this.resolveFromPathVariable(name, env, workingDirectory);
	}

	private static resolvePath(path: string, workingDirectory: VirtualFolder): ExecutableResolutionResult {
		const target = workingDirectory.navigate(path);
		if (!target)
			return { executable: null, error: this.NOT_FOUND_ERROR };
		if (!target.isFile())
			return { executable: null, error: this.IS_DIRECTORY_ERROR };
		return { executable: target };
	}

	private static resolveFromPathVariable(name: string, env: ShellEnvironment, workingDirectory: VirtualFolder): ExecutableResolutionResult {
		const pathString = env.get("PATH");
		if (!pathString)
			return { executable: null, error: this.NOT_FOUND_ERROR };

		const directories = pathString.split(":");
		for (const dir of directories) {
			const fullPath = `${dir}/${name}`;

			const result = this.resolvePath(fullPath, workingDirectory);
			if (result.executable)
				return result;
		}

		return { executable: null, error: this.NOT_FOUND_ERROR };
	}

	/**
	 * Finds the builtin command with the given name.
	 * @param name - The name of the builtin.
	 * @returns The builtin with the given name, or `null` if there is none.
	 */
	public static getBuiltin(name: string): Command | null {
		return this.builtins.find((command) => command.name === name) ?? null;
	}

	/**
	 * Loads all builtins.
	 * @returns A promise that resolves when all builtins have finished loading.
	 */
	public static async loadBuiltins() {
		this.builtins = [];

		const promises = Object.entries(modules).map(async ([_path, loadModule]) => {
			const commandModule = await loadModule();
			const commandName = Object.keys(commandModule as Record<string, Command>)[0];
			const command = (commandModule as Record<string, Command>)[commandName];

			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (command !== undefined) {
				if (!command.name)
					command.setName(commandName.toLowerCase());

				this.builtins.push(command);
			}
		});

		this.loadingTask = Promise.all(promises).then(() => {
			this.loadingTask = null;
		});

		return this.loadingTask;
	}
}

void ExecutableResolver.loadBuiltins();
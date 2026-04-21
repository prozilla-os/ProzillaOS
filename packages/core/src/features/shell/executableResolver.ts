import { Result } from "@prozilla-os/shared";
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
export type ExecutableResolutionResult = Result<Executable, string>;

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

		return Result.nonNullOrElse(
			this.getBuiltin(name),
			() => this.resolveFromPathVariable(name, env, workingDirectory)
		);
	}

	/**
	 * Resolves a specific path to a {@link VirtualFile}.
	 * @param path - The path to navigate to.
	 * @param workingDirectory - The directory to start the navigation from.
	 * @returns The resolved file or a failure if this is a directory or does not exist.
	 */
	private static resolvePath(path: string, workingDirectory: VirtualFolder): ExecutableResolutionResult {
		return Result.nonNullOr(workingDirectory.navigate(path), this.NOT_FOUND_ERROR)
			.filter((target) => target.isFile(), () => this.IS_DIRECTORY_ERROR);
	}

	/**
	 * Attempts to resolve an executable by searching through the directories defined in the PATH variable.
	 * @param name - The name of the executable.
	 * @param env - The environment containing the PATH variable.
	 * @param workingDirectory - The directory to use for path resolution.
	 * @returns The first matching executable found in the PATH.
	 */
	private static resolveFromPathVariable(name: string, env: ShellEnvironment, workingDirectory: VirtualFolder): ExecutableResolutionResult {
		return Result.nonNullOr(env.get("PATH"), this.NOT_FOUND_ERROR)
			.next((pathString) => Result.any(
				pathString.split(":"),
				(directory) => this.resolvePath(`${directory}/${name}`, workingDirectory),
				Result.error(this.NOT_FOUND_ERROR)
			));
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
			const commandEntries = commandModule as Record<string, Command>;
			const commandName = Object.keys(commandEntries)[0];
			const command = commandEntries[commandName];

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
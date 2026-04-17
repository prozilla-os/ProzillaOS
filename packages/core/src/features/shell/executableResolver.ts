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

	static readonly NOT_FOUND_ERROR = "Command not found";
	static readonly IS_DIRECTORY_ERROR = "Is a directory";

	public static resolve(name: string, env: ShellEnvironment, workingDirectory: VirtualFolder): ExecutableResolutionResult {
		if (name.includes("/")) {
			return this.resolvePath(name, workingDirectory);
		}

		const builtin = this.getBuiltin(name);
		return builtin ? { executable: builtin } : this.resolveFromPathVariable(name, env, workingDirectory);
	}

	private static resolvePath(path: string, workingDirectory: VirtualFolder): ExecutableResolutionResult {
		console.log(workingDirectory.path, path);
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

	public static getBuiltin(name: string): Command | null {
		return this.builtins.find((command) => command.name === name) ?? null;
	}

	public static loadBuiltins() {
		this.builtins = [];

		for (const path in modules) {
			void modules[path]().then((commandModule) => {
				const commandName = Object.keys(commandModule as Record<string, Command>)[0];

				const command = (commandModule as Record<string, Command>)[commandName];
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				if (command == null)
					return;

				if (!command.name)
					command.setName(commandName.toLowerCase());

				this.builtins.push(command);
			});
		}
	}
}

ExecutableResolver.loadBuiltins();
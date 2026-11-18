import { Command } from "../command";
import { Shell } from "../shell";

export const posh = new Command()
	.setManual({
		purpose: "ProzillaOS shell",
		usage: "posh [options] [command_string | file]",
		description: "Posh is a bash-like command interpreter that executes commands read from a string or from a file.",
		options: {
			"-c": "Execute the first argument as a command",
		},
	})
	.addAlias("sh")
	.addAlias("bash")
	.addOption({
		short: "c",
	})
	.setRequireArgs(true)
	.setExecute(async function(this: Command, args, { stdout, stderr, workingDirectory, shell, options }) {
		if (options.includes("c")) {
			const command = args[0];

			if (!command)
				return Shell.writeError(stderr, this.name, "-c: Option requires an argument");

			return await shell.interpreter.execute(command, { stdout, stderr });
		} else {
			const path = args[0];
			const file = workingDirectory.navigateToFile(path);

			if (!file)
				return Shell.writeError(stderr, this.name, Shell.INVALID_PATH_ERROR);

			return await shell.interpreter.execute(file, { stdout, stderr });
		}
	});
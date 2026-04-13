import { Command } from "../command";
import { Shell } from "../shell";

export const sh = new Command()
	.setManual({
		purpose: "Execute a shell script",
	})
	.setRequireArgs(true)
	.setExecute(async function(this: Command, args, { stderr, workingDirectory, shell }) {
		const path = args[0];
		const file = workingDirectory.navigateToFile(path);

		if (!file) {
			Shell.writeError(stderr, this.name, Shell.INVALID_PATH_ERROR);
			return;
		}

		return await shell.interpreter.executeScript(file);
	});
import { Shell } from "../shell";
import { Command } from "../command";

export const cd = new Command()
	.setManual({
		purpose: "Change the current directory",
		usage: "cd [PATH]",
		description: "Change working directory to given path (the home directory by default).",
	})
	.setExecute(function(this: Command, args, { workingDirectory, shell, stderr }) {
		const path = args[0] ?? "~";
		let destination = workingDirectory.navigate(path);
	
		if (!destination)
			return Shell.writeError(stderr, this.name, `${path}: No such file or directory`);

		if (destination.isFile()) {
			if (destination.parent == null) {
				return Shell.writeError(stderr, this.name, `${path}: Invalid path`);
			} else {
				destination = destination.parent;
			}
		}
	
		shell.setWorkingDirectory(destination);
	});
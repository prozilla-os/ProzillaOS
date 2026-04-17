import { Command } from "../command";
import { Shell } from "../shell";

export const pwd = new Command()
	.setManual({
		purpose: "Display path of the current directory",
	})
	.setExecute(function(_arguments, { workingDirectory: currentDirectory, stdout }) {
		let path = currentDirectory.absolutePath;

		if (currentDirectory.root) {
			path = "/";
		}

		Shell.printLn(stdout, path);
	});
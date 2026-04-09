import { Command } from "../command";

export const pwd = new Command()
	.setManual({
		purpose: "Display path of the current directory",
	})
	.setExecute(function(_arguments, { currentDirectory, stdout }) {
		let path = currentDirectory.absolutePath;

		if (currentDirectory.root) {
			path = "/";
		}

		stdout.write(path + "\n");
	});
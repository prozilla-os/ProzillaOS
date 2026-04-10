import { Command } from "../command";

export const mkdir = new Command()
	.setManual({
		purpose: "Create a directory",
	})
	.setRequireArgs(true)
	.setExecute(function(args, { workingDirectory }) {
		const name = args[0];
	
		if (workingDirectory.findSubFolder(name))
			return;
	
		workingDirectory.createFolder(name);
		return;
	});
import Command from "../command";

export const mkdir = new Command()
	.setManual({
		purpose: "Create a directory"
	})
	.setRequireArgs(true)
	.setExecute(function(args, { currentDirectory }) {
		const name = args[0];
	
		if (currentDirectory.findSubFolder(name))
			return { blank: true };
	
		currentDirectory.createFolder(name);
		return { blank: true };
	});
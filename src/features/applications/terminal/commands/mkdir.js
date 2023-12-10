import Command from "../command.js";

export const mkdir = new Command("mkdir", (args, { currentDirectory }) => {
	const name = args[0];

	if (currentDirectory.findSubFolder(name))
		return { blank: true };

	currentDirectory.createFolder(name);
	return { blank: true };
}).setRequireArgs(true);
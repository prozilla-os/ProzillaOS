import Command from "../command.js";

export const rm = new Command("rm", (args, { currentDirectory }) => {
	const [name, extension] = args[0].split(".");
	const file = currentDirectory.findFile(name, extension);

	if (!file)
		return `rm: ${args[0]}: No such file`;
	
	file.delete();
	return { blank: true };
}).setRequireArgs(true);
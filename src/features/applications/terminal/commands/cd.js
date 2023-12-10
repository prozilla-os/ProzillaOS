import Command from "../command.js";

export const cd = new Command("cd", (args, { currentDirectory, setCurrentDirectory }) => {
	const path = args[0] ?? "~";
	const destination = currentDirectory.navigate(path);

	if (!destination)
		return `cd: ${args[0]}: No such file or directory`;

	console.log(destination);
	setCurrentDirectory(destination);
	return { blank: true };
}).setRequireArgs(true);
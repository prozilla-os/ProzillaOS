import Command from "../command.js";

export const cd = new Command("cd")
	.setRequireArgs(true)
	.setManual({
		purpose: "Change the current directory",
		usage: "cd path",
		description: "Change working directory to given path (the home directory by default)."
	})
	.setExecute(function(args, { currentDirectory, setCurrentDirectory }) {
		const path = args[0] ?? "~";
		const destination = currentDirectory.navigate(path);
	
		if (!destination)
			return `${this.name}: ${args[0]}: No such file or directory`;
	
		console.log(destination);
		setCurrentDirectory(destination);
		return { blank: true };
	});
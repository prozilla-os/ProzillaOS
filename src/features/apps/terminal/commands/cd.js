import Command from "../command.js";
import CommandsManager from "../commands.js";

export const cd = new Command()
	.setManual({
		purpose: "Change the current directory",
		usage: "cd [PATH]",
		description: "Change working directory to given path (the home directory by default)."
	})
	.setExecute(function(args, { currentDirectory, setCurrentDirectory }) {
		const path = args[0] ?? "~";
		const destination = currentDirectory.navigate(path);
	
		if (!destination)
			return CommandsManager.formatError(this.name, `${args[0]}: No such file or directory`);
	
		setCurrentDirectory(destination);
		return { blank: true };
	});
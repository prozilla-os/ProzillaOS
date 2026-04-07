import { VirtualFile, VirtualFolder } from "../../virtual-drive";
import { formatError } from "../_utils/shell.utils";
import { Command } from "../command";

export const cd = new Command()
	.setManual({
		purpose: "Change the current directory",
		usage: "cd [PATH]",
		description: "Change working directory to given path (the home directory by default).",
	})
	.setExecute(function(this: Command, args, { currentDirectory, setCurrentDirectory }) {
		const path = args[0] ?? "~";
		let destination = currentDirectory.navigate(path);
	
		if (!destination)
			return formatError(this.name, `${(args)[0]}: No such file or directory`);

		if (destination instanceof VirtualFile)
			destination = destination.parent as VirtualFolder;
	
		setCurrentDirectory?.(destination);
		return { blank: true };
	});
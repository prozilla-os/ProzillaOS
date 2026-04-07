import { formatError } from "../_utils/shell.utils";
import { Command } from "../command";

export const rmdir = new Command()
	.setRequireArgs(true)
	.setManual({
		purpose: "Remove a directory",
	})
	.setExecute(function(this: Command, args, { currentDirectory }) {
		const folderName = args[0];
		const folder = currentDirectory.findSubFolder(folderName);
	
		if (!folder)
			return formatError(this.name, `${folderName}: No such directory`);
		
		folder.delete();
		return { blank: true };
	});
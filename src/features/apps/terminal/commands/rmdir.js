import { formatError } from "../_utils/terminal.utils.js";
import Command from "../command";

export const rmdir = new Command()
	.setRequireArgs(true)
	.setManual({
		purpose: "Remove a directory"
	})
	.setExecute(function(args, { currentDirectory }) {
		const name = args[0];
		const folder = currentDirectory.findSubFolder(name);
	
		if (!folder)
			return formatError(this.name, `${args[0]}: No such directory`);
		
		folder.delete();
		return { blank: true };
	});
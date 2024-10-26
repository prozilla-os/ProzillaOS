import { formatError } from "../_utils/terminal.utils";
import { Command, ExecuteParams } from "../command";

export const rmdir = new Command()
	.setRequireArgs(true)
	.setManual({
		purpose: "Remove a directory",
	})
	.setExecute(function(this: Command, args, params) {
		const { currentDirectory } = params as ExecuteParams;
		const folderName = (args as string[])[0];
		const folder = currentDirectory.findSubFolder(folderName);
	
		if (!folder)
			return formatError(this.name, `${folderName}: No such directory`);
		
		folder.delete();
		return { blank: true };
	});
import Command from "../command.js";
import CommandsManager from "../commands.js";

export const rmdir = new Command()
	.setRequireArgs(true)
	.setManual({
		purpose: "Remove a directory"
	})
	.setExecute(function(args, { currentDirectory }) {
		const name = args[0];
		const folder = currentDirectory.findSubFolder(name);
	
		if (!folder)
			return CommandsManager.formatError(this.name, `${args[0]}: No such directory`);
		
		folder.delete();
		return { blank: true };
	});
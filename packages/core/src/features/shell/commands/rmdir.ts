import { Shell } from "../shell";
import { Command } from "../command";

export const rmdir = new Command()
	.setRequireArgs(true)
	.setManual({
		purpose: "Remove a directory",
	})
	.setExecute(function(this: Command, args, { workingDirectory, stderr }) {
		const folderName = args[0];
		
		const folder = workingDirectory.findSubFolder(folderName);
		if (!folder)
			return Shell.writeError(stderr, this.name, `${folderName}: No such directory`);
		
		folder.delete();
	});
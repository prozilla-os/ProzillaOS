import { VirtualFolder } from "@prozilla-os/core";
import { formatError } from "../_utils/terminal.utils";
import { Command } from "../command";
import { ANSI } from "@prozilla-os/shared";

export const ls = new Command()
	.setManual({
		purpose: "List directory contents",
		usage: "ls [options] [files]",
		description: "List information about directories or files (the current directory by default).",
	})
	.setExecute(function(this: Command, args, { currentDirectory }) {
		let directory = currentDirectory;
	
		if (args != null && args.length > 0) {
			directory = currentDirectory.navigate((args)[0]) as VirtualFolder;
		}
	
		if (!directory)
			return formatError(this.name, `Cannot access '${(args)[0]}': No such file or directory`);
	
		const folderNames = directory.subFolders.map((folder) => `${ANSI.fg.blue}${folder.id}${ANSI.reset}`);
		const fileNames = directory.files.map((file) => file.id);
	
		const contents = folderNames.concat(fileNames);
	
		if (contents.length === 0)
			return { blank: true };
	
		return contents.sort().join("  ");
	});
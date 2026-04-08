import { VirtualFolder } from "../../virtual-drive";
import { formatError } from "../_utils/shell.utils";
import { Command } from "../command";
import { Ansi } from "@prozilla-os/shared";

export const ls = new Command()
	.setManual({
		purpose: "List directory contents",
		usage: "ls [options] [files]",
		description: "List information about directories or files (the current directory by default).",
	})
	.setExecute(function(this: Command, args, { currentDirectory }) {
		let directory: VirtualFolder | null = currentDirectory;
	
		if (args.length) {
			directory = currentDirectory.navigateToFolder(args[0]);
		}
	
		if (!directory)
			return formatError(this.name, `Cannot access '${args[0]}': No such file or directory`);
	
		const folderNames = directory.subFolders.map((folder) => Ansi.blue(folder.id));
		const fileNames = directory.files.map((file) => file.id);
	
		const contents = folderNames.concat(fileNames);
	
		if (contents.length === 0)
			return { blank: true };
	
		return contents.sort().join("  ");
	});
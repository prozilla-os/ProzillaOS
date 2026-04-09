import { VirtualFolder } from "../../virtual-drive";
import { Shell } from "../shell";
import { Command } from "../command";
import { ANSI } from "@prozilla-os/shared";

export const ls = new Command()
	.setManual({
		purpose: "List directory contents",
		usage: "ls [options] [files]",
		description: "List information about directories or files (the current directory by default).",
	})
	.setExecute(function(this: Command, args, { currentDirectory, stdout, stderr }) {
		let directory: VirtualFolder | null = currentDirectory;
	
		if (args.length) {
			directory = currentDirectory.navigateToFolder(args[0]);
		}
	
		if (!directory)
			return Shell.writeError(stderr, this.name, `Cannot access '${args[0]}': No such file or directory`);
	
		const folderNames = directory.subFolders.map((folder) => `${ANSI.fg.blue}${folder.id}${ANSI.reset}`);
		const fileNames = directory.files.map((file) => file.id);
	
		const contents = folderNames.concat(fileNames);
	
		if (contents.length > 0) {
			stdout.write(contents.sort().join("  ") + "\n");
		}
	});
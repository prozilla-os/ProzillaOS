import Command from "../command.js";

export const ls = new Command("ls")
	.setManual({
		purpose: "List directory contents",
		usage: "ls [OPTION]... [FILE]...",
		description: "List information about the FILEs (the current directory by default)."
	})
	.setExecute(function(args, { currentDirectory }) {
		let directory = currentDirectory;
	
		if (args.length > 0) {
			directory = currentDirectory.navigate(args[0]);
		}
	
		if (!directory)
			return `${this.name}: Cannot access '${args[0]}': No such file or directory`;
	
		const folderNames = directory.subFolders.map((folder) => folder.id);
		const fileNames = directory.files.map((file) => file.id);
	
		const contents = folderNames.concat(fileNames);
	
		if (contents.length === 0)
			return { blank: true };
	
		return contents.sort((nameA, nameB) => nameA.localeCompare(nameB)).join(" ");
	});
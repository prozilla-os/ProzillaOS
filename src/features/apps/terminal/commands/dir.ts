import { Command, ExecuteParams } from "../command";

export const dir = new Command()
	.setManual({
		purpose: "List all directories in the current directory"
	})
	.setExecute(function(args, params) {
		const { currentDirectory } = params as ExecuteParams;
		const folderNames = currentDirectory.subFolders.map((folder) => folder.id);
	
		if (folderNames.length === 0)
			return { blank: true };
	
		return folderNames.sort((nameA, nameB) => nameA.localeCompare(nameB)).join(" ");
	});
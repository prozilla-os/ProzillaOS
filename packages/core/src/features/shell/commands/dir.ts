import { Command } from "../command";
import { Shell } from "../shell";

export const dir = new Command()
	.setManual({
		purpose: "List all directories in the current directory",
	})
	.setExecute(function(_args, { workingDirectory, stdout }) {
		const folderNames = workingDirectory.subFolders.map((folder) => folder.id);
	
		if (folderNames.length === 0)
			return;
	
		Shell.printLn(stdout, folderNames.sort((nameA, nameB) => nameA.localeCompare(nameB)).join(" "));
	});
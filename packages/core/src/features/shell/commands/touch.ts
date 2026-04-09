import { VirtualFile } from "../../virtual-drive";
import { Command } from "../command";

export const touch = new Command()
	.setRequireArgs(true)
	.setManual({
		purpose: "Change file timestamps",
		usage: "touch [options] files",
		description: "Update the access and modification times of each FILE to the current time.\n\n"
            + "A file argument that does not exist is created empty.",
	})
	.setExecute(function(this: Command, args, { currentDirectory }) {
		const fileId = args[0];
		const { name, extension } = VirtualFile.splitId(fileId);
    
		if (currentDirectory.findFile(name, extension))
			return;
    
		currentDirectory.createFile(name, extension as string | undefined);
	});
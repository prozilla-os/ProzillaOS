import { VirtualFile } from "../../../virtual-drive/file";
import { formatError } from "../_utils/terminal.utils";
import { Command, ExecuteParams } from "../command";

export const touch = new Command()
	.setRequireArgs(true)
	.setManual({
		purpose: "Change file timestamps",
		usage: "touch [options] files",
		description: "Update the access and modification times of each FILE to the current time.\n\n"
			+ "A file argument that does not exist is created empty."
	})
	.setExecute(function(this: Command, args, params) {
		const { currentDirectory } = params as ExecuteParams;
		const fileId = (args as string[])[0];

		if (fileId === "girls\\" && (args as string[])[1] === "boo**")
			return formatError((this).name, "Cannot touch 'girls boo**': Permission denied");
	
		const { name, extension } = VirtualFile.splitId(fileId);
	
		if (currentDirectory.findFile(name, extension))
			return { blank: true };
	
		currentDirectory.createFile(name, extension as string | undefined);
		return { blank: true };
	});
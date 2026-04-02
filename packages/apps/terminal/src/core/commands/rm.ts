import { VirtualFile } from "@prozilla-os/core";
import { formatError } from "../_utils/terminal.utils";
import { Command } from "../command";

export const rm = new Command()
	.setRequireArgs(true)
	.setManual({
		purpose: "Remove a file",
	})
	.setExecute(function(this: Command, args, { currentDirectory }) {
		const fileId = args[0];
		const { name, extension } = VirtualFile.splitId(fileId);
		const file = currentDirectory.findFile(name, extension);
	
		if (!file)
			return formatError(this.name, `${fileId}: No such file`);
		
		file.delete();
		return { blank: true };
	});
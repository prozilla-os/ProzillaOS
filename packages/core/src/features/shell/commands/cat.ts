import { VirtualFile } from "../../virtual-drive";
import { formatError } from "../_utils/shell.utils";
import { Command } from "../command";

export const cat = new Command()
	.setRequireArgs(true)
	.setManual({
		purpose: "Concetenate files and display on the terminal screen",
		usage: "cat [options] [files]",
		description: "Concetenate files to standard output.",
	})
	.setExecute(function(this: Command, args, { currentDirectory, options }) {
		const fileId = args[0];
		const { name, extension } = VirtualFile.splitId(fileId);
		const file = currentDirectory.findFile(name, extension);

		if (!file)
			return formatError(this.name, `${fileId}: No such file`);

		if (file.content) {
			if (!options.includes("e")) {
				return file.content;
			} else {
				// Append "$" at the end of every line
				return file.content.split("\n").join("$\n") + "$";
			}
		} else if (file.source) {
			return `Src: ${file.source}`;
		} else {
			return { blank: true };
		}
	});
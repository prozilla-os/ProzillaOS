import { VirtualFile } from "../../../virtual-drive/file";
import { formatError } from "../_utils/terminal.utils";
import Command from "../command";

export const rm = new Command()
	.setRequireArgs(true)
	.setManual({
		purpose: "Remove a file"
	})
	.setExecute(function(args, { currentDirectory }) {
		const { name, extension } = VirtualFile.convertId(args[0]);
		const file = currentDirectory.findFile(name, extension);
	
		if (!file)
			return formatError((this as Command).name, `${args[0]}: No such file`);
		
		file.delete();
		return { blank: true };
	});
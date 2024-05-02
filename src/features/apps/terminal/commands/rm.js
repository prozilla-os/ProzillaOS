import { VirtualFile } from "../../../virtual-drive/file/virtualFile.js";
import Command from "../command.js";
import CommandsManager from "../commands.js";

export const rm = new Command()
	.setRequireArgs(true)
	.setManual({
		purpose: "Remove a file"
	})
	.setExecute(function(args, { currentDirectory }) {
		const { name, extension } = VirtualFile.convertId(args[0]);
		const file = currentDirectory.findFile(name, extension);
	
		if (!file)
			return CommandsManager.formatError(this.name, `${args[0]}: No such file`);
		
		file.delete();
		return { blank: true };
	});
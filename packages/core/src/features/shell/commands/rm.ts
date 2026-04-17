import { VirtualFile } from "../../virtual-drive";
import { Shell } from "../shell";
import { Command } from "../command";

export const rm = new Command()
	.setRequireArgs(true)
	.setManual({
		purpose: "Remove a file",
	})
	.setExecute(function(this: Command, args, { workingDirectory, stderr }) {
		const fileId = args[0];
		const { name, extension } = VirtualFile.splitId(fileId);
		
		const file = workingDirectory.findFile(name, extension);
		if (!file)
			return Shell.writeError(stderr, this.name, `${fileId}: No such file`);
		
		file.delete();
	});
import { formatError } from "../_utils/terminal.utils";
import { Command, ExecuteParams } from "../command";

export const cd = new Command()
	.setManual({
		purpose: "Change the current directory",
		usage: "cd [PATH]",
		description: "Change working directory to given path (the home directory by default)."
	})
	.setExecute(function(this: Command, args, params) {
		const { currentDirectory, setCurrentDirectory } = params as ExecuteParams;
		const path = (args as string[])[0] ?? "~";
		const destination = currentDirectory.navigate(path);
	
		if (!destination)
			return formatError(this.name, `${(args as string[])[0]}: No such file or directory`);
	
		setCurrentDirectory?.(destination);
		return { blank: true };
	});
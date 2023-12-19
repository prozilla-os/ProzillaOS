import Command from "../command.js";

export const rm = new Command("rm")
	.setRequireArgs(true)
	.setManual({
		purpose: "Remove a file"
	})
	.setExecute((args, { currentDirectory }) => {
		const [name, extension] = args[0].split(".");
		const file = currentDirectory.findFile(name, extension);
	
		if (!file)
			return `${this.name}: ${args[0]}: No such file`;
		
		file.delete();
		return { blank: true };
	});
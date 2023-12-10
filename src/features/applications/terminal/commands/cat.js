import Command from "../command.js";

export const cat = new Command("cat")
	.setRequireArgs(true)
	.setManual({
		purpose: "Concetenate files and print on the standard output",
		usage: "cat [OPTION]... [FILE]...",
		description: "Concetenate FILE(s) to standard output."
	})
	.setExecute((args, { currentDirectory }) => {
		const [name, extension] = args[0].split(".");
		const file = currentDirectory.findFile(name, extension);
	
		if (!file)
			return `rm: ${args[0]}: No such file`;
	
		if (file.content) {
			return file.content;
		} else if (file.source) {
			return `Src: ${file.source}`;
		} else {
			return { blank: true };
		}
	});
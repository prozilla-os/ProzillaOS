import Command from "../command.js";

export const cat = new Command("cat")
	.setRequireArgs(true)
	.setManual({
		purpose: "Concetenate files and display on the terminal screen",
		usage: "cat [OPTION]... [FILE]...",
		description: "Concetenate FILE(s) to standard output."
	})
	.setExecute(function(args, { currentDirectory, options }) {
		const [name, extension] = args[0].split(".");
		const file = currentDirectory.findFile(name, extension);

		if (!file)
			return `${this.name}: ${args[0]}: No such file`;

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
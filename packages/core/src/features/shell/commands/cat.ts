import { Command } from "../command";

export const cat = new Command()
	.setManual({
		purpose: "Concatenate files and display on the terminal screen",
		usage: "cat [OPTION]... [FILE]...",
		description: "Concatenate FILE(s) to standard output. With no FILE, or when FILE is -, read standard input.",
		options: {
			"-e": "Display $ at end of each line",
		},
	})
	.addOption({ short: "e", long: "show-ends", isInput: false })
	.setExecute(async function(this: Command, args, { workingDirectory, options, stdout, stderr, stdin, shell }) {
		const formatContent = (content: string) => {
			if (!options.includes("e"))
				return content;

			const lines = content.split("\n");
			const joined = lines.join("$\n");

			return content.endsWith("\n") ? joined : joined + "$";
		};

		return await shell.readFiles({
			paths: args,
			workingDirectory,
			stdin,
			stderr,
			commandName: this.name,
			onContent: async (content: string) => {
				await stdout.write(formatContent(content));
			},
			onStdinData: async (data: string) => {
				await stdout.write(options.includes("e") ? data.replace(/\n/g, "$\n") : data);
			},
		});
	});
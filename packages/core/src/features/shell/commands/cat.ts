import { EXIT_CODE } from "../../../constants";
import { VirtualFile } from "../../virtual-drive";
import { Command } from "../command";
import { Shell } from "../shell";
import { Stream } from "../stream";

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
	.setExecute(async function(this: Command, args, { workingDirectory, options, stdout, stderr, stdin }) {
		let exitCode: number = EXIT_CODE.success;

		// Helper to format and write content with options
		const writeContent = (content: string) => {
			let output = content;
			if (options.includes("e")) {
				output = output.split("\n").join("$\n") + "$";
			}
			stdout.write(output);
		};

		// Read from stdin
		if (args.length === 0) {
			stdin.on(Stream.DATA_EVENT, (data) => {
				writeContent(data);
			});
			return stdin.wait(EXIT_CODE.success);
		}

		// Iterate through file arguments
		for (const fileId of args) {
			if (fileId === "-") {
				const onData = (data: string) => writeContent(data);
				stdin.on(Stream.DATA_EVENT, onData);
    
				await stdin.wait();
    
				stdin.off(Stream.DATA_EVENT, onData);
				continue;
			}

			const { name, extension } = VirtualFile.splitId(fileId);
			const file = workingDirectory.findFile(name, extension);

			if (!file) {
				exitCode = Shell.writeError(stderr, this.name, `${fileId}: No such file or directory`);
				continue;
			}

			if (file.content) {
				writeContent(file.content);
			} else if (file.source) {
				stdout.write(`Src: ${file.source}`);
			}
		}

		return exitCode;
	});
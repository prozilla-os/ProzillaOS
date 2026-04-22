import { EXIT_CODE } from "../../../constants";
import { Command } from "../command";
import { Shell } from "../shell";
import { Stream } from "../streams/stream";

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
		const writeContent = async (content: string) => {
			let output = content;
			if (options.includes("e")) {
				output = output.split("\n").join("$\n") + "$";
			}
			await Shell.printLn(stdout, output);
		};

		// Read from stdin
		if (args.length === 0) {
			stdin.on(Stream.DATA_EVENT, (data) => {
				void writeContent(data);
			});
			return stdin.wait(EXIT_CODE.success);
		}

		// Iterate through file arguments
		for (const path of args) {
			if (path === "-") {
				const onData = (data: string) => void writeContent(data);
				stdin.on(Stream.DATA_EVENT, onData);
				await stdin.wait();
				stdin.off(Stream.DATA_EVENT, onData);
				continue;
			}

			const target = workingDirectory.navigate(path);

			if (!target) {
				exitCode = await Shell.writeError(stderr, this.name, `${path}: ${Shell.INVALID_PATH_ERROR}`);
				continue;
			}

			if (target.isFolder()) {
				exitCode = await Shell.writeError(stderr, this.name, `${path}: Is a directory`);
				continue;
			}

			const content = await target.read();
			if (content != null) {
				await writeContent(content);
			}
		}

		return exitCode;
	});
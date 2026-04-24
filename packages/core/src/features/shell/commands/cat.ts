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
	.setExecute(async function(this: Command, args, { workingDirectory, options, stdout, stderr, stdin, shell }) {
		let exitCode: number = EXIT_CODE.success;

		// Helper to format and write content based on provided options
		const writeContent = async (content: string, isLine = false) => {
			let output = content;
			if (options.includes("e")) {
				const lines = output.split("\n");
				output = lines.join("$\n");
				if (isLine && !output.endsWith("$"))
					output += "$";
			}

			if (isLine) {
				await stdout.write(output + "\n");
			} else {
				await Shell.printLn(stdout, output);
			}
		};

		const readFromStdin = async () => {
			shell.setRawMode(true);
			let buffer = "";

			const onData = (data: string) => {
				void stdout.write(data);

				if (data === "\n") {
					void writeContent(buffer, true);
					buffer = "";
				} else {
					buffer += data;
				}
			};

			stdin.on(Stream.DATA_EVENT, onData);
			await stdin.wait();
			stdin.off(Stream.DATA_EVENT, onData);
			shell.setRawMode(false);
		};

		if (!args.length) {
			await readFromStdin();
			return;
		}

		for (const path of args) {
			if (path === "-") {
				await readFromStdin();
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
			if (content != null)
				await writeContent(content);
		}

		return exitCode;
	});
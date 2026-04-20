import { EXIT_CODE } from "../../../constants";
import { Command } from "../command";
import { Shell } from "../shell";

export const head = new Command()
	.setManual({
		purpose: "Output the first part of files",
		usage: "head [OPTION]... [FILE]...",
		description: "Print the first 10 lines of each FILE to standard output. With no FILE, or when FILE is -, read standard input.",
		options: {
			"-n": "Print the first NUM lines instead of the first 10",
		},
	})
	.addOption({ short: "n", long: "lines", isInput: true })
	.setExecute(async function(this: Command, args, { workingDirectory, inputs, stdout, stderr, stdin }) {
		const count = inputs["n"] ? parseInt(inputs["n"]) : 10;

		if (isNaN(count))
			return Shell.writeError(stderr, this.name, `invalid number of lines: '${inputs["n"]}'`);

		const writeHead = (content: string) => {
			const lines = content.split("\n");
			const selected = count >= 0 ? lines.slice(0, count) : lines.slice(0, Math.max(lines.length + count, 0));
			Shell.printLn(stdout, selected.join("\n"));
		};

		if (args.length === 0) {
			return Shell.readInput("", stdin, (data) => {
				writeHead(data);
				return EXIT_CODE.success;
			});
		}

		let exitCode: number = EXIT_CODE.success;

		for (const path of args) {
			if (path === "-") {
				return Shell.readInput("", stdin, (data) => {
					writeHead(data);
					return EXIT_CODE.success;
				});
			}

			const target = workingDirectory.navigate(path);

			if (!target) {
				exitCode = Shell.writeError(stderr, this.name, `${path}: ${Shell.INVALID_PATH_ERROR}`);
				continue;
			}

			if (target.isFolder()) {
				exitCode = Shell.writeError(stderr, this.name, `${path}: Is a directory`);
				continue;
			}

			if (args.length > 1)
				Shell.printLn(stdout, `==> ${path} <==`);

			const content = await target.read();
			if (content != null)
				writeHead(content);
		}

		return exitCode;
	});

import { EXIT_CODE } from "../../../constants";
import { Command } from "../command";
import { Shell } from "../shell";
import { Stream } from "../stream";

export const tail = new Command()
	.setManual({
		purpose: "Output the last part of files",
		usage: "tail [OPTION]... [FILE]...",
		description: "Print the last 10 lines of each FILE to standard output. With no FILE, or when FILE is -, read standard input.",
		options: {
			"-n": "Print the last NUM lines instead of the last 10",
		},
	})
	.addOption({ short: "n", long: "lines", isInput: true })
	.setExecute(async function(this: Command, args, { workingDirectory, inputs, stdout, stderr, stdin }) {
		const count = inputs["n"] ? parseInt(inputs["n"]) : 10;

		if (isNaN(count))
			return Shell.writeError(stderr, this.name, `invalid number of lines: '${inputs["n"]}'`);

		const writeTail = (content: string) => {
			const lines = content.split("\n");
			Shell.printLn(stdout, lines.slice(-count).join("\n"));
		};

		if (args.length === 0) {
			return Shell.readInput("", stdin, (data) => {
				writeTail(data);
				return EXIT_CODE.success;
			});
		}

		let exitCode: number = EXIT_CODE.success;

		for (const path of args) {
			if (path === "-") {
				const onData = (data: string) => writeTail(data);
				stdin.on(Stream.DATA_EVENT, onData);
				await stdin.wait();
				stdin.off(Stream.DATA_EVENT, onData);
				continue;
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
				writeTail(content);
		}

		return exitCode;
	});

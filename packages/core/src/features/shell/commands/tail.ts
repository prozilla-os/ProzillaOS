import { parseOptionalInteger } from "@prozilla-os/shared";
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
			"-n NUM": "Print the last NUM lines instead of the last 10",
		},
	})
	.addOption({ short: "n", long: "lines", isInput: true })
	.setExecute(async function(this: Command, args, { workingDirectory, inputs, stdout, stderr, stdin }) {
		const count = parseOptionalInteger(inputs.n, 10);

		function writeTail(content: string) {
			const lines = content.split("\n");
			Shell.printLn(stdout, lines.slice(-count).join("\n"));
		}

		async function readStdin() {
			let buffer = "";
			stdin.on(Stream.DATA_EVENT, (data) => {
				buffer += data;
			});
			await stdin.wait();
			writeTail(buffer);
		}

		if (!args.length)
			return await readStdin();

		let exitCode: number = EXIT_CODE.success;

		for (const path of args) {
			if (path === "-") {
				await readStdin();
				continue;
			}

			const target = workingDirectory.navigate(path);

			if (!target) {
				exitCode = Shell.writeError(stderr, this.name, [path, Shell.INVALID_PATH_ERROR]);
				continue;
			}

			if (target.isFolder()) {
				exitCode = Shell.writeError(stderr, this.name, [path, "Is a directory"]);
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

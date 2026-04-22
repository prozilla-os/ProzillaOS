import { parseOptionalInteger } from "@prozilla-os/shared";
import { EXIT_CODE } from "../../../constants";
import { Command } from "../command";
import { Shell } from "../shell";
import { Stream } from "../streams/stream";

export const head = new Command()
	.setManual({
		purpose: "Output the first part of files",
		usage: "head [OPTION]... [FILE]...",
		description: "Print the first 10 lines of each FILE to standard output. With no FILE, or when FILE is -, read standard input.",
		options: {
			"-n NUM": "Print the first NUM lines instead of the first 10",
		},
	})
	.addOption({ short: "n", long: "lines", isInput: true })
	.setExecute(async function(this: Command, args, { workingDirectory, inputs, stdout, stderr, stdin }) {
		const count = parseOptionalInteger(inputs.n, 10);

		async function writeHead(content: string) {
			const lines = content.split("\n");
			const selected = count >= 0 ? lines.slice(0, count) : lines.slice(0, Math.max(lines.length + count, 0));
			await Shell.printLn(stdout, selected.join("\n"));
		}

		async function readStdin() {
			let buffer = "";
			stdin.on(Stream.DATA_EVENT, (data) => {
				buffer += data;
			});
			await stdin.wait();
			await writeHead(buffer);
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
				exitCode = await Shell.writeError(stderr, this.name, [path, Shell.INVALID_PATH_ERROR]);
				continue;
			}

			if (target.isFolder()) {
				exitCode = await Shell.writeError(stderr, this.name, [path, "Is a directory"]);
				continue;
			}

			if (args.length > 1)
				await Shell.printLn(stdout, `==> ${path} <==`);

			const content = await target.read();
			if (content != null)
				await writeHead(content);
		}

		return exitCode;
	});

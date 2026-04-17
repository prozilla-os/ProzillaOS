import { EXIT_CODE } from "../../../constants";
import { Command } from "../command";
import { Shell } from "../shell";

export const uniq = new Command()
	.setManual({
		purpose: "Report or omit repeated lines",
		usage: "uniq [OPTION]... [INPUT [OUTPUT]]",
		description: "Filter adjacent matching lines from INPUT, writing to OUTPUT.",
		options: {
			"-c": "Prefix lines by the number of occurrences",
			"-d": "Only print duplicate lines, one for each group",
			"-u": "Only print unique lines",
			"-i": "Ignore differences in case when comparing",
		},
	})
	.addOption({ short: "c", long: "count" })
	.addOption({ short: "d", long: "repeated" })
	.addOption({ short: "u", long: "unique" })
	.addOption({ short: "i", long: "ignore-case" })
	.setExecute(async function(this: Command, args, { stdout, stderr, stdin, workingDirectory, options }) {
		const processUniq = (text: string) => {
			if (!text.length) return;

			const lines = text.split("\n");
			const ignoreCase = options.includes("i");
			const showCount = options.includes("c");
			const onlyDuplicates = options.includes("d");
			const onlyUnique = options.includes("u");

			let currentLine = lines[0];
			let count = 0;

			const outputLine = (line: string, lineCount: number) => {
				const isDuplicate = lineCount > 1;
				if (onlyDuplicates && !isDuplicate) return;
				if (onlyUnique && isDuplicate) return;

				const prefix = showCount ? `${lineCount.toString().padStart(7, " ")} ` : "";
				Shell.printLn(stdout, prefix + line);
			};

			for (const line of lines) {
				const a = ignoreCase ? line.toLowerCase() : line;
				const b = ignoreCase ? currentLine.toLowerCase() : currentLine;

				if (a === b) {
					count++;
				} else {
					outputLine(currentLine, count);
					currentLine = line;
					count = 1;
				}
			}

			outputLine(currentLine, count);
		};

		const path = args[0];

		if (path && path !== "-") {
			const target = workingDirectory.navigate(path);

			if (!target)
				return Shell.writeError(stderr, this.name, `${path}: ${Shell.INVALID_PATH_ERROR}`);
			if (target.isFolder())
				return Shell.writeError(stderr, this.name, `${path}: Is a directory`);

			const content = await target.read();
			if (content != null)
				processUniq(content);
			return EXIT_CODE.success;
		}

		return Shell.readInput("", stdin, (data) => {
			processUniq(data);
			return EXIT_CODE.success;
		});
	});
import { EXIT_CODE } from "../../../constants";
import { Command } from "../command";
import { Shell } from "../shell";

export const grep = new Command()
	.setManual({
		purpose: "Search for patterns in text",
		usage: "grep [option...] pattern [file...]",
		description: "Search for PATTERN in each FILE.",
		options: {
			"-i": "Ignore case distinctions",
			"-v": "Invert match: select non-matching lines",
			"-n": "Print line number with output lines",
		},
	})
	.addOption({ short: "i", long: "ignore-case" })
	.addOption({ short: "v", long: "invert-match" })
	.addOption({ short: "n", long: "line-number" })
	.setExecute(async function(this: Command, args, { stdout, stderr, stdin, workingDirectory, options }) {
		if (!args.length)
			return Shell.writeError(stderr, this.name, "Pattern is required");

		const [pattern, ...fileNames] = args;
		const regex = new RegExp(pattern, options.includes("i") ? "i" : "");

		const search = async (text: string, origin?: string) => {
			await Promise.all(text.split("\n").map(async (line, index) => {
				const match = regex.test(line);
				const shouldMatch = options.includes("v") ? !match : match;

				if (shouldMatch) {
					let prefix = "";
					if (origin && fileNames.length > 1) prefix += `${origin}:`;
					if (options.includes("n")) prefix += `${index + 1}:`;
					await Shell.printLn(stdout, prefix + line);
				}
			}));
		};

		if (fileNames.length > 0) {
			for (const name of fileNames) {
				const file = workingDirectory.navigateToFile(name);
				if (!file) {
					await Shell.writeError(stderr, this.name, `${name}: No such file`);
					continue;
				}
                
				const text = await file.read();
				if (text != null)
					await search(text, name);
			}
			return EXIT_CODE.success;
		}

		return Shell.readInput("", stdin, async (data) => {
			await search(data);
			return EXIT_CODE.success;
		});
	});
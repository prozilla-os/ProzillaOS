import { Command } from "../command";

export const echo = new Command()
	.setManual({
		purpose: "Display a line of text",
		usage: "echo [option] [string ...]",
		description: "Write arguments to the standard output.",
		options: {
			"-n": "Do not output the trailing newline",
		},
	})
	.addOption({ short: "n", long: "no-newline", isInput: false })
	.setExecute(async function(this: Command, args, { stdout, options }) {
		const output = args.join(" ");
		const ending = options.includes("n") ? "" : "\n";

		await stdout.write(output + ending);
	});
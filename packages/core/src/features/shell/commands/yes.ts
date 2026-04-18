import { Command } from "../command";
import { Shell } from "../shell";

export const yes = new Command()
	.setManual({
		purpose: "Output a string repeatedly until killed",
		usage: "yes [STRING]...",
		description: "Repeatedly output a line with all specified STRING(s), or 'y'.",
	})
	.setExecute(async function(this: Command, args, { stdout, stdin }) {
		const output = (args.length > 0 ? args.join(" ") : "y") + "\n";

		return await Shell.loop({
			stdout,
			stdin,
			task: () => output,
		});
	});
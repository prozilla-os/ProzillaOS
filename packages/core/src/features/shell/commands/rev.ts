import { Command } from "../command";
import { Shell } from "../shell";

export const rev = new Command()
	.setManual({
		purpose: "Display the reverse of a text",
	})
	.setExecute(function(_args, { rawLine, stdin, stdout }) {
		return Shell.readInput(rawLine, stdin, (text) => {
			stdout.write(text.split("").reverse().join(""));
		});
	});
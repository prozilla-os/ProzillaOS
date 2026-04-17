import { Command } from "../command";
import { Shell } from "../shell";

export const rev = new Command()
	.setManual({
		purpose: "Display the reverse of a text",
	})
	.setExecute(function(_args, { rawLine, stdin, stdout }) {
		return Shell.readInput(rawLine, stdin, (text) => {
			const reversed = text
				.split("\n")
				.map((line) => line.split("").reverse().join(""))
				.join("\n");
                
			stdout.write(reversed);
		});
	});
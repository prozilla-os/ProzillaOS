import { Command } from "../command";
import { Shell } from "../shell";

export const make = new Command()
	.setRequireArgs(true)
	.setExecute(function(this: Command, args: string[], { stderr }) {
		if (args[0] === "love")
			return Shell.writeError(stderr, this.name, "*** No rule to make target 'love'. Stop.");
	});
import { formatError } from "../_utils/terminal.utils";
import { Command } from "../command";

export const make = new Command()
	.setRequireArgs(true)
	.setExecute(function(this: Command, args) {
		if ((args as string[])[0] === "love")
			return formatError(this.name, "*** No rule to make target 'love'. Stop.");
	});
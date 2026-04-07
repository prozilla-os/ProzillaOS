import { formatError } from "../_utils/shell.utils";
import { Command } from "../command";

export const make = new Command()
	.setRequireArgs(true)
	.setExecute(function(this: Command, args: string[]) {
		if (args[0] === "love")
			return formatError(this.name, "*** No rule to make target 'love'. Stop.");
	});
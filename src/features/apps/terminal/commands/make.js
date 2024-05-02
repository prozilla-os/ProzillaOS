import Command from "../command.js";
import CommandsManager from "../commands.js";

export const make = new Command()
	.setRequireArgs(true)
	.setExecute(function(args) {
		if (args[0] === "love")
			return CommandsManager.formatError(this.name, "*** No rule to make target 'love'. Stop.");
	});
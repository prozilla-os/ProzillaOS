import Command from "../command.js";

export const make = new Command()
	.setRequireArgs(true)
	.setExecute(function(args) {
		if (args[0] === "love")
			return `${this.name}: *** No rule to make target 'love'. Stop.`;
	});
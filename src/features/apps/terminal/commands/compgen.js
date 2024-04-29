import Command from "../command.js";
import CommandsManager from "../commands.js";

export const compgen = new Command()
	.setRequireOptions(true)
	.setExecute(function(args, { options }) {
		if (options.includes("c")) {
			return CommandsManager.COMMANDS.map((command) => command.name).sort().join("\n");
		}
	});
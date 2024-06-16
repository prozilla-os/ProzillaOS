import { Command, ExecuteParams } from "../command";
import { CommandsManager } from "../commands";

export const compgen = new Command()
	.setManual({
		purpose: "Display a list of all commands"
	})
	.setRequireOptions(true)
	.setExecute(function(args, params) {
		const { options } = params as ExecuteParams;
		if (options?.includes("c")) {
			return CommandsManager.COMMANDS.map((command) => command.name).sort().join("\n");
		}
	});
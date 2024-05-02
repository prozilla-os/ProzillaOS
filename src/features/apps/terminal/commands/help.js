import { ANSI } from "../../../../config/apps/terminal.config.js";
import Command from "../command.js";
import CommandsManager from "../commands.js";

export const help = new Command()
	.setExecute(function(args) {
		if (args.length === 0) {
			return CommandsManager.COMMANDS.map((command) => {
				if (command.manual?.purpose) {
					return  `${command.name} - ${ANSI.fg.green}${ANSI.decoration.dim}${command.manual.purpose}${ANSI.reset}`;
				} else {
					return command.name;
				}
			}).sort().join("\n");
		}

		const commandName = args[0].toLowerCase();
		const command = CommandsManager.find(commandName);

		if (!command)
			return CommandsManager.formatError(this.name, `${commandName}: Command not found`);

		if (!command.manual?.purpose)
			return CommandsManager.formatError(this.name, `${commandName}: No manual found`);

		return command.manual.purpose;
	});
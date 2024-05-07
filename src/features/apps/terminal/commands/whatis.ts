import { ANSI } from "../../../../config/apps/terminal.config";
import { formatError } from "../_utils/terminal.utils";
import Command from "../command";
import CommandsManager from "../commands";

export const whatis = new Command()
	.setRequireArgs(true)
	.setManual({
		purpose: "Show information about a command"
	})
	.setExecute(function(args) {
		const commandName = args[0].toLowerCase();
		const command = CommandsManager.find(commandName);

		if (!command)
			return formatError(this.name, `${commandName}: Command not found`);

		if (!command.manual?.purpose)
			return formatError(this.name, `${commandName}: No information found`);

		return `${commandName} - ${ANSI.fg.green}${command.manual.purpose}`;
	});
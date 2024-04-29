import Command from "../command.js";
import CommandsManager from "../commands.js";

export const whatis = new Command()
	.setRequireArgs(true)
	.setManual({
		purpose: "Show information about a command"
	})
	.setExecute(function(args) {
		const commandName = args[0].toLowerCase();
		const command = CommandsManager.find(commandName);

		if (!command)
			return `${this.name}: ${commandName}: Command not found`;

		if (!command.manual?.purpose)
			return `${this.name}: ${commandName}: No information found`;

		return `${commandName} - ${command.manual.purpose}`;
	});
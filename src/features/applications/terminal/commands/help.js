import Command from "../command.js";
import CommandsManager from "../commands.js";

export const help = new Command("help")
	.setExecute((args) => {
		if (args.length === 0) {
			return CommandsManager.COMMANDS.map((command) => {
				if (command.manual?.purpose) {
					return  `${command.name} - ${command.manual.purpose}`;
				} else {
					return command.name;
				}
			}).sort().join("\n");
		}

		const commandName = args[0].toLowerCase();
		const command = CommandsManager.find(commandName);

		if (!command)
			return `${this.name}: ${commandName}: Command not found`;

		if (!command.manual?.purpose)
			return `${this.name}: ${commandName}: No manual found`;

		return command.manual.purpose;
	});
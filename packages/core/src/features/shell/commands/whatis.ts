import { Ansi } from "@prozilla-os/shared";
import { Shell } from "../shell";
import { Command } from "../command";
import { CommandsManager } from "../commands";

export const whatis = new Command()
	.setRequireArgs(true)
	.setManual({
		purpose: "Show information about a command",
	})
	.setExecute(function(this: Command, args: string[], { stdout, stderr }) {
		const commandName = args[0].toLowerCase();
		const command = CommandsManager.find(commandName);

		if (!command)
			return Shell.writeError(stderr, this.name, `${commandName}: Command not found`);

		if (!command.manual?.purpose)
			return Shell.writeError(stderr, this.name, `${commandName}: No information found`);

		stdout.write(`${commandName} - ${Ansi.green(command.manual.purpose)}\n`);
	});
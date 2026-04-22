import { Ansi } from "@prozilla-os/shared";
import { Shell } from "../shell";
import { Command } from "../command";
import { ExecutableResolver } from "../executableResolver";

export const whatis = new Command()
	.setRequireArgs(true)
	.setManual({
		purpose: "Show information about a command",
	})
	.setExecute(async function(this: Command, args: string[], { stdout, stderr }) {
		const commandName = args[0].toLowerCase();
		const command = ExecutableResolver.getBuiltin(commandName);

		if (!command)
			return Shell.writeError(stderr, this.name, `${commandName}: Command not found`);

		if (!command.manual?.purpose)
			return Shell.writeError(stderr, this.name, `${commandName}: No information found`);

		await Shell.printLn(stdout, `${commandName} - ${Ansi.green(command.manual.purpose)}\n`);
	});
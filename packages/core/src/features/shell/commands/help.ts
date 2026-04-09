import { ANSI } from "@prozilla-os/shared";
import { Shell } from "../shell";
import { Command } from "../command";
import { CommandsManager } from "../commands";
import { EXIT_CODE } from "../../../constants";

export const help = new Command()
	.setExecute(function(this: Command, args: string[], { stdout, stderr }) {
		if (args.length === 0) {
			const output = CommandsManager.COMMANDS.map((command) => {
				if (command.manual?.purpose) {
					return `${command.name} - ${ANSI.fg.green}${ANSI.decoration.dim}${command.manual.purpose}${ANSI.reset}`;
				} else {
					return command.name;
				}
			}).sort().join("\n");

			stdout.write(output + "\n");
			return EXIT_CODE.success;
		}

		const commandName = args[0].toLowerCase();
		const command = CommandsManager.find(commandName);

		if (!command) {
			return Shell.writeError(stderr, this.name, `${commandName}: Command not found`);
		}

		if (!command.manual?.purpose) {
			return Shell.writeError(stderr, this.name, `${commandName}: No manual found`);
		}

		stdout.write(command.manual.purpose + "\n");
	});
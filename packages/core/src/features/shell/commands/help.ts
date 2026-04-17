import { ANSI } from "@prozilla-os/shared";
import { Shell } from "../shell";
import { Command } from "../command";
import { ExecutableResolver } from "../executableResolver";
import { EXIT_CODE } from "../../../constants";

export const help = new Command()
	.setExecute(function(this: Command, args: string[], { stdout, stderr }) {
		if (args.length === 0) {
			const output = ExecutableResolver.builtins.map((command) => {
				if (command.manual?.purpose) {
					return `${command.name} - ${ANSI.fg.green}${ANSI.decoration.dim}${command.manual.purpose}${ANSI.reset}`;
				} else {
					return command.name;
				}
			}).sort().join("\n");

			Shell.printLn(stdout, output);
			return EXIT_CODE.success;
		}

		const commandName = args[0].toLowerCase();
		const command = ExecutableResolver.getBuiltin(commandName);

		if (!command)
			return Shell.writeError(stderr, this.name, `${commandName}: Command not found`);
		if (!command.manual?.purpose)
			return Shell.writeError(stderr, this.name, `${commandName}: No manual found`);

		Shell.printLn(stdout, command.manual.purpose);
	});
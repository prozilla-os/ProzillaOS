import { Command } from "../command";
import { ExecutableResolver } from "../executableResolver";
import { Shell } from "../shell";

export const compgen = new Command()
	.setManual({
		purpose: "Display a list of all commands",
	})
	.setRequireOptions(true)
	.setExecute(function(_args, { options, stdout }) {
		if (options.includes("c")) {
			Shell.printLn(stdout, ExecutableResolver.builtins.map((command) => command.name).sort().join("\n"));
		}
	});
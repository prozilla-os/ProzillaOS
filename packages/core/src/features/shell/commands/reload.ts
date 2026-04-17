import { Command } from "../command";
import { ExecutableResolver } from "../executableResolver";

export const reload = new Command()
	.setManual({
		purpose: "Reload the terminal",
	})
	.setExecute(function() {
		ExecutableResolver.loadBuiltins();
	});
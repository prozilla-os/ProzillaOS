import { Command } from "../command";
import { ExecutableResolver } from "../executableResolver";

export const reload = new Command()
	.setManual({
		purpose: "Reload the terminal",
	})
	.setExecute(async function() {
		await ExecutableResolver.loadBuiltins();
	});
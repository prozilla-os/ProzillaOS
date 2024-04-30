import Command from "../command.js";
import CommandsManager from "../commands.js";

export const reload = new Command()
	.setManual({
		purpose: "Reload terminal commands",
		usage: "reload",
	})
	.setExecute(() => {
		CommandsManager.reload();
	
		return { blank: true };
	});
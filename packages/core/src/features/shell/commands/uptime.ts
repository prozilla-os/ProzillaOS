import { Command } from "../command";
import { Shell } from "../shell";

export const uptime = new Command()
	.setManual({
		purpose: "Display the current uptime of the system",
	})
	.setExecute(function(_args, { systemManager, stdout }) {
		Shell.printLn(stdout, `Uptime: ${systemManager.getUptime(2)}`);
	});
import { Command } from "../command";

export const uptime = new Command()
	.setManual({
		purpose: "Display the current uptime of the system",
	})
	.setExecute(function(_args, { systemManager, stdout }) {
		stdout.write(`Uptime: ${systemManager.getUptime(2)}`);
	});
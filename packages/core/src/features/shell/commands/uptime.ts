import { Command } from "../command";
import { Shell } from "../shell";

export const uptime = new Command()
	.setManual({
		purpose: "Display the current uptime of the system",
	})
	.setExecute(async function(_args, { systemManager, stdout }) {
		await Shell.printLn(stdout, `Uptime: ${systemManager.getUptime(2)}`);
	});
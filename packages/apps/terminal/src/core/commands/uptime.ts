import { Command, ExecuteParams } from "../command";

export const uptime = new Command()
	.setManual({
		purpose: "Display the current uptime of the system"
	})
	.setExecute(function(args, params) {
		const { systemManager } = params as ExecuteParams;
		return `Uptime: ${systemManager.getUptime(2)}`;
	});
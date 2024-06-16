import { TimeManager } from "../../../_utils/time.utils";
import { Command } from "../command";

export const uptime = new Command()
	.setManual({
		purpose: "Display the current uptime of the system"
	})
	.setExecute(function() {
		return `Uptime: ${TimeManager.getUptime(2)}`;
	});
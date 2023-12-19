import { reloadViewport } from "../../../utils/browser.js";
import Command from "../command.js";

export const reboot = new Command("reboot")
	.setManual({
		purpose: "Reboot the system"
	})
	.setExecute(() => {
		reloadViewport();
		return { blank: true };
	});
import { reloadViewport } from "../../../utils/browser.utils.js";
import Command from "../command.js";

export const reboot = new Command("reboot")
	.setManual({
		purpose: "Reboot the system"
	})
	.setExecute(() => {
		reloadViewport();
		return { blank: true };
	});
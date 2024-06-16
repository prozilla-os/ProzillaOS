import { reloadViewport } from "../../../_utils/browser.utils";
import { Command } from "../command";

export const reboot = new Command()
	.setManual({
		purpose: "Reboot the system"
	})
	.setExecute(function() {
		reloadViewport();
		return { blank: true };
	});
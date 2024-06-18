import { reloadViewport } from "@prozilla-os/core";
import { Command } from "../command";

export const reboot = new Command()
	.setManual({
		purpose: "Reboot the system"
	})
	.setExecute(function() {
		reloadViewport();
		return { blank: true };
	});
import { Command } from "../command";

export const exit = new Command()
	.setManual({
		purpose: "Quit terminal interface",
	})
	.setExecute(function(_args, { exit }) {
		exit();
	});
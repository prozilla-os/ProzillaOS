import { Command } from "../command";

export const clear = new Command()
	.setManual({
		purpose: "Clear terminal screen",
	})
	.setExecute(function(_args, { shell }) {
		shell.pushHistory({
			clear: true,
			isInput: false,
		});
	});
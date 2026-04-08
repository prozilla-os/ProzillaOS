import { Command } from "../command";

export const clear = new Command()
	.setManual({
		purpose: "Clear terminal screen",
	})
	.setExecute(function(_args, { pushHistory }) {
		pushHistory({
			clear: true,
			isInput: false,
		});
	
		return { blank: true };
	});
import Command from "../command.js";

export const clear = new Command("clear")
	.setManual({
		purpose: "Clear terminal screen",
		usage: "clear",
	})
	.setExecute(function(args, { pushHistory }) {
		pushHistory({
			clear: true,
			isInput: false
		});
	
		return { blank: true };
	});
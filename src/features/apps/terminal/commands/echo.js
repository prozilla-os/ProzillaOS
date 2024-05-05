import Command from "../command";

export const echo = new Command()
	.setManual({
		purpose: "Display text on the terminal screen"
	})
	.setExecute(function(args, { rawInputValue }) {
		return rawInputValue;
	});
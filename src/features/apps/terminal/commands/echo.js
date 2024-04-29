import Command from "../command.js";

export const echo = new Command()
	.setManual({
		purpose: "Display text on the terminal screen"
	})
	.setExecute((args, { rawInputValue }) => {
		return rawInputValue;
	});
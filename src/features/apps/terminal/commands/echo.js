import Command from "../command.js";

export const echo = new Command("echo")
	.setManual({
		purpose: "Display text on the terminal screen"
	})
	.setExecute((args, { rawInputValue }) => {
		return rawInputValue;
	});
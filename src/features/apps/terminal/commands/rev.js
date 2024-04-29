import Command from "../command.js";

export const rev = new Command()
	.setManual({
		purpose: "Reverses text."
	})
	.setExecute((args, { rawInputValue }) => {
		return rawInputValue.split("").reverse().join("");
	});
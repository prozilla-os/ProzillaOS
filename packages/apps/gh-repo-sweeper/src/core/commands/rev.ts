import { Command, ExecuteParams } from "../command";

export const rev = new Command()
	.setManual({
		purpose: "Display the reverse of a text",
	})
	.setExecute(function(_args, params) {
		const { rawInputValue } = params as ExecuteParams;
		return rawInputValue?.split("").reverse().join("");
	});
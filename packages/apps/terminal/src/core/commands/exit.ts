import { Command, ExecuteParams } from "../command";

export const exit = new Command()
	.setManual({
		purpose: "Quit terminal interface",
	})
	.setExecute(function(_args, params) {
		const { exit } = params as ExecuteParams;
		exit?.();
		return { blank: true };
	});
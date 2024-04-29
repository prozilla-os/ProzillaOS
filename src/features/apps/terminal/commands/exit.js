import Command from "../command.js";

export const exit = new Command()
	.setManual({
		purpose: "Quit terminal interface"
	})
	.setExecute((args, { exit }) => {
		exit();
		return { blank: true };
	});
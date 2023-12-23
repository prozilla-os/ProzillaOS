import Command from "../command.js";

export const exit = new Command("exit")
	.setManual({
		purpose: "Quit terminal interface"
	})
	.setExecute((args, { exit }) => {
		exit();
		return { blank: true };
	});
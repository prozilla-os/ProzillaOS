import Command from "../command";

export const exit = new Command()
	.setManual({
		purpose: "Quit terminal interface"
	})
	.setExecute(function(args, { exit }) {
		exit();
		return { blank: true };
	});
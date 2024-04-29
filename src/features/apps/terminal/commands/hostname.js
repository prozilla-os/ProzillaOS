import Command from "../command.js";

export const hostname = new Command()
	.setManual({
		purpose: "Display the hostname"
	})
	.setExecute((args, { hostname }) => {
		return hostname;
	});
import Command from "../command";

export const hostname = new Command()
	.setManual({
		purpose: "Display the hostname"
	})
	.setExecute(function(args, { hostname }) {
		return hostname;
	});
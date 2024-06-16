import { Command, ExecuteParams } from "../command";

export const hostname = new Command()
	.setManual({
		purpose: "Display the hostname"
	})
	.setExecute(function(args, params) {
		const { hostname } = params as ExecuteParams;
		return hostname;
	});
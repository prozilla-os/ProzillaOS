import { Command } from "../command";
import { Shell } from "../shell";

export const hostname = new Command()
	.setManual({
		purpose: "Display the hostname",
	})
	.setExecute(function(_args, { hostname, stdout }) {
		Shell.printLn(stdout, hostname);
	});
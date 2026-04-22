import { Command } from "../command";
import { Shell } from "../shell";

export const hostname = new Command()
	.setManual({
		purpose: "Display the hostname",
	})
	.setExecute(async function(_args, { hostname, stdout }) {
		await Shell.printLn(stdout, hostname);
	});
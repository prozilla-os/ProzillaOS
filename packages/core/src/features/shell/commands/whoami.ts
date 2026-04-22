import { Command } from "../command";
import { Shell } from "../shell";

export const whoami = new Command()
	.setManual({
		purpose: "Display the username",
	})
	.setExecute(async function (_args, { username, stdout })  {
		await Shell.printLn(stdout, username);
	});
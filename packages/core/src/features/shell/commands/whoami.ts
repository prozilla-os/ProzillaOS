import { Command } from "../command";
import { Shell } from "../shell";

export const whoami = new Command()
	.setManual({
		purpose: "Display the username",
	})
	.setExecute(function (_args, { username, stdout })  {
		Shell.printLn(stdout, username);
	});
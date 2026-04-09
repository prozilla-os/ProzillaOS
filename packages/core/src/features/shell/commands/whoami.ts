import { Command } from "../command";

export const whoami = new Command()
	.setManual({
		purpose: "Display the username",
	})
	.setExecute(function (_args, { username, stdout })  {
		stdout.write(username);
	});
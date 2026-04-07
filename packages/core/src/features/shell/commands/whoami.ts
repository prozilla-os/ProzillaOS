import { Command } from "../command";

export const whoami = new Command()
	.setManual({
		purpose: "Display the username",
	})
	.setExecute((_args, { username }) => {
		return username;
	});
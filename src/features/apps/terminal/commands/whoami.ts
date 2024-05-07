import Command from "../command";

export const whoami = new Command()
	.setManual({
		purpose: "Display the username"
	})
	.setExecute((args, { username }) => {
		return username;
	});
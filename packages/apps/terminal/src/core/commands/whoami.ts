import { Command, ExecuteParams } from "../command";

export const whoami = new Command()
	.setManual({
		purpose: "Display the username",
	})
	.setExecute((_args, params) => {
		const { username } = params as ExecuteParams;
		return username;
	});
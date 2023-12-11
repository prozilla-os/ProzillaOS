import Command from "../command.js";

export const whoami = new Command("whoami", (args, { username }) => {
	return username;
});
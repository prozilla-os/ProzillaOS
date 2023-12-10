import Command from "../command.js";

export const hostname = new Command("hostname", (args, { hostname }) => {
	return hostname;
});
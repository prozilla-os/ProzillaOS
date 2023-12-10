import Command from "../command.js";

export const echo = new Command("echo", (args, { rawInputValue }) => {
	return rawInputValue;
});
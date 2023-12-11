import Command from "../command.js";

export const exit = new Command("exit", (args, { exit }) => {
	exit();
	return { blank: true };
});
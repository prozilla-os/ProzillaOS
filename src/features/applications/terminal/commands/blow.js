import Command from "../command.js";

export const blow = new Command("%blow", () => {
	return "fg: %blow: No such job";
});
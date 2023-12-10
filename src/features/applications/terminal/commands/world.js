import Command from "../command.js";

export const world = new Command("world", () => {
	return "world: Not found";
});
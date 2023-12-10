import Command from "../command.js";

export const nice = new Command("nice", (args) => {
	if (args[0] === "man" && args[1] === "woman")
		return "nice: No manual entry for woman";
});
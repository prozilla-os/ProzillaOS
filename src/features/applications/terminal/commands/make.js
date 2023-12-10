import Command from "../command.js";

export const make = new Command("make", (args) => {
	if (args[0] === "love")
		return "make: *** No rule to make target `love'.  Stop.";
});
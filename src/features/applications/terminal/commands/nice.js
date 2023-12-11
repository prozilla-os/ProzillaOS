import Command from "../command.js";

export const nice = new Command("nice")
	.setExecute(function(args) {
		if (args[0] === "man" && args[1] === "woman")
			return `${this.name}: No manual entry for woman`;
	});
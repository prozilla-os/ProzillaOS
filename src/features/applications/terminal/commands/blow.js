import Command from "../command.js";

export const blow = new Command("%blow")
	.setExecute(function() {
		return `fg: ${this.name}: No such job`;
	});
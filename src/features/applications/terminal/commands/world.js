import Command from "../command.js";

export const world = new Command("world")
	.setExecute(function() {
		return `${this.name}: Not found`;
	});
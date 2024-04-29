import Command from "./command.js";

// Dynamically import commands
const context = require.context("./commands", false, /\.js$/);
const commands = [];
context.keys().forEach((key) => {
	const commandModule = context(key);
	const commandName = Object.keys(commandModule)[0];
	const command = commandModule[commandName];
	command.setName(commandName.toLowerCase());
	commands.push(command);
});

export default class CommandsManager {
	/**
	 * @param {string} name 
	 * @returns {Command}
	 */
	static find(name) {
		let matchCommand = null;

		this.COMMANDS.forEach((command) => {
			if (command.name === name) {
				matchCommand = command;
				return;
			}
		});

		return matchCommand;
	}

	/**
	 * @param {string} pattern 
	 * @returns {Command[]}
	 */
	static search(pattern) {
		const matches = this.COMMANDS.filter((command) => command.name.match(pattern));
		return matches;
	}

	static COMMANDS = commands;
}
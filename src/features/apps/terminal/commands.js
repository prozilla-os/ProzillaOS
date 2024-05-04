import Command from "./command.js";

let commands = [];

/**
 * Dynamically import commands
 */
const loadCommands = () => {
	commands = [];
	const context = require.context("./commands", false, /\.js$/);
	context.keys().forEach((key) => {
		const commandModule = context(key);
		const commandName = Object.keys(commandModule)[0];

		const command = commandModule[commandName];
		command.setName(commandName.toLowerCase());

		commands.push(command);
	});
};

loadCommands();

export default class CommandsManager {
	static COMMANDS = commands;

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

	static reload() {
		loadCommands();
		CommandsManager.COMMANDS = commands;
	}
}
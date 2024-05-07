import Command from "./command";

let commands = [];

/**
 * Dynamically import commands
 */
const loadCommands = () => {
	commands = [];
	const context = require.context("./commands", false, /\.ts$/);
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

	static find(name: string): Command {
		let matchCommand = null;

		this.COMMANDS.forEach((command) => {
			if (command.name === name) {
				matchCommand = command;
				return;
			}
		});

		return matchCommand;
	}

	static search(pattern: string): Command[] {
		const matches = this.COMMANDS.filter((command) => command.name.match(pattern));
		return matches;
	}

	static reload() {
		loadCommands();
		CommandsManager.COMMANDS = commands;
	}
}
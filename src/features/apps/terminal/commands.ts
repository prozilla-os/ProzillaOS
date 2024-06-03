import Command from "./command";

let commands: Command[] = [];

/**
 * Dynamically import commands
 */
const loadCommands = () => {
	commands = [];

	// https://vitejs.dev/guide/features.html#glob-import
	const modules = import.meta.glob("./commands/*.ts");
	for (const path in modules) {
		void modules[path]().then((commandModule: Record<string, Command>) => {
			const commandName = Object.keys(commandModule)[0];

			const command = commandModule[commandName];
			command.setName(commandName.toLowerCase());

			commands.push(command);
		});
	}
};

loadCommands();

export default class CommandsManager {
	static COMMANDS = commands;

	static find(name: string): Command {
		let matchCommand: Command = null;

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
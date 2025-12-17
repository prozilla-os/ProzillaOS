import { Command } from "./command";

let commands: Command[] = [];

// https://vitejs.dev/guide/features.html#glob-import
const modules = import.meta.glob("./commands/*.ts");

/**
 * Dynamically import commands
 */
const loadCommands = () => {
	commands = [];
	
	for (const path in modules) {
		void modules[path]().then((commandModule) => {
			const commandName = Object.keys(commandModule as Record<string, Command>)[0];

			const command = (commandModule as Record<string, Command>)[commandName];

			if (command == null)
				return;

			if (!command.name) {
        		command.setName(commandName.toLowerCase());
      		}

			commands.push(command);
		});
	}
};

loadCommands();

export class CommandsManager {
	static COMMANDS = commands;

	static find(name: string): Command | null {
		let matchCommand: Command | null = null;

		this.COMMANDS.forEach((command) => {
			if (command.name === name) {
				matchCommand = command;
				return;
			}
		});

		return matchCommand;
	}

	static search(pattern: string): Command[] {
		const matches = this.COMMANDS.filter((command) => command.name?.match(pattern));
		return matches;
	}

	static reload() {
		loadCommands();
		CommandsManager.COMMANDS = commands;
	}
}

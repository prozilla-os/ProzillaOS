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

	static addCommand(command: Command) {
		this.COMMANDS.push(command);
	}

	static find(name: string): Command | null {
		return this.COMMANDS.find((command) => command.name == name)!;
	}

	static search(pattern: string): Command[] {
		return this.COMMANDS.filter((command) => command.name.match(pattern));
	}

	static reload() {
		loadCommands();
		this.COMMANDS = commands;
	}
}

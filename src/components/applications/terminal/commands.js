export class Command {
	/**
	 * @param {String} name 
	 * @param {Function} execute 
	 */
	constructor(name, execute) {
		this.name = name;
		this.execute = execute;
		this.aliases = [];
	}

	addAlias(alias) {
		this.aliases.push(alias);
	}

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

	static COMMANDS = [
		new Command("echo", (args) => {
			return args.join(" ");
		}),
		new Command("clear", (args, { pushHistory }) => {
			pushHistory({
				clear: true,
				isInput: false
			});

			return { blank: true };
		}),
	]
}
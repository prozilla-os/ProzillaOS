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
		new Command("ls", (args, { currentDirectory }) => {
			let directory = currentDirectory;

			if (args.length > 0) {
				directory = currentDirectory.navigate(args[0]);
			}

			if (!directory)
				return `ls: Cannot access '${args[0]}': No such file or directory`;

			const fodlerNames = directory.subFolders.map((folder) => folder.id);
			const fileNames = directory.files.map((file) => file.id);

			const contents = fodlerNames.concat(fileNames);

			if (contents.length === 0)
				return { blank: true };

			return contents.sort((nameA, nameB) => nameA.localeCompare(nameB)).join(" ");
		}),
		new Command("cd", (args, { currentDirectory, setCurrentDirectory }) => {
			const destination = currentDirectory.navigate(args[0]);

			if (!destination)
				return `cd: ${args[0]}: No such file or directory`;

			console.log(destination);
			setCurrentDirectory(destination);
			return { blank: true };
		})
	]
}
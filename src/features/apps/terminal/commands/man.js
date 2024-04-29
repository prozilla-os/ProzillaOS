import Command from "../command.js";
import CommandsManager from "../commands.js";

const MARGIN = 5;

export const man = new Command()
	.setRequireArgs(true)
	.setManual({
		purpose: "Show system reference manuals",
		usage: "man [OPTION]... page\n"
			+ "man -k [OPTION]... regexp",
		description: "Each page arguments given to man is normally the name of a command.\n"
			+ "The manual page associated with this command is then found and displayed.",
		options: {
			"-k": "Search for manual page using regexp"
		}
	})
	.setExecute(function(args, { options }) {
		// Search function
		if (options.includes("k")) {
			const commands = CommandsManager.search(args[0].toLowerCase());
			return commands.map((command) => {
				if (command.manual?.purpose) {
					return  `${command.name} - ${command.manual.purpose}`;
				} else {
					return command.name;
				}
			}).sort().join("\n");
		}

		const commandName = args[0].toLowerCase();
		const command = CommandsManager.find(commandName);

		if (!command)
			return `${this.name}: ${commandName}: Command not found`;

		const manual = command.manual;

		if (!manual)
			return `${this.name}: ${commandName}: No manual found`;

		const formatText = (text) => {
			const lines = text.split("\n").map((line) => " ".repeat(MARGIN) + line);
			return lines.join("\n");
		};

		const sections = [["NAME"]];

		if (manual.purpose) {
			sections[0].push(formatText(`${commandName} - ${command.manual.purpose}`));
		} else {
			sections[0].push(formatText(commandName));
		}

		if (manual.usage) {
			sections.push([
				"SYNOPSIS",
				formatText(manual.usage)
			]);
		}
		
		if (manual.description) {
			sections.push([
				"DESCRIPTION",
				formatText(manual.description)
			]);
		}

		if (manual.options) {
			sections.push([
				"OPTIONS",
				formatText(Object.entries(manual.options).map(([key, value]) => {
					return `${key} ${value}`;
				}).join("\n"))
			]);
		}

		return sections.map((section) => section.join("\n")).join("\n\n");
	});
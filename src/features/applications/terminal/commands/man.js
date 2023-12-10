import Command from "../command.js";
import CommandsManager from "../commands.js";

const MARGIN = 5;

export const man = new Command("man")
	.setRequireArgs(true)
	.setManual({
		purpose: "show system reference manuals",
		usage: "man [OPTION]... page",
		description: "Each page arguments given to man is normally the name of a command.\n"
			+ "The manual page associated with this command is then found and displayed."
	})
	.setExecute((args) => {
		const commandName = args[0].toLowerCase();
		const command = CommandsManager.find(commandName);

		if (!command)
			return `man: ${commandName}: Command not found`;

		const manual = command.manual;

		if (!manual)
			return `man: ${commandName}: No manual found`;

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

		return sections.map((section) => section.join("\n")).join("\n\n");
	});
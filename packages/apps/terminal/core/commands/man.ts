import { ANSI } from "../../../../config/apps/terminal.config";
import { formatError } from "../_utils/terminal.utils";
import { Command, ExecuteParams } from "../command";
import { CommandsManager } from "../commands";

const MARGIN = 5;

export const man = new Command()
	.setRequireArgs(true)
	.setManual({
		purpose: "Show system reference manuals",
		usage: "man [options] page\n"
			+ "man -k [options] regexp",
		description: "Each page arguments given to man is normally the name of a command.\n"
			+ "The manual page associated with this command is then found and displayed.",
		options: {
			"-k": "Search for manual page using regexp"
		}
	})
	.setExecute(function(this: Command, args, params) {
		const { options } = params as ExecuteParams;

		// Search function
		if (options?.includes("k")) {
			const commands = CommandsManager.search((args as string[])[0].toLowerCase());
			return commands.map((command) => {
				if (command.manual?.purpose) {
					return  `${command.name} - ${command.manual.purpose}`;
				} else {
					return command.name;
				}
			}).sort().join("\n");
		}

		const commandName = (args as string[])[0].toLowerCase();
		const command = CommandsManager.find(commandName);

		if (!command)
			return formatError(this.name, `${commandName}: Command not found`);

		const manual = command.manual;

		if (!manual)
			return formatError(this.name, `${commandName}: No manual found`);

		const formatText = (text: string) => {
			const lines = text.split("\n").map((line) => " ".repeat(MARGIN) + line);
			return lines.join("\n");
		};

		const sections = [["NAME"]];

		if (manual.purpose) {
			sections[0].push(formatText(`${commandName} - ${ANSI.decoration.dim}${ANSI.fg.yellow}${manual.purpose}${ANSI.reset}`));
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
					return `${key} ${ANSI.decoration.dim}${ANSI.fg.yellow}${value}${ANSI.reset}`;
				}).join("\n"))
			]);
		}

		return sections.map((section) => {
			section[0] = ANSI.fg.yellow + section[0] + ANSI.reset;
			return section.join("\n");
		}).join("\n\n");
	});
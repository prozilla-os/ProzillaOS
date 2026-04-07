import { Ansi, ANSI } from "@prozilla-os/shared";
import { formatError } from "../_utils/shell.utils";
import { Command } from "../command";
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
			"-k": "Search for manual page using regexp",
		},
	})
	.addOption({
		short: "k",
		long: "apropos",
	})
	.setExecute(function(this: Command, args, { options }) {
		// Search function
		if (options?.includes("k")) {
			const commands = CommandsManager.search(args[0].toLowerCase());
			return commands.map((command) => {
				if (command.manual?.purpose) {
					return  `${command.name} - ${command.manual.purpose}`;
				} else {
					return command.name;
				}
			}).sort().join("\n");
		}

		const commandName = (args)[0].toLowerCase();
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
			sections[0].push(formatText(`${commandName} - ${ANSI.decoration.dim}${Ansi.yellow(manual.purpose)}`));
		} else {
			sections[0].push(formatText(commandName));
		}

		if (manual.usage) {
			sections.push([
				"SYNOPSIS",
				formatText(manual.usage),
			]);
		}
		
		if (manual.description) {
			sections.push([
				"DESCRIPTION",
				formatText(manual.description),
			]);
		}

		if (manual.options) {
			sections.push([
				"OPTIONS",
				formatText(Object.entries(manual.options).map(([key, value]) => {
					let rawOptionSyntax = key.split(" ");
					const shortOption = rawOptionSyntax[0].slice(1);
					rawOptionSyntax = rawOptionSyntax.slice(1);

					let optionSyntax = "-" + shortOption;
					const option = command.options.find((option) => option.short == shortOption);
					if (option !== undefined) {
						optionSyntax += ", --" + option.long;
					}

					if (rawOptionSyntax.length) {
						optionSyntax += " " + Ansi.dim(rawOptionSyntax.join(" "));
					}
					
					return `${optionSyntax} ${ANSI.decoration.dim}${Ansi.yellow(String(value))}`;
				}).join("\n")),
			]);
		}

		return sections.map((section) => {
			section[0] = Ansi.yellow(section[0]);
			return section.join("\n");
		}).join("\n\n");
	});
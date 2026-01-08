import { App, AppsConfig } from "@prozilla-os/core";
import { Terminal, TerminalProps } from "../components/Terminal";
import { CommandsManager } from "./commands";
import { Command } from "./command";

export class TerminalApp extends App<TerminalProps> {

	constructor() {
		super("Terminal", "terminal", Terminal);
		this.setIconUrl("https://os.prozilla.dev/assets/apps/icons/terminal.svg");
		this.setRole(AppsConfig.APP_ROLES.terminal);
		this.setCategory("Utilities & tools");
	}

	addCommands(commands: Command[]) {
		commands.forEach((command) => this.addCommand(command));
		return this;
	}


	addCommand(command: Command) {
		CommandsManager.addCommand(command);
		return this;
	}

}
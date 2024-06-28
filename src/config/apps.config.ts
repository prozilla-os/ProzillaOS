import { AppsConfig, fileExplorer, settings, terminal, textEditor } from "prozilla-os";
import { NAME } from "./branding.config";

export const appsConfig = new AppsConfig({
	apps: [
		fileExplorer.setName("Files")
			.setDescription("Browse and manage your virtual files on ProzillaOS.")
			.setIconUrl("/assets/apps/icons/file-explorer.svg"),
		terminal.setName("Commands")
			.setDescription("A command line tool inspired by the Unix shell that runs entirely in your browser using ProzillaOS. Allows you to interact and manipulate the virtual drive and run silly commands.")
			.setIconUrl("/assets/apps/icons/terminal.svg"),
		textEditor.setName("Notes")
			.setDescription("Text editor for reading and writing text documents in a virtual file system using ProzillaOS.")
			.setIconUrl("/assets/apps/icons/text-editor.svg"),
		settings.setName("Settings")
			.setDescription(`Configure ${NAME}'s settings and customize your experience.`)
			.setIconUrl("/assets/apps/icons/settings.svg"),
	],
});
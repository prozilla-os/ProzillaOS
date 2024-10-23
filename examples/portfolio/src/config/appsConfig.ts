import { AppsConfig, fileExplorer, terminal, textEditor } from "prozilla-os";

export const appsConfig = new AppsConfig({
	apps: [
		fileExplorer.setName("File Explorer")
			.setDescription("Application for browsing files."),
		terminal.setName("Terminal"),
		textEditor.setName("Text Editor"),
	]
});

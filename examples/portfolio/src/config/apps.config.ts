import { AppsConfig, fileExplorer, textEditor } from "prozilla-os";

export const appsConfig = new AppsConfig({
	apps: [
		fileExplorer.setName("File Explorer")
			.setDescription("Application for browsing files."),
		textEditor.setName("Text Editor")
			.setPinnedByDefault(false),
	],
});

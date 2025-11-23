import { AppsConfig, fileExplorer, repoSweeper, textEditor } from "prozilla-os";

export const appsConfig = new AppsConfig({
	apps: [
		fileExplorer
			.setName("Files")
			.setDescription("Browse and manage your virtual files on ProzillaOS.")
			.setIconUrl("/assets/apps/icons/file-explorer.svg")
			.setShowDesktopIcon(true)
			.setPinnedByDefault(false),
		textEditor
			.setName("Notes")
			.setDescription(
				"Text editor for reading and writing text documents in a virtual file system using ProzillaOS."
			)
			.setIconUrl("/assets/apps/icons/text-editor.svg")
			.setPinnedByDefault(false),
		repoSweeper.setIconUrl("/assets/apps/icons/custom.svg").setShowDesktopIcon(true),
	],
});

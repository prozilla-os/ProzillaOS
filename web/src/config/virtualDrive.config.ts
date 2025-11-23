import { VirtualDriveConfig, VirtualFolder, VirtualRoot } from "prozilla-os";

function loadData(virtualRoot: VirtualRoot) {
	const desktopFolder = virtualRoot.navigate("~/Desktop");

	if (!desktopFolder || !(desktopFolder instanceof VirtualFolder)) return;

	desktopFolder.createFile("About", "md", (file) => {
		file.setSource("documents/about.md");
	});
}

export const virtualDriveConfig = new VirtualDriveConfig({
	saveData: false,
	defaultData: {
		includeAudioFolder: false,
		includeVideoFolder: false,
		loadData,
	},
});

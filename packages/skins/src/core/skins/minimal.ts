import { Skin } from "../skin";

/**
 * A minimalistic skin with monochrome icons
 */
export const minimalSkin = new Skin({
	appIcons: {
		"browser": "/assets/skins/minimal/apps/icons/browser.svg",
		"calculator": "/assets/skins/minimal/apps/icons/calculator.svg",
		"file-explorer": "/assets/skins/minimal/apps/icons/file-explorer.svg",
		"media-viewer": "/assets/skins/minimal/apps/icons/media-viewer.svg",
		"settings": "/assets/skins/minimal/apps/icons/settings.svg",
		"terminal": "/assets/skins/minimal/apps/icons/terminal.svg",
		"text-editor": "/assets/skins/minimal/apps/icons/text-editor.svg",
		"ball-maze": "/assets/skins/minimal/apps/icons/ball-maze.svg",
		"minesweeper": "/assets/skins/minimal/apps/icons/minesweeper.svg",
		"wordle": "/assets/skins/minimal/apps/icons/wordle.svg",
		"logic-sim": "/assets/skins/minimal/apps/icons/logic-sim.svg",
	},
	defaultWallpaper: "/assets/wallpapers/abstract-wallpaper-mesh-gradient-cyan.png",
	fileIcons: {
		generic: "/assets/skins/minimal/apps/file-explorer/file.svg",
	},
	folderIcons: {
		generic: "/assets/skins/minimal/apps/file-explorer/folder.svg",
	},
	loadStyleSheet: () => {
		void import("../../styles/skins/minimal.css");
	},
});
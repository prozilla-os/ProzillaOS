import { Skin } from "../skin";

/**
 * A skin inspired by the MacOS interface.
 */
export const macOsSkin = new Skin({
	appIcons: {
		"ball-maze": "/assets/skins/mac/apps/icons/ball-maze.svg",
		"browser": "/assets/skins/mac/apps/icons/browser.svg",
		"calculator": "/assets/skins/mac/apps/icons/calculator.svg",
		"file-explorer": "/assets/skins/mac/apps/icons/file-explorer.svg",
		"media-viewer": "/assets/skins/mac/apps/icons/media-viewer.svg",
		"minesweeper": "/assets/skins/mac/apps/icons/minesweeper.svg",
		"settings": "/assets/skins/mac/apps/icons/settings.svg",
		"terminal": "/assets/skins/mac/apps/icons/terminal.svg",
		"text-editor": "/assets/skins/mac/apps/icons/text-editor.svg",
		"wordle": "/assets/skins/mac/apps/icons/wordle.svg",
		"app-center": "/assets/skins/mac/apps/icons/app-center.svg",
	},
	appNames: {
		"browser": "Safari",
		"calculator": "Calculator",
		"file-explorer": "Finder",
		"media-viewer": "Photos",
		"terminal": "Terminal",
		"text-editor": "Notes",
		"app-center": "Launchpad",
	},
	wallpapers: [
		"/assets/skins/mac/wallpapers/macos-monterey.jpg",
		"/assets/skins/mac/wallpapers/macos-big-sur.jpg",
		"/assets/skins/mac/wallpapers/macos-sequoia.jpg",
		"/assets/skins/mac/wallpapers/macos-sonoma.jpg",
		"/assets/skins/mac/wallpapers/macos-ventura.jpg",
	],
	defaultWallpaper: "/assets/skins/mac/wallpapers/macos-monterey.jpg",
	fileIcons: {
		generic: "/assets/skins/mac/apps/file-explorer/file.svg",
	},
	folderIcons: {
		generic: "/assets/skins/mac/apps/file-explorer/folder.svg",
	},
	loadStyleSheet: () => {
		void import("../../styles/skins/macOs.css");
	},
});
import { Theme } from "../../types";
import { Skin } from "../skin";

export const windows95Skin = new Skin({
	systemIcon: "/assets/skins/windows95/system-icon.png",
	appIcons: {
		"browser": "/assets/skins/windows95/apps/icons/browser.svg",
		"calculator": "/assets/skins/windows95/apps/icons/calculator.svg",
		"file-explorer": "/assets/skins/windows95/apps/icons/file-explorer.svg",
		"media-viewer": "/assets/skins/windows95/apps/icons/media-viewer.svg",
		"minesweeper": "/assets/skins/windows95/apps/icons/minesweeper.svg",
		"settings": "/assets/skins/windows95/apps/icons/settings.svg",
		"terminal": "/assets/skins/windows95/apps/icons/terminal.svg",
		"text-editor": "/assets/skins/windows95/apps/icons/text-editor.svg",
	},
	appNames: {
		"browser": "Internet Explorer",
		"calculator": "Calculator",
		"file-explorer": "Windows Explorer",
		"media-viewer": "Imaging",
		"terminal": "MS-DOS Prompt",
		"text-editor": "Notepad",
	},
	wallpapers: [
		"/assets/skins/windows95/wallpapers/default.png",
		"/assets/skins/windows95/wallpapers/clouds.png",
	],
	defaultWallpaper: "/assets/skins/windows95/wallpapers/default.png",
	fileIcons: {
		generic: "/assets/skins/windows95/apps/file-explorer/file.svg",
	},
	folderIcons: {
		generic: "/assets/skins/windows95/apps/file-explorer/folder.svg",
	},
	defaultTheme: Theme.Light,
	loadStyleSheet: () => {
		void import("../../styles/skins/windows95.css");
	},
});
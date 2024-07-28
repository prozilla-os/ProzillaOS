import { Skin } from "../skin";

export const pixelSkin = new Skin({
	appIcons: {
		"ball-maze": "/assets/skins/pixel/apps/icons/ball-maze.png",
		"browser": "/assets/skins/pixel/apps/icons/browser.png",
		"calculator": "/assets/skins/pixel/apps/icons/calculator.png",
		"file-explorer": "/assets/skins/pixel/apps/icons/file-explorer.png",
		"logic-sim": "/assets/skins/pixel/apps/icons/logic-sim.png",
		"media-viewer": "/assets/skins/pixel/apps/icons/media-viewer.png",
		"minesweeper": "/assets/skins/pixel/apps/icons/minesweeper.png",
		"settings": "/assets/skins/pixel/apps/icons/settings.png",
		"terminal": "/assets/skins/pixel/apps/icons/terminal.png",
		"text-editor": "/assets/skins/pixel/apps/icons/text-editor.png",
		"wordle": "/assets/skins/pixel/apps/icons/wordle.png",
	},
	wallpapers: [
		"/assets/skins/pixel/wallpapers/vibrant-wallpaper-blue-purple-red.png",
		"/assets/skins/pixel/wallpapers/abstract-mesh-gradient-orange-red-purple.png",
		"/assets/skins/pixel/wallpapers/vibrant-wallpaper-purple-yellow.png",
		"/assets/skins/pixel/wallpapers/abstract-wallpaper-mesh-gradient-cyan.png",
		"/assets/skins/pixel/wallpapers/colorful-abstract-wallpaper-blue-red-green.png",
		"/assets/skins/pixel/wallpapers/mesh-gradient-wallpaper-red-purple.png",
		"/assets/skins/pixel/wallpapers/colorful-mesh-gradient-red-green.png",
		"/assets/skins/pixel/wallpapers/flame-abstract-wallpaper-orange.png",
		"/assets/skins/pixel/wallpapers/wave-abstract-wallpaper-teal.png",
	],
	defaultWallpaper: "/assets/skins/pixel/wallpapers/vibrant-wallpaper-blue-purple-red.png",
	fileIcons: {
		generic: "/assets/skins/pixel/apps/file-explorer/file.png"
	},
	folderIcons: {
		generic: "/assets/skins/pixel/apps/file-explorer/folder.png"
	},
	loadStyleSheet: () => {
		import("../../styles/skins/pixel.css");
	}
});
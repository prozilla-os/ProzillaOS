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
	loadStyleSheet: () => {
		import("../../styles/skins/pixel.css");
	}
});
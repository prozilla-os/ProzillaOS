import { App, Vector2, WebView } from "prozilla-os";

export const minesweeper = new App("Minesweeper", "minesweeper", WebView, {
	source: "https://prozilla.dev/minesweeper",
	size: new Vector2(500, 580)
});
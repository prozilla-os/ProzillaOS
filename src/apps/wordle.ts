import { App, Vector2, WebView } from "prozilla-os";

export const wordle = new App("Wordle", "wordle", WebView, {
	source: "https://prozilla.dev/wordle",
	size: new Vector2(400, 650)
});
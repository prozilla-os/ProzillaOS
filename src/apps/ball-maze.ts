import { App, Vector2, WebView } from "prozilla-os";

export const ballMaze = new App("Ball Maze", "ball-maze", WebView, {
	source: "https://prozilla.dev/ball-maze",
	size: new Vector2(600, 600)
});
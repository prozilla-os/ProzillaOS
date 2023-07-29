/* eslint-disable eqeqeq */
import { FileExplorer } from "../../components/applications/file-explorer/FileExplorer.jsx";
import { MediaViewer } from "../../components/applications/media-viewer/MediaViewer.jsx";
import { WebView } from "../../components/applications/templates/WebView.jsx";
import { Terminal } from "../../components/applications/terminal/Terminal.jsx";
import Application from "./application.js";

export default class ApplicationsManager {
	static APPLICATIONS = [
		new Application("Terminal", "terminal", Terminal),
		// new Application("Browser", "browser"),
		new Application("Code Editor", "code-editor"),
		new Application("File Explorer", "file-explorer", FileExplorer),
		new Application("Media Viewer", "media-viewer", MediaViewer),
		new Application("Wordle", "wordle", WebView, { source: "https://prozilla.dev/wordle" }),
		new Application("Balls", "balls", WebView, { source: "https://prozilla.dev/ball-maze" }),
		new Application("Minesweeper", "minesweeper", WebView, { source: "https://prozilla.dev/minesweeper" }),
	]

	/**
	 * @param {String} id 
	 * @returns {Application}
	 */
	static getApplication(id) {
		let application = null;

		this.APPLICATIONS.forEach((app) => {
			if (app.id == id) {
				application = app;
				return;
			}
		});

		return application;
	}

	/**
	 * Get the application associated with a file extension
	 * @param {String} fileExtension 
	 * @returns {Application}
	 */
	static getFileApplication(fileExtension) {
		let app = null;

		// eslint-disable-next-line default-case
		switch (fileExtension) {
			case "png":
				app = this.getApplication("media-viewer");
				break;
		}

		return app;
	}
}
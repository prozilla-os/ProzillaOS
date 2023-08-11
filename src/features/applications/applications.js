import Application from "./application.js";
import { FileExplorer } from "../../components/applications/file-explorer/FileExplorer.jsx";
import { MediaViewer } from "../../components/applications/media-viewer/MediaViewer.jsx";
import { WebView } from "../../components/applications/.templates/WebView.jsx";
import { Terminal } from "../../components/applications/terminal/Terminal.jsx";
import { TextEditor } from "../../components/applications/text-editor/TextEditor.jsx";
import { Settings } from "../../components/applications/settings/Settings.jsx";
// import { Calculator } from "../../components/applications/calculator/Calculator.jsx";
import Vector2 from "../math/vector2.js";

export default class ApplicationsManager {
	static APPLICATIONS = [
		new Application("Commands", "terminal", Terminal),
		new Application("Settings", "settings", Settings),
		// new Application("Browser", "browser"),
		// new Application("Calculator", "calculator", Calculator, { size: new Vector2(400, 600) }),
		new Application("Notes", "text-editor", TextEditor),
		// new Application("Code Editor", "code-editor"),
		new Application("Files", "file-explorer", FileExplorer),
		new Application("Photos", "media-viewer", MediaViewer),
		new Application("Wordle", "wordle", WebView, {
			source: "https://prozilla.dev/wordle",
			size: new Vector2(400, 650)
		}),
		new Application("Balls", "balls", WebView, {
			source: "https://prozilla.dev/ball-maze",
			size: new Vector2(600, 600)
		}),
		new Application("Minesweeper", "minesweeper", WebView, {
			source: "https://prozilla.dev/minesweeper",
			size: new Vector2(500, 580)
		}),
	];

	/**
	 * @param {string} id 
	 * @returns {Application | null}
	 */
	static getApplication(id) {
		let application = null;

		this.APPLICATIONS.forEach((app) => {
			if (app.id === id) {
				application = app;
				return;
			}
		});

		return application;
	}

	/**
	 * Get the application associated with a file extension
	 * @param {string} fileExtension 
	 * @returns {Application}
	 */
	static getFileApplication(fileExtension) {
		let app = null;

		// eslint-disable-next-line default-case
		switch (fileExtension) {
			case "png":
				app = this.getApplication("media-viewer");
				break;
			case "txt":
			case "md":
			case "xml":
				app = this.getApplication("text-editor");
				break;
		}

		return app;
	}
}
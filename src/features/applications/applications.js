import Application from "./application.js";
import { FileExplorer } from "../../components/applications/file-explorer/FileExplorer.jsx";
import { MediaViewer } from "../../components/applications/media-viewer/MediaViewer.jsx";
import { WebView } from "../../components/applications/.templates/WebView.jsx";
import { Terminal } from "../../components/applications/terminal/Terminal.jsx";
import { TextEditor } from "../../components/applications/text-editor/TextEditor.jsx";
import { Settings } from "../../components/applications/settings/Settings.jsx";
// import { Calculator } from "../../components/applications/calculator/Calculator.jsx";
import Vector2 from "../math/vector2.js";
import { APPS } from "../../constants/applications.js";
import { Browser } from "../../components/applications/browser/Browser.jsx";

export default class AppsManager {
	static APPLICATIONS = [
		new Application("Commands", APPS.TERMINAL, Terminal),
		new Application("Settings", APPS.SETTINGS, Settings),
		new Application("Photos", APPS.MEDIA_VIEWER, MediaViewer),
		// new Application("Browser", "browser"),
		// new Application("Calculator", "calculator", Calculator, { size: new Vector2(400, 600) }),
		new Application("Notes", APPS.TEXT_EDITOR, TextEditor),
		// new Application("Code Editor", "code-editor"),
		new Application("Files", APPS.FILE_EXPLORER, FileExplorer),
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
		new Application("Browser", "browser", Browser, {
			size: new Vector2(700, 500)
		}),
	];

	/**
	 * @param {string} id 
	 * @returns {Application | null}
	 */
	static getApp(id) {
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
	static getFileApp(fileExtension) {
		let app = null;

		// eslint-disable-next-line default-case
		switch (fileExtension) {
			case "png":
				app = this.getApp(APPS.MEDIA_VIEWER);
				break;
			case "txt":
			case "md":
			case "xml":
				app = this.getApp(APPS.TEXT_EDITOR);
				break;
		}

		return app;
	}

	/**
	 * Returns the url of an icon inside the icons folder or the default icon of an app
	 * @param {string} appId 
	 * @param {string | null} iconName 
	 * @returns {string}
	 */
	static getAppIconUrl(appId, iconName) {
		if (iconName == null) {
			return `${process.env.PUBLIC_URL}/assets/applications/icons/${appId}.svg`;
		} else {
			return `${process.env.PUBLIC_URL}/assets/applications/${appId}/icons/${iconName}.svg`;
		}
	}
}
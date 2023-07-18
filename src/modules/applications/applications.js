/* eslint-disable eqeqeq */
import { Terminal } from "../../components/applications/terminal/Terminal.js";
import Application from "./application.js";

export default class ApplicationsManager {
	static APPLICATIONS = [
		new Application("Terminal", "terminal", <Terminal/>),
		// new Application("Browser", "browser"),
		new Application("Code Editor", "code-editor"),
		new Application("File Explorer", "file-explorer"),
		new Application("Media Viewer", "media-viewer"),
	]

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
}
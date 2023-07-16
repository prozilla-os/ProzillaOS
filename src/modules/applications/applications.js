/* eslint-disable eqeqeq */
import Application from "./application.js";

export default class ApplicationsManager {
	static APPLICATIONS = [
		new Application("Terminal", "terminal"),
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
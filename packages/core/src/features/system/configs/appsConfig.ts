import { App } from ".";
import { OptionalInterface } from "../../../types/util";

export interface AppsConfigOptions {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	apps: App<any>[];
}

export class AppsConfig {
	apps: AppsConfigOptions["apps"] = [];

	constructor(options: OptionalInterface<AppsConfigOptions> = {}) {
		const { apps } = options as AppsConfigOptions;

		const appIds: string[] = [];
		apps.forEach((app) => {
			if (appIds.includes(app.id))
				throw new Error(`Duplicate app ID found: ${app.id}`
					+ "\nApp IDs must be unique.");

			this.apps.push(app);
			appIds.push(app.id);
		});
	}

	getAppById(id: string): App | null {
		let resultApp: App | null = null;

		this.apps.forEach((app) => {
			if (app.id === id) {
				resultApp = app;
				return;
			}
		});

		return resultApp;
	}

	/**
	 * Get the app associated with a file extension
	 */
	getAppByFileExtension(fileExtension: string): App | null {
		return null;

		// let app: App | null = null;

		// if (IMAGE_FORMATS.includes(fileExtension))
		// 	return this.getAppById(APPS.MEDIA_VIEWER);

		// switch (fileExtension) {
		// 	default:
		// 		app = this.getAppById(APPS.TEXT_EDITOR);
		// 		break;
		// }

		// return app;
	}
}
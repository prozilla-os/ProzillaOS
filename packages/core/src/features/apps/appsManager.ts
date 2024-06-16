import { App } from "./app";

export class AppsManager {
	static APPS: App[] = [];

	static getAppById(id: string): App | null {
		let application: App | null = null;

		this.APPS.forEach((app) => {
			if (app.id === id) {
				application = app;
				return;
			}
		});

		return application;
	}

	/**
	 * Get the app associated with a file extension
	 */
	static getAppByFileExtension(fileExtension: string): App | null {
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

	/**
	 * Returns the url of an icon inside the icons folder or the default icon of an app
	 */
	static getAppIconUrl(appId: string, iconName?: string): string {
		if (iconName == null) {
			return `/assets/apps/icons/${appId}.svg`;
		} else {
			return `/assets/apps/${appId}/icons/${iconName}.svg`;
		}
	}
}
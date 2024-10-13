import { APP_CATEGORIES } from "../../../constants/apps.const";
import { App } from "../../";
import { OptionalInterface } from "../../../types/utils";

export interface AppsConfigOptions {
	/**
	 * An array of applications
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	apps: App<any>[];
}

export class AppsConfig {
	apps: AppsConfigOptions["apps"] = [];

	static APP_ROLES = {
		FileExplorer: "file-explorer",
		Terminal: "terminal",
		TextEditor: "text-editor",
		Settings: "settings",
		MediaViewer: "media-viewer",
		Browser: "browser"
	};

	constructor(options: OptionalInterface<AppsConfigOptions> = {}) {
		const { apps } = options as AppsConfigOptions;

		if (apps != null) {
			const appIds: string[] = [];
			apps.forEach((app) => {
				if (appIds.includes(app.id))
					throw new Error(`Duplicate app ID found: ${app.id}`
						+ "\nApp IDs must be unique.");

				this.apps.push(app);
				appIds.push(app.id);
			});
		}
	}

	get installedApps() {
		return this.apps.filter((app) => app.isInstalled);
	}

	/**
	 * @param includeUninstalled Include apps that are not currently installed
	 */
	getAppById(id: string, includeUninstalled = false): App | null {
		let resultApp: App | null = null;

		this.apps.forEach((app) => {
			if (resultApp == null && app.id === id && app.isInstalled || includeUninstalled) {
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
		let resultApp: App | null = null;

		this.installedApps.forEach((app) => {
			if (resultApp == null && app.associatedExtensions?.includes(fileExtension)) {
				resultApp = app;
				return;
			}
		});

		return resultApp ?? this.getAppByRole(AppsConfig.APP_ROLES.TextEditor);
	}

	/**
	 * Get the app with a specific role
	 */
	getAppByRole(role: string): App | null {
		let resultApp: App | null = null;

		this.installedApps.forEach((app) => {
			if (resultApp == null && app.role == role) {
				resultApp = app;
				return;
			}
		});

		return resultApp;
	}

	/**
	 * Get all applications (including uninstalled apps) that belong to a category
	 */
	getAppsByCategory(category: typeof APP_CATEGORIES[number]): App[] {
		const resultApps: App[] = [];

		this.apps.forEach((app) => {
			if (app.category == category) {
				resultApps.push(app);
			}
		});

		return resultApps;
	}
}
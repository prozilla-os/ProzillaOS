import { APP_CATEGORIES } from "../../../constants/apps.const";
import { App } from "../../";
import { loadApp, type LoadAppOptions } from "../../apps/appLoader";
import { WindowProps } from "../../../components";
import { EventEmitter } from "@prozilla-os/shared";

export interface AppsConfigEvents {
	appsChange: [];
}

export interface AppsConfigOptions {
	/**
	 * An array of applications.
	 */
	apps: App<WindowProps>[];
}

export class AppsConfig extends EventEmitter<AppsConfigEvents> {
	apps: AppsConfigOptions["apps"] = [];

	static readonly APPS_CHANGE_EVENT = "appsChange";

	onAppsChange(listener: () => void) {
		this.on(AppsConfig.APPS_CHANGE_EVENT, listener);
		return () => { this.off(AppsConfig.APPS_CHANGE_EVENT, listener); };
	}

	addApp(app: App<WindowProps>) {
		const existingApp = this.getAppById(app.id, true);
		if (existingApp != null)
			throw new Error(`Duplicate app ID found: ${app.id}\nApp IDs must be unique.`);

		this.apps.push(app);
		this.emit(AppsConfig.APPS_CHANGE_EVENT);
	}

	removeApp(id: string) {
		const index = this.apps.findIndex((app) => app.id === id);
		if (index === -1)
			return false;

		this.apps.splice(index, 1);
		this.emit(AppsConfig.APPS_CHANGE_EVENT);
		return true;
	}

	async installApp(target: string, options?: LoadAppOptions) {
		const app = await loadApp(target, options);

		if (this.getAppById(app.id, true) != null)
			throw new Error(`An app with the ID "${app.id}" is already installed.`);

		this.addApp(app);
		return app;
	}

	static APP_ROLES = {
		fileExplorer: "file-explorer",
		terminal: "terminal",
		textEditor: "text-editor",
		settings: "settings",
		mediaViewer: "media-viewer",
		browser: "browser",
	};

	constructor(options: Partial<AppsConfigOptions> = {}) {
		super();
		const { apps } = options;

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
	 * @param id - The ID of the app.
	 * @param includeUninstalled - Include apps that are not currently installed.
	 */
	getAppById(id: string, includeUninstalled = false): App | null {
		let resultApp: App | null = null;

		this.apps.forEach((app: App) => {
			const includeApp = app.isInstalled || includeUninstalled;

			if (resultApp == null && app.id === id && includeApp) {
				resultApp = app;
				return;
			}
		});

		return resultApp;
	}

	/**
	 * Get the app associated with a file extension.
	 */
	getAppByFileExtension(fileExtension: string): App | null {
		let resultApp: App | null = null;

		this.installedApps.forEach((app) => {
			if (resultApp == null && app.associatedExtensions.includes(fileExtension)) {
				resultApp = app;
				return;
			}
		});

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		return resultApp ?? this.getAppByRole(AppsConfig.APP_ROLES.textEditor);
	}

	/**
	 * Get the app with a specific role.
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
	 * Get all applications (including uninstalled apps) that belong to a category.
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
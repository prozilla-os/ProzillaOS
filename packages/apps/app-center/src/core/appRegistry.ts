import { proxy, type Snapshot } from "valtio";
import { App, type AppMetadata, AppsConfig, loadApp, type LoadAppOptions, SystemManager } from "@prozilla-os/core";
import { DEFAULT_REGISTERED_APPS } from "../constants/appCenter.const";

export interface RegistryEntry extends
	Pick<App, "id" | "name" | "isInstalled">,
	Partial<Pick<App, "description" | "iconUrl" | "category">>,
	Partial<Omit<AppMetadata, "name">>
{
	packageName?: string;
	exportName?: string;
}

export type RegistryEntrySnapshot = Snapshot<RegistryEntry>;

export interface AppRegistryState {
	entries: RegistryEntry[];
}

function createEntry(app: App): RegistryEntry {
	const { id, name, description, iconUrl, category, isInstalled, metadata } = app;
	return {
		id,
		name,
		description,
		iconUrl,
		category,
		version: metadata?.version,
		author: metadata?.author,
		screenshots: metadata?.screenshots,
		website: metadata?.website,
		releaseDate: metadata?.releaseDate,
		isInstalled,
	};
}

export class AppRegistry {
	readonly systemManager: SystemManager;
	readonly appsConfig: AppsConfig;
	readonly state: AppRegistryState;
	private preInstalledIds: ReadonlySet<string>;
	private unsubscribe: (() => void) | null;

	constructor(systemManager: SystemManager, registeredApps?: Omit<RegistryEntry, "isInstalled">[]) {
		this.systemManager = systemManager;
		this.appsConfig = systemManager.appsConfig;
		this.preInstalledIds = new Set(this.appsConfig.apps.map((app) => app.id));
		this.unsubscribe = null;

		const apps = registeredApps ?? DEFAULT_REGISTERED_APPS;
		const preInstalled = this.appsConfig.apps.map((app) => {
			const appEntry = createEntry(app);
			const registeredEntry = apps.find(({ id }) => id === app.id);
			if (registeredEntry != null) {
				return {
					...appEntry,
					...registeredEntry,
					id: appEntry.id,
					name: appEntry.name,
					isInstalled: appEntry.isInstalled,
					description: registeredEntry.description ?? appEntry.description,
					version: appEntry.version ?? registeredEntry.version,
					author: appEntry.author ?? registeredEntry.author,
					screenshots: appEntry.screenshots ?? registeredEntry.screenshots,
					website: appEntry.website ?? registeredEntry.website,
					releaseDate: appEntry.releaseDate ?? registeredEntry.releaseDate,
				};
			}
			return appEntry;
		});
		const mergedIds = new Set(preInstalled.map(({ id }) => id));

		const entries: RegistryEntry[] = [
			...preInstalled,
			...apps
				.filter(({ id }) => !mergedIds.has(id))
				.map((entry) => ({ ...entry, isInstalled: false })),
		];

		this.state = proxy<AppRegistryState>({ entries });

		this.unsubscribe = this.appsConfig.onAppsChange(() => {
			this.sync();
		});
	}

	private sync() {
		const syncedFromConfig = new Set<string>();

		for (const app of this.appsConfig.apps) {
			const index = this.state.entries.findIndex(({ id }) => id === app.id);
			if (index !== -1) {
				this.state.entries[index].isInstalled = app.isInstalled;
			} else {
				this.state.entries.push(createEntry(app));
			}
			syncedFromConfig.add(app.id);
		}

		for (let index = this.state.entries.length - 1; index >= 0; index--) {
			const entry = this.state.entries[index];
			if (this.preInstalledIds.has(entry.id) && !syncedFromConfig.has(entry.id))
				this.state.entries.splice(index, 1);
		}
	}

	getById(id: string) {
		return this.state.entries.find(({ id: entryId }) => entryId === id);
	}

	/**
	 * Install an app. If an entry with ID {@link target} already exists,
	 * the stored {@link RegistryEntry.packageName} is used as the load source.
	 * Otherwise {@link target} is passed directly to {@link loadApp}.
	 * @param target - The app ID for looking up an existing entry, or the npm package name / URL to load from.
	 * @returns The registry entry for the installed app.
	 */
	async installApp(target: string, options?: LoadAppOptions) {
		const existingEntry = this.getById(target);
		if (existingEntry != null) {
			if (existingEntry.isInstalled)
				throw new Error(`App "${target}" is already installed.`);

			if (this.preInstalledIds.has(target)) {
				this.appsConfig.getAppById(target, true)?.setInstalled(true);
				this.appsConfig.emit(AppsConfig.APPS_CHANGE_EVENT);
			} else {
				const source = existingEntry.packageName ?? target;
				const exportName = existingEntry.exportName;
				const app = await loadApp(source, { exportName, ...options });

				app.setInstalled(true);
				this.appsConfig.addApp(app, this.systemManager);
				Object.assign(existingEntry, createEntry(app), {
					packageName: source,
					exportName: options?.exportName ?? exportName,
				});
			}

			existingEntry.isInstalled = true;
			return existingEntry;
		}

		const app = await loadApp(target, options);

		app.setInstalled(true);
		const entry = createEntry(app);
		entry.packageName = target;
		entry.exportName = options?.exportName;
		this.state.entries.push(entry);
		this.appsConfig.addApp(app, this.systemManager);
		return entry;
	}

	uninstallApp(id: string) {
		const entry = this.getById(id);
		if (entry == null || !entry.isInstalled)
			return false;

		entry.isInstalled = false;

		const app = this.appsConfig.getAppById(id, true);
		if (app == null)
			return true;

		if (this.preInstalledIds.has(id)) {
			app.setInstalled(false);
			this.appsConfig.emit(AppsConfig.APPS_CHANGE_EVENT);
		} else {
			this.appsConfig.removeApp(id);
		}

		return true;
	}

	destroy() {
		this.unsubscribe?.();
	}
}

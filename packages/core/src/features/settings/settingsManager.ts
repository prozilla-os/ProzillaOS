import { VirtualRoot } from "../virtual-drive/root/virtualRoot";
import { Settings } from "./settings";

export class SettingsManager {
	/**
	 * @deprecated - Use constants from {@link Settings} instead.
	 */
	static VIRTUAL_PATHS: { [s: string]: string; } = {
		desktop: "~/.config/desktop.xml",
		taskbar: "~/.config/taskbar.xml",
		apps: "~/.config/apps.xml",
		theme: "~/.config/theme.xml",
		virtualDrive: "~/.config/virtual-drive.xml",
	} as const;

	#pathToSettings: { [s: string]: Settings; } = {};

	#virtualRoot: VirtualRoot | null = null;

	constructor(virtualRoot: VirtualRoot) {
		this.#virtualRoot = virtualRoot;

		const root = this.#virtualRoot;
		Object.values(SettingsManager.VIRTUAL_PATHS).forEach((path) => {
			this.#pathToSettings[path] = new Settings(root, path);
		});
	}

	getSettings(path: string): Settings {
		return this.#pathToSettings[path];
	}
}
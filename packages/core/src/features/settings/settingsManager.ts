import { VirtualRoot } from "../virtual-drive/root/virtualRoot";
import { Settings } from "./settings";

export class SettingsManager {
	static VIRTUAL_PATHS: { [s: string]: string; } = {
		desktop: "~/.config/desktop.xml",
		taskbar: "~/.config/taskbar.xml",
		apps: "~/.config/apps.xml",
		theme: "~/.config/theme.xml",
	} as const;

	#pathToSettings: { [s: string]: Settings; } = {};

	#virtualRoot: VirtualRoot | null = null;

	constructor(virtualRoot: VirtualRoot) {
		this.#virtualRoot = virtualRoot;

		if (this.#virtualRoot == null) {
			throw new Error("SettingsManager is missing VirtualRoot"); // Why does this sound so sad :'(
		} else {
			Object.values(SettingsManager.VIRTUAL_PATHS).forEach((path) => {
				this.#pathToSettings[path] = new Settings(this.#virtualRoot as VirtualRoot, path);
			});
		}
	}

	getSettings(path: string): Settings {
		return this.#pathToSettings[path];
	}
}
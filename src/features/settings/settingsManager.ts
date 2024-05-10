import { VirtualRoot } from "../virtual-drive/root/virtualRoot";
import { Settings } from "./settings";

export class SettingsManager {
	static VIRTUAL_PATHS: { [s: string]: string; } = {
		desktop: "~/.config/desktop.xml",
		taskbar: "~/.config/taskbar.xml",
		apps: "~/.config/apps.xml",
		theme: "~/.config/theme.xml"
	};

	#pathToSettings: { [s: string]: Settings; } = {};

	#virtualRoot: VirtualRoot = null;

	constructor(virtualRoot: VirtualRoot) {
		this.#virtualRoot = virtualRoot;

		Object.values(SettingsManager.VIRTUAL_PATHS).forEach((path) => {
			this.#pathToSettings[path] = new Settings(this.#virtualRoot, path);
		});
	}

	get(path: string): Settings {
		return this.#pathToSettings[path];
	}
}
import { VirtualRoot } from "../virtual-drive/virtualRoot.js";
import { Settings } from "./settings.js";

export class SettingsManager {
	/**
	 * @type {Object<string, string>}
	 */
	static VIRTUAL_PATHS = {
		"desktop": "~/.config/desktop.xml"
	};

	/**
	 * @type {Object<string, Settings>}
	 */
	#pathToSettings = {};

	/**
	 * @type {VirtualRoot}
	 */
	#virtualRoot = null;

	/**
	 * @param {VirtualRoot} virtualRoot 
	 */
	constructor(virtualRoot) {
		this.#virtualRoot = virtualRoot;

		Object.values(SettingsManager.VIRTUAL_PATHS).forEach((path) => {
			this.#pathToSettings[path] = new Settings(this.#virtualRoot, path);
		});
	}

	/**
	 * @param {string} path 
	 * @returns {Settings}
	 */
	get(path) {
		return this.#pathToSettings[path];
	}
}
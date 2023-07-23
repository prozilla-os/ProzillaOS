// eslint-disable-next-line no-unused-vars
import { VirtualFile } from "./virtual-file.js";
import { VirtualFolder } from "./virtual-folder.js";

/**
 * A virtual folder that serves as the root folder
 */
export class VirtualRoot extends VirtualFolder {
	constructor() {
		super("root");
		this.root = this;
		this.shortcuts = {};
	}

	/**
	 * Adds a shortcut to a file or folder
	 * @param {String} name 
	 * @param {VirtualFile|VirtualFolder} destination 
	 * @returns {VirtualRoot}
	 */
	addShortcut(name, destination) {
		this.shortcuts[name] = destination;
		return this;
	}

	get path() {
		return "";
	}
}
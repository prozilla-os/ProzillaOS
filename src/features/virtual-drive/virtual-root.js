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

	addShortcut(name, destination) {
		this.shortcuts[name] = destination;
		return this;
	}

	get path() {
		return "";
	}
}
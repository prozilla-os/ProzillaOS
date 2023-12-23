import { APPS } from "../../../config/apps.config.js";
import AppsManager from "../../apps/appsManager.js";
import { VirtualFolder } from "./virtualFolder.js";

/**
 * A link that points to a virtual folder
 */
export class VirtualFolderLink extends VirtualFolder {
	/**
	 * @param {string} name
	 * @param {VirtualFolder} linkedFolder
	 */
	constructor(name, linkedFolder) {
		super(name);
		this.linkedFolder = linkedFolder;
	}

	/**
	 * @param {VirtualFolder} folder
	 * @returns {VirtualFolderLink}
	 */
	setLinkedFolder(folder) {
		this.linkedFolder = folder;

		if (folder) {
			this.linkedPath = folder.path;
			this.type = folder.type;
		}

		return this;
	}

	/**
	 * @param {string} path
	 * @returns {VirtualFolderLink}
	 */
	setLinkedPath(path) {
		if (this.linkedFolder && this.linkedFolder.path === path)
			return;

		const target = this.navigate(path);

		if (target instanceof VirtualFolder) {
			this.setLinkedFolder(target);
		} else {
			this.linkedFolder = null;
		}

		return this;
	}

	/**
	 * @returns {boolean}
	 */
	isValid() {
		if (!this.linkedPath)
			return false;

		this.setLinkedPath(this.linkedPath);

		return (this.linkedFolder != null);
	}

	/**
	 * @returns {string}
	 */
	getIconUrl() {
		if (this.iconUrl != null)
			return this.iconUrl;

		return AppsManager.getAppIconUrl(APPS.FILE_EXPLORER, "folder-link");
	}

	/**
	 * @returns {object | null}
	 */
	toJSON() {
		if (this.linkedPath == null)
			return;

		const object = {
			nam: this.name,
			lnk: this.linkedPath
		};

		return object;
	}

	// Point certain methods to linked folder

	/** @type {VirtualFolder["setAlias"]} */
	setAlias(...args) {
		if (this.isValid()) return this.linkedFolder.setAlias(...args);
	}

	/** @type {VirtualFolder["hasFile"]} */
	hasFile(...args) {
		if (this.isValid()) return this.linkedFolder.hasFile(...args);
	}

	/** @type {VirtualFolder["hasFolder"]} */
	hasFolder(...args) {
		if (this.isValid()) return this.linkedFolder.hasFolder(...args);
	}

	/** @type {VirtualFolder["findFile"]} */
	findFile(...args) {
		if (this.isValid()) return this.linkedFolder.findFile(...args);
	}

	/** @type {VirtualFolder["findSubFolder"]} */
	findSubFolder(...args) {
		if (this.isValid()) return this.linkedFolder.findSubFolder(...args);
	}

	/** @type {VirtualFolder["createFile"]} */
	createFile(...args) {
		if (this.isValid()) return this.linkedFolder.createFile(...args);
	}

	/** @type {VirtualFolder["createFile"]} */
	createFiles(...args) {
		if (this.isValid()) return this.linkedFolder.createFiles(...args);
	}

	/** @type {VirtualFolder["createFolder"]} */
	createFolder(...args) {
		if (this.isValid()) return this.linkedFolder.createFolder(...args);
	}

	/** @type {VirtualFolder["createFolders"]} */
	createFolders(...args) {
		if (this.isValid()) return this.linkedFolder.createFolders(...args);
	}

	/** @type {VirtualFolder["getFiles"]} */
	getFiles(...args) {
		if (this.isValid()) return this.linkedFolder.getFiles(...args);
	}

	/** @type {VirtualFolder["getSubFolders"]} */
	getSubFolders(...args) {
		if (this.isValid()) return this.linkedFolder.getSubFolders(...args);
	}

	/** @type {VirtualFolder["open"]} */
	open(...args) {
		if (this.isValid()) return this.linkedFolder.open(...args);
	}

	/** @type {VirtualFolder["getItemCount"]} */
	getItemCount(...args) {
		if (this.isValid()) return this.linkedFolder.getItemCount(...args);
	}
}
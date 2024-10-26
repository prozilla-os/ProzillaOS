import { StorageManager } from "../../storage/storageManager";
import { VirtualFolderLink, VirtualFolderLinkJson } from "../folder/virtualFolderLink";
import { loadDefaultData } from "./defaultData";
import { VirtualFileJson } from "../file/virtualFile";
import { VirtualFolder } from "../folder";
import { VirtualFileLinkJson } from "../file/virtualFileLink";
import { VirtualFolderJson } from "../folder/virtualFolder";
import { VirtualFile, VirtualFileLink } from "../file";
import { SystemManager } from "../../system/systemManager";

export interface VirtualRootJson extends VirtualFolderJson {
	scs: Record<string, string>;
}

/**
 * A virtual folder that serves as the root folder
 */
export class VirtualRoot extends VirtualFolder {
	shortcuts: Record<string, VirtualFile | VirtualFileLink | VirtualFolder | VirtualFolderLink>;
	initiated: boolean = false;
	loadedDefaultData: boolean = false;
	systemManager: SystemManager;

	static EVENT_NAMES = {
		error: "error",
	};

	constructor(systemManager: SystemManager) {
		super("root");
		this.root = this;
		this.systemManager = systemManager;
		this.isRoot = true;
		this.shortcuts = {};
	}

	loadDefaultData() {
		loadDefaultData(this.systemManager, this);
	}

	loadData() {
		if (!this.systemManager.virtualDriveConfig.saveData)
			return;

		const data = StorageManager.load("data");
		if (data == null)
			return;

		let object: VirtualRootJson | null = null;
		try {
			object = JSON.parse(data) as VirtualRootJson;
		} catch (error) {
			console.error(error);
		}
		if (object == null)
			return;

		const shortcuts = { ...object.scs } as Record<string, string>;

		const addFile = ({
			nam: name,
			ext: extension,
			src: source,
			cnt: content,
			lnk: link,
			ico: iconUrl,
		}: VirtualFileJson & VirtualFileLinkJson, parent: VirtualFolder = this) => {
			if (link) {
				parent.createFileLink(name, (fileLink) => {
					(fileLink as VirtualFileLink).setLinkedPath(link);
					if (iconUrl != null) {
						fileLink.setIconUrl(iconUrl);
					}
				});
				return;
			}
			
			parent.createFile(name, extension, (file: VirtualFile) => {
				if (source != null) {
					file.setSource(source);
				} else if (content != null) {
					file.setContent(content);
				}
				if (iconUrl != null) {
					file.setIconUrl(iconUrl);
				}
			});
		};

		const addFolder = ({
			nam: name,
			fds: folders,
			fls: files,
			lnk: link,
			ico: iconUrl,
		}: VirtualFolderJson & VirtualFolderLinkJson, parent: VirtualFolder = this) => {
			if (link) {
				parent.createFolderLink(name, (folderLink) => {
					(folderLink as VirtualFolderLink).setLinkedPath(link);
					if (iconUrl != null) {
						folderLink.setIconUrl(iconUrl);
					}
				});
				return;
			}

			parent.createFolder(name, (folder: VirtualFolder) => {
				if (Object.values(shortcuts).includes(folder.displayPath)) {
					let alias: string | null = null;
					for (const [key, value] of Object.entries(shortcuts)) {
						if (value === folder.displayPath)
							alias = key;
					}
					if (alias != null) folder.setAlias(alias);
				}
				if (folders != null) {
					folders.forEach((subFolder) => {
						addFolder(subFolder as VirtualFolderJson & VirtualFolderLinkJson, folder);
					});
				}
				if (files != null) {
					files.forEach((file) => {
						addFile(file as VirtualFileJson & VirtualFileLinkJson, folder);
					});
				}
				if (iconUrl != null) {
					folder.setIconUrl(iconUrl);
				}
			});
		};

		if (object.fds != null) {
			object.fds.forEach((subFolder) => {
				addFolder(subFolder as VirtualFolderJson & VirtualFolderLinkJson);
			});
		}
		if (object.fls != null) {
			object.fls.forEach((file) => {
				addFile(file as VirtualFileJson & VirtualFileLinkJson);
			});
		}
	}

	/**
	 * Calls the storage manager's store function with this root's data as a string
	 */
	saveData() {
		if (!this.initiated || !this.systemManager.virtualDriveConfig.saveData)
			return;

		const data = this.toString();

		if (data == null)
			return;

		try {
			StorageManager.store("data", data);
		} catch (error) {
			console.error(error);
			this.emit(VirtualRoot.EVENT_NAMES.error, {
				message: "Failed to save data",
			});
		}
	}

	/**
	 * Initiates this root by loading the default data and then the user's data on top
	 */
	init(): VirtualRoot {
		this.initiated = false;

		// Load default data
		this.loadedDefaultData = false;
		this.setAlias("/");
		this.loadDefaultData();
		this.loadedDefaultData = true;

		// Load user's data
		this.loadData();
		this.initiated = true;

		return this;
	}

	/**
	 * Adds a shortcut to a file or folder
	 */
	addShortcut(name: string, destination: VirtualFile | VirtualFileLink | VirtualFolder | VirtualFolderLink) {
		this.shortcuts[name] = destination;
		return this;
	}

	/**
	 * Tells the storage manager to clear all data and reloads the window
	 */
	reset() {
		if (window.confirm("Are you sure you want to reset all your data?")) {
			StorageManager.clear();
			window.location.reload();
		}
	}

	static isValidName(_name: string) {
		// TO DO
	}

	static isValidFileName(_name: string) {
		// TO DO
	}

	static isValidFolderName(_name: string) {
		// TO DO
	}

	get path() {
		return "";
	}

	get displayPath() {
		return "/";
	}

	toJSON(): VirtualRootJson | null {
		const object = super.toJSON() as VirtualRootJson;

		if (object == null)
			return null;

		if (Object.entries(this.shortcuts).length > 0) {
			object.scs = {};

			for (const [key, value] of Object.entries(this.shortcuts)) {
				if (!value.root)
					object.scs[key] = value.absolutePath;
			}
		}

		return object;
	}

	toString(): string | null {
		const json = this.toJSON();

		if (json == null)
			return null;

		return JSON.stringify(json);
	}
}
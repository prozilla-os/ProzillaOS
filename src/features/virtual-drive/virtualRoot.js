import { APPS } from "../../constants/applications.js";
import { WALLPAPERS } from "../../constants/desktop.js";
import AppsManager from "../applications/applications.js";
import { StorageManager } from "../storage/storageManager.js";
import { VirtualFolderLink } from "./VirtualFolderLink.js";
import { VirtualFile } from "./virtualFile.js";
import { VirtualFolder } from "./virtualFolder.js";

/**
 * A virtual folder that serves as the root folder
 */
export class VirtualRoot extends VirtualFolder {
	/** @type {boolean} */
	initiated = false;

	/** @type {boolean} */
	loadedDefaultData = false;

	constructor() {
		super("root");
		this.root = this;
		this.isRoot = true;
		this.shortcuts = {};
	}

	loadDefaultData() {
		this.createFolder("bin", (folder) => {
			folder.createFiles([
				{ name: "echo" },
				{ name: "cd" },
				{ name: "ls" },
				{ name: "clear" },
			]);
		});

		this.createFolder("dev", (folder) => {
			folder.createFiles([
				{ name: "null" },
				{ name: "zero" },
				{ name: "random" },
			]);
		});

		this.createFolder("etc");

		this.createFolder("usr", (folder) => {
			folder.createFolders(["bin", "sbin", "lib", "share"]);
		});

		const linkedPaths = {};
			
		this.createFolder("home", (folder) => {
			folder.createFolder("prozilla-os", (folder) => {
				folder.setAlias("~")
					.createFolder(".config", (folder) => {
						folder.createFile("desktop", "xml", (file) => {
							file.setSource("/config/desktop.xml");
						}).createFile("taskbar", "xml", (file) => {
							file.setSource("/config/taskbar.xml");
						});
					})
					.createFolder("Images", (folder) => {
						folder.setIconUrl(AppsManager.getAppIconUrl(APPS.FILE_EXPLORER, "folder-images"));
						folder.createFolder("Wallpapers", (folder) => {
							folder.setProtected(true);
							for (let i = 0; i < WALLPAPERS.length; i++) {
								const source = WALLPAPERS[i];
								folder.createFile(`Wallpaper${i + 1}`, "png", (file) => {
									file.setSource(source);
								});
							}
						}).createFile("ProzillaOS", "png", (file) => {
							file.setSource("/media/banner-logo-title.png");
						});
						linkedPaths.images = folder.path;
					})
					.createFolder("Documents", (folder) => {
						folder.setIconUrl(AppsManager.getAppIconUrl(APPS.FILE_EXPLORER, "folder-text"));
						folder.createFile("text", "txt", (file) => {
							file.setContent("Hello world!");
						}).createFile("info", "md", (file) => {
							file.setProtected(true)
								.setSource("/documents/info.md")
								.setIconUrl(AppsManager.getAppIconUrl(APPS.FILE_EXPLORER, "file-info"));
							linkedPaths.info = file.path;
						});
						linkedPaths.documents = folder.path;
					})
					.createFolder("Desktop", (folder) => {
						folder.createFileLink("info.md", (fileLink) => {
							fileLink.setLinkedPath(linkedPaths.info);
						}).createFolderLink("Images", (folderLink) => {
							folderLink.setLinkedPath(linkedPaths.images);
						}).createFolderLink("Documents", (folderLink) => {
							folderLink.setLinkedPath(linkedPaths.documents);
						});
					});
			});
		});

		this.createFolder("lib");
		this.createFolder("sbin");
		this.createFolder("tmp");
		this.createFolder("var");
		this.createFolder("boot");

		this.createFolder("proc", (folder) => {
			folder.createFiles([
				{ name: "cpuinfo" },
				{ name: "meminfo" },
			]);
		});

		this.createFolder("var");
		this.createFolder("opt");
		this.createFolder("media");
		this.createFolder("mnt");
		this.createFolder("srv");
	}

	loadData() {
		const data = StorageManager.load("data");
		if (data == null)
			return;

		let object;
		try {
			object = JSON.parse(data);
		} catch (error) {
			console.error(error);
		}
		if (object == null)
			return;

		const shortcuts = {...object.scs};

		const addFile = ({
			nam: name,
			ext: extension,
			src: source,
			cnt: content,
			lnk: link,
			ico: iconUrl,
		}, parent = this) => {
			if (link) {
				parent.createFileLink(name, (fileLink) => {
					fileLink.setLinkedPath(link);
					if (iconUrl != null) {
						fileLink.setIconUrl(iconUrl);
					}
				});
				return;
			}
			
			parent.createFile(name, extension, (file) => {
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
		}, parent = this) => {
			if (link) {
				parent.createFolderLink(name, (folderLink) => {
					folderLink.setLinkedPath(link);
					if (iconUrl != null) {
						folderLink.setIconUrl(iconUrl);
					}
				});
				return;
			}

			parent.createFolder(name, (folder) => {
				if (Object.values(shortcuts).includes(folder.displayPath)) {
					let alias;
					for (const [key, value] of Object.entries(shortcuts)) {
						if (value === folder.displayPath)
							alias = key;
					}
					folder.setAlias(alias);
				}
				if (folders != null) {
					folders.forEach((subFolder) => {
						addFolder(subFolder, folder);
					});
				}
				if (files != null) {
					files.forEach((file) => {
						addFile(file, folder);
					});
				}
				if (iconUrl != null) {
					folder.setIconUrl(iconUrl);
				}
			});
		};

		if (object.fds != null) {
			object.fds.forEach((subFolder) => {
				addFolder(subFolder);
			});
		}
		if (object.fls != null) {
			object.fls.forEach((file) => {
				addFile(file);
			});
		}
	}

	/**
	 * Calls the storage manager's store function with this root's data as a string
	 */
	saveData() {
		if (!this.initiated)
			return;

		const data = this.toString();

		if (data == null)
			return;

		StorageManager.store("data", data);
	}

	/**
	 * Initiates this root by loading the default data and then the user's data on top
	 * @returns {VirtualRoot}
	 */
	init() {
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
	 * @param {string} name 
	 * @param {VirtualFile | VirtualFolder | VirtualFolderLink} destination 
	 * @returns {VirtualRoot}
	 */
	addShortcut(name, destination) {
		this.shortcuts[name] = destination;
		return this;
	}

	/**
	 * Tells the storage manager to clear all data and reloads the window
	 */
	reset() {
		if (window.confirm("Are you sure you want to reset all your data?")) {
			StorageManager.clear();
			window.location.reload(false);
		}
	}

	static isValidName(name) {
		// TO DO
	}

	static isValidFileName(name) {
		// TO DO
	}

	static isValidFolderName(name) {
		// TO DO
	}

	get path() {
		return "";
	}

	get displayPath() {
		return "/";
	}

	/**
	 * @returns {object | null}
	 */
	toJSON() {
		const object = super.toJSON();

		if (object == null)
			return null;

		if (Object.entries(this.shortcuts).length > 0) {
			object.scs = {};

			for (const [key, value] of Object.entries(this.shortcuts)) {
				object.scs[key] = value.absolutePath;
			}
		}

		return object;
	}

	/**
	 * @returns {string | null}
	 */
	toString() {
		const json = this.toJSON();

		if (json == null)
			return null;

		return JSON.stringify(json);
	}
}
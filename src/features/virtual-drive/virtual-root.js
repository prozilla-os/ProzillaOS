import { StorageManager } from "../storage/storage.js";
import { VirtualFile } from "./virtual-file.js";
import { VirtualFolder } from "./virtual-folder.js";

export const WALLPAPER_COUNT = 6;

/**
 * A virtual folder that serves as the root folder
 */
export class VirtualRoot extends VirtualFolder {
	/**
	 * @type {boolean}
	 */
	initiated = false;

	constructor() {
		super("root");
		this.root = this;
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
			

		this.createFolder("home", (folder) => {
			folder.createFolder("prozilla-os", (folder) => {
				folder.setAlias("~")
					.createFolder(".config", (folder) => {
						folder.createFile("desktop", "xml", (file) => {
							file.setSource("/config/desktop.xml");
						});
					})
					.createFolder("Images", (folder) => {
						for (let i = 0; i < WALLPAPER_COUNT; i++) {
							folder.createFile(`Wallpaper${i + 1}`, "png", (file) => {
								file.setSource(`/media/wallpapers/Wallpaper${i + 1}.png`);
							});
						}
					})
					.createFolder("Documents", (folder) => {
						folder.createFile("text", "txt", (file) => {
							file.setContent("Hello world!");
						}).createFile("info", "md", (file) => {
							file.setSource("/documents/info.md");
						});
					})
					.createFolder("Desktop");
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
		let data = StorageManager.load("data");
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

		const addFile = ({ nam: name, ext: extension, src: source, cnt: content }, parent = this) => {
			parent.createFile(name, extension, (file) => {
				if (source != null) {
					file.setSource(source);
				} else if (content != null) {
					file.setContent(content);
				}
			});
		};

		const addFolder = ({ nam: name, fds: folders, fls: files }, parent = this) => {
			parent.createFolder(name, (folder) => {
				if (Object.values(shortcuts).includes(folder.absolutePath)) {
					let alias;
					for (const [key, value] of Object.entries(shortcuts)) {
						if (value === folder.absolutePath)
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

		console.log(this);
	}

	saveData() {
		if (!this.initiated)
			return;

		StorageManager.store("data", this.toString());
	}

	init() {
		this.initiated = false;
		this.setAlias("/");
		this.loadDefaultData();
		this.loadData();
		this.initiated = true;
		return this;
	}

	/**
	 * Adds a shortcut to a file or folder
	 * @param {string} name 
	 * @param {VirtualFile|VirtualFolder} destination 
	 * @returns {VirtualRoot}
	 */
	addShortcut(name, destination) {
		this.shortcuts[name] = destination;
		return this;
	}

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

	get absolutePath() {
		return "/";
	}

	toJSON() {
		const object = super.toJSON();

		if (Object.entries(this.shortcuts).length > 0) {
			object.scs = {};

			for (const [key, value] of Object.entries(this.shortcuts)) {
				object.scs[key] = value.absolutePath;
			}
		}

		return object;
	}

	toString() {
		const json = this.toJSON();
		return JSON.stringify(json);
	}
}
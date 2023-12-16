import { APPS } from "../../constants/applications.js";
import AppsManager from "../applications/applications.js";
import { removeFromArray } from "../utils/array.js";
import WindowsManager from "../windows/windows.js";
import { VirtualFileLink } from "./VirtualFileLink.js";
import { VirtualFolderLink } from "./VirtualFolderLink.js";
import { VirtualBase } from "./virtualBase.js";
import { VirtualFile } from "./virtualFile.js";

/**
 * A virtual folder that can contains files and sub-folders
 */
export class VirtualFolder extends VirtualBase {
	static TYPE = {
		GENERAL: 0,
		MEDIA: 1,
	};
	
	/**
	 * @param {string} name
	 * @param {number} type 
	 */
	constructor(name, type) {
		super(name);
		this.subFolders = [];
		this.files = [];
		this.type = type ?? VirtualFolder.TYPE.GENERAL;
	}

	/**
	 * @param {string} alias
	 * @returns {ThisType}
	 */
	setAlias(alias) {
		return super.setAlias(alias);
	}

	/**
	 * Returns true if this folder contains a file matching a name and extension
	 * @param {string} name 
	 * @param {string} extension 
	 * @returns {ThisType}
	 */
	hasFile(name, extension) {
		return this.findFile(name, extension) !== null;
	}

	/**
	 * Returns true if this folder contains a folder matching a name
	 * @param {string} name 
	 * @returns {boolean}
	 */
	hasFolder(name) {
		return this.findSubFolder(name) !== null;
	}

	/**
	 * Finds and returns a file inside this folder matching a name and extension
	 * @param {string} name 
	 * @param {string} extension 
	 * @returns {VirtualFile}
	 */
	findFile(name, extension) {
		let resultFile = null;

		this.files.forEach((file) => {
			const matchingName = (file.name === name || (file.alias && file.alias === name));
			const matchingExtension = (extension == null || file.extension === extension);
			if (matchingName && matchingExtension) {
				return resultFile = file;
			}
		});

		return resultFile;
	}

	/**
	 * Finds and returns a folder inside this folder matching a name
	 * @param {string} name 
	 * @returns {VirtualFolder}
	 */
	findSubFolder(name) {
		let resultFolder = null;

		this.subFolders.forEach((folder) => {
			if (folder.name === name || (folder.alias && folder.alias === name)) {
				return resultFolder = folder;
			}
		});

		return resultFolder;
	}

	/**
	 * @callback createFileCallback
	 * @param {VirtualFile} newFile
	 */

	/**
	 * Creates a file with a name and extension
	 * @param {string} name 
	 * @param {string} extension 
	 * @param {createFileCallback} callback
	 * @returns {VirtualFolder}
	 */
	createFile(name, extension, callback) {
		if (!this.canBeEdited)
			return;

		let newFile = this.findFile(name, extension);
		if (newFile == null) {
			newFile = new VirtualFile(name, extension);
			this.files.push(newFile);
			newFile.parent = this;
		}
		callback?.(newFile);

		newFile.confirmChanges();
		return this;
	}

	/**
	 * Creates files based on an array of objects with file names and extensions
	 * @param {object[]} files 	
	 * @param {string} files.name
	 * @param {string} files.extension
	 * @returns {VirtualFolder} 
	 */
	createFiles(files) {
		if (!this.canBeEdited)
			return;

		files.forEach(({name, extension}) => {
			this.createFile(name, extension);
		});

		this.confirmChanges();
		return this;
	}

	/**
	 * @callback createFileLinkCallback
	 * @param {VirtualFileLink} newFileLink
	 */

	/**
	 * Creates a file link with a name
	 * @param {string} name 
	 * @param {createFileLinkCallback} callback
	 * @returns {VirtualFolder}
	 */
	createFileLink(name, callback) {
		if (!this.canBeEdited)
			return;

		let newFile = this.findFile(name);
		if (newFile == null) {
			newFile = new VirtualFileLink(name);
			this.files.push(newFile);
			newFile.parent = this;
		}
		callback?.(newFile);

		newFile.confirmChanges();
		return this;
	}

	/**
	 * Creates files based on an array of objects with file names and extensions
	 * @param {object[]} files 	
	 * @param {string} files.name
	 * @returns {VirtualFolder} 
	 */
	createFileLinks(files) {
		if (!this.canBeEdited)
			return;

		files.forEach(({ name }) => {
			this.createFileLink(name);
		});

		this.confirmChanges();
		return this;
	}

	/**
	 * @callback createFolderCallback
	 * @param {VirtualFolder} newFolder
	 */

	/**
	 * Creates a folder with a name
	 * @param {string} name 
	 * @param {createFolderCallback} callback
	 * @returns {VirtualFolder}
	 */
	createFolder(name, callback) {
		if (!this.canBeEdited)
			return;

		let newFolder = this.findSubFolder(name);
		if (newFolder == null) {
			newFolder = new VirtualFolder(name);
			this.subFolders.push(newFolder);
			newFolder.parent = this;
		}
		callback?.(newFolder);
		
		newFolder.confirmChanges();
		return this;
	}

	/**
	 * Creates folders based on an array of folder names
	 * @param {string[]} names 
	 * @returns {VirtualFolder}
	 */
	createFolders(names) {
		if (!this.canBeEdited)
			return;

		names.forEach((name) => {
			this.createFolder(name);
		});

		this.confirmChanges();
		return this;
	}

	/**
	 * @callback createFolderLinkCallback
	 * @param {VirtualFolderLink} newFolderLink
	 */

	/**
	 * Creates a folder link with a name
	 * @param {string} name 
	 * @param {createFolderLinkCallback} callback
	 * @returns {VirtualFolderLink}
	 */
	createFolderLink(name, callback) {
		if (!this.canBeEdited)
			return;

		let newFolder = this.findSubFolder(name);
		if (newFolder == null) {
			newFolder = new VirtualFolderLink(name);
			this.subFolders.push(newFolder);
			newFolder.parent = this;
		}
		callback?.(newFolder);
		
		newFolder.confirmChanges();
		return this;
	}

	/**
	 * Creates folder links based on an array of folder names
	 * @param {string[]} names 
	 * @returns {VirtualFolder}
	 */
	createFolderLinks(names) {
		if (!this.canBeEdited)
			return;

		names.forEach((name) => {
			this.createFolder(name);
		});

		this.confirmChanges();
		return this;
	}

	/**
	 * Removes a file or folder from this folder
	 * @param {VirtualFile | VirtualFolder | VirtualFolderLink} child 
	 */
	remove(child) {
		if (!this.canBeEdited)
			return;

		child.parent = null;

		if (child.isFile()) {
			removeFromArray(child, this.files);
		} else if (child.isFolder()) {
			removeFromArray(child, this.subFolders);
		}

		child.confirmChanges();
	}

	/**
	 * Returns the file or folder at a relative path or null if it doesn't exist
	 * @param {string} relativePath 
	 * @returns {VirtualFile | VirtualFolder | null}
	 */
	navigate(relativePath) {
		const segments = relativePath.split("/");
		let currentDirectory = this;

		const getDirectory = (path, isStart) => {
			if (isStart && path === "") {
				return this.getRoot();
			} else if (isStart && Object.keys(this.getRoot().shortcuts).includes(path)) {
				return this.getRoot().shortcuts[path];
			} else if (path === ".") {
				return this;
			} else if (path === "..") {
				return currentDirectory?.parent;
			} else {
				return currentDirectory?.findSubFolder(path);
			}
		};

		if (segments.length === 1) {
			const directory = getDirectory(segments[0], true);
			if (directory !== null)
				return directory;
		}

		for (let i = 0; i < segments.length - 1; i++) {
			const segment = segments[i];
			currentDirectory = getDirectory(segment, i === 0);
		}

		const lastSegment = segments[segments.length - 1];

		if (lastSegment === "") {
			return currentDirectory;
		} else if (currentDirectory != null) {
			const folder = currentDirectory.findSubFolder(lastSegment);

			if (folder != null)
				return folder;

			// To do: add support for file names with dots
			const [name, extension] = lastSegment.split(".");
			return currentDirectory.findFile(name, extension);
		} else {
			return null;
		}
	}

	/**
	 * Opens this folder in file explorer
	 * @param {WindowsManager} windowsManager
	 */
	open(windowsManager) {
		return windowsManager.open(APPS.FILE_EXPLORER, { startPath: this.path });
	}

	/**
	 * Deletes this folder and all its files and sub-folders recursively
	 */
	delete() {
		if (!this.canBeEdited)
			return;

		super.delete();

		this.files.concat(this.subFolders).forEach((item) => {
			item.delete();
		});

		this.confirmChanges();
	}

	/**
	 * Returns all files inside this folder
	 * @param {Boolean=false} showHidden 
	 * @returns {VirtualFile[]}
	 */
	getFiles(showHidden = false) {
		if (showHidden)
			return this.files;

		return this.files.filter(({ name }) => 
			!name.startsWith(".")
		);
	}

	/**
	 * Returns all sub-folders inside this folder
	 * @param {Boolean=false} showHidden 
	 * @returns {VirtualFolder[]}
	 */
	getSubFolders(showHidden = false) {
		if (showHidden)
			return this.subFolders;

		return this.subFolders.filter(({ name }) => 
			!name.startsWith(".")
		);
	}

	/**
	 * Returns the amount of files and  sub-folders inside this folder
	 * @param {Boolean=false} showHidden 
	 * @returns {number}
	 */
	getItemCount(showHidden = false) {
		const filesCount = this.getFiles(showHidden)?.length ?? 0;
		const foldersCount = this.getSubFolders(showHidden)?.length ?? 0;

		return filesCount + foldersCount;
	}

	/**
	 * @returns {boolean}
	 */
	isFolder() {
		return true;
	}

	/**
	 * @returns {string}
	 */
	getIconUrl() {
		if (this.iconUrl != null)
			return this.iconUrl;

		return AppsManager.getAppIconUrl(APPS.FILE_EXPLORER, "folder");
	}

	/**
	 * @returns {object | null}
	 */
	toJSON() {
		const object = super.toJSON();

		if (object == null)
			return null;

		if (this.files.length > 0) {
			const files = this.files
				.map((file) => file.toJSON())
				.filter((file) => file != null);

			if (files.length > 0)
				object.fls = files;
		}
		if (this.subFolders.length > 0) {
			const folders = this.subFolders
				.map((folder) => folder.toJSON())
				.filter((folder) => folder != null);

			if (folders.length > 0)
				object.fds = folders;
		}

		// Don't store folder if it's empty and untouched
		if (!this.editedByUser && (!object.fls || object.fls.length === 0) && (!object.fds || object.fds.length === 0))
			return null;

		return object;
	}
}
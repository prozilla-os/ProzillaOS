import { removeFromArray } from "../utils/array.js";
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
	 * @returns {VirtualFolder}
	 */
	setAlias(alias) {
		return super.setAlias(alias);
	}

	/**
	 * Returns true if this folder contains a file matching a name and extension
	 * @param {string} name 
	 * @param {string} extension 
	 * @returns {VirtualFile}
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
			if ((file.name === name || (file.alias && file.alias === name)) && file.extension === extension) {
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
	 * @callback createFolderCallback
	 * @param {VirtualFolder} newFolder
	 */

	/**
	 * Creates a folder with a name
	 * @param {string} name 
	 * @returns {VirtualFolder}
	 * @param {createFolderCallback} callback
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
	 * @param {string[]} folders 
	 * @returns {VirtualFolder}
	 */
	createFolders(folders) {
		if (!this.canBeEdited)
			return;

		folders.forEach((name) => {
			this.createFolder(name);
		});

		this.confirmChanges();
		return this;
	}

	/**
	 * Removes a file or folder from this folder
	 * @param {VirtualFile | VirtualFolder} child 
	 */
	remove(child) {
		if (!this.canBeEdited)
			return;

		child.parent = null;

		if (child instanceof VirtualFile) {
			removeFromArray(child, this.files);
		} else if (child instanceof VirtualFolder) {
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
	 * @returns {Array<VirtualFile>}
	 */
	getFiles(showHidden = false) {
		if (showHidden)
			return this.files;

		return this.files.filter(({ name }) => 
			!name.startsWith(".")
		);
	}

	/**
	 * Returns all subfolders inside this folder
	 * @param {Boolean=false} showHidden 
	 * @returns {Array<VirtualFolder>}
	 */
	getSubFolders(showHidden = false) {
		if (showHidden)
			return this.subFolders;

		return this.subFolders.filter(({ name }) => 
			!name.startsWith(".")
		);
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

		// Don't store folder if it's empty
		if ((!object.fls || object.fls.length === 0) && (!object.fds || object.fds.length === 0))
			return null;

		return object;
	}
}
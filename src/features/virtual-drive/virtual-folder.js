import { removeFromArray } from "../utils/array.js";
import { VirtualBase } from "./virtual-base.js";
import { VirtualFile } from "./virtual-file.js";

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
		const newFile = new VirtualFile(name, extension);
		this.files.push(newFile);
		newFile.parent = this;
		callback?.(newFile);
		this.getRoot().saveData();
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
		files.forEach(({name, extension}) => {
			this.createFile(name, extension);
		});
		this.getRoot().saveData();
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
		const newFolder = new VirtualFolder(name);
		this.subFolders.push(newFolder);
		newFolder.parent = this;
		callback?.(newFolder);
		this.getRoot().saveData();
		return this;
	}

	/**
	 * Creates folders based on an array of folder names
	 * @param {string[]} folders 
	 * @returns {VirtualFolder}
	 */
	createFolders(folders) {
		folders.forEach((name) => {
			this.createFolder(name);
		});
		this.getRoot().saveData();
		return this;
	}

	/**
	 * Adds a file at a destination
	 * @deprecated
	 * @param {string} destination 
	 */
	addFile(destination) {
		const folderNames = destination.split("/");
		const fileExtendedName = folderNames.pop().split();
		const fileExtendedNameSegments = fileExtendedName.split(".");

		const fileName = fileExtendedNameSegments[0];
		const fileExtension = fileExtendedNameSegments.length > 1 ? fileExtendedNameSegments[1] : "txt";

		// To do: check if file already exists

		const file = new VirtualFile(fileName, fileExtension);

		const folders = this.addFolder(folderNames.join("/"));

		const parent = folders[folders.length - 1];
		parent.files.push(file);
		file.parent = parent;

		this.getRoot().saveData();
	}

	/**
	 * Adds a folder at a destination
	 * @deprecated
	 * @param {string} destination 
	 */
	addFolder(destination) {
		if (destination.endsWith("/"))
			destination = destination.slice(0, -1);

		const folderNames = destination.split("/");

		let currentFolder = this;
		folderNames.forEach((folderName) => {
			if (!currentFolder.hasFolder(folderName)) {
				currentFolder.createFolder(folderName);
			}
		});

		this.getRoot().saveData();
	}

	/**
	 * Removes a file or folder from this folder
	 * @param {VirtualFile|VirtualFolder} child 
	 */
	remove(child) {
		child.parent = null;

		if (child instanceof VirtualFile) {
			removeFromArray(child, this.files);
		} else if (child instanceof VirtualFolder) {
			removeFromArray(child, this.subFolders);
		}

		this.getRoot().saveData();
	}

	/**
	 * Returns the file or folder at a relative path or null if it doesn't exist
	 * @param {string} relativePath 
	 * @returns {VirtualFile|VirtualFolder|null}
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
		super.delete();

		this.files.concat(this.subFolders).forEach((item) => {
			item.delete();
		});

		this.getRoot().saveData();
	}

	/**
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

	toJSON() {
		const object = super.toJSON();

		if (this.files.length > 0) {
			object.fls = this.files.map((file) => file.toJSON());
		}
		if (this.subFolders.length > 0) {
			object.fds = this.subFolders.map((folder) => folder.toJSON());
		}

		return object;
	}
}
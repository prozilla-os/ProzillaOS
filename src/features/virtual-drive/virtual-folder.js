import { VirtualBase } from "./virtual-base.js";
import { VirtualFile } from "./virtual-file.js";

export class VirtualFolder extends VirtualBase {
	static TYPE = {
		GENERAL: 0,
		MEDIA: 1,
	}
	
	/**
	 * @param {String} name
	 * @param {Number} type 
	 */
	constructor(name, type) {
		super(name);
		this.subFolders = [];
		this.files = [];
		this.type = type ?? VirtualFolder.TYPE.GENERAL;
	}

	// add(element) {

	// }

	hasFile(name, extension) {
		return this.findFile(name, extension) !== null;
	}

	hasFolder(name) {
		return this.findSubFolder(name) !== null;
	}

	findFile(name, extension) {
		let resultFile = null;

		this.files.forEach((file) => {
			if ((file.name === name || (file.alias && file.alias === name)) && file.extension === extension) {
				return resultFile = file;
			}
		});

		return resultFile;
	}

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
	 * @param {String} name 
	 * @param {String} extension 
	 * @param {Function} callback
	 * @returns {VirtualFolder}
	 */
	createFile(name, extension, callback) {
		const newFile = new VirtualFile(name, extension);
		this.files.push(newFile);
		newFile.parent = this;
		callback?.(newFile);
		return this;
	}

	/**
	 * @param {Array<Object>} files 
	 * @returns {VirtualFolder}
	 */
	createFiles(files) {
		files.forEach(({name, extension}) => {
			this.createFile(name, extension);
		});
		return this;
	}

	/**
	 * @param {String} name 
	 * @returns {VirtualFolder}
	 * @param {Function} callback
	 */
	createFolder(name, callback) {
		const newFolder = new VirtualFolder(name);
		this.subFolders.push(newFolder);
		newFolder.parent = this;
		callback?.(newFolder);
		return this;
	}

	/**
	 * @param {Array<String>} folders 
	 * @returns {VirtualFolder}
	 */
	createFolders(folders) {
		folders.forEach((name) => {
			this.createFolder(name);
		});
		return this;
	}

	/**
	 * @param {String} destination 
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
	}

	/**
	 * @param {String} destination 
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
		})
	}

	remove(child) {
		if (child instanceof VirtualFile) {
			// Remove file by id
		} else if (child instanceof VirtualFolder) {
			// Remove folder by id
		}
	}

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
		}

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
		} else if (currentDirectory !== null) {
			// To do: add support for file names with dots
			const [name, extension] = lastSegment.split(".");
			return currentDirectory.findFile(name, extension);
		} else {
			return null;
		}
	}
}
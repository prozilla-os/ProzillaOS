import { VirtualFile } from "./virtual-file.js";

export class VirtualFolder {
	static TYPE = {
		GENERAL: 0,
		MEDIA: 1,
	}
	
	/**
	 * @param {String} name
	 * @param {Number} type 
	 */
	constructor(name, type) {
		this.name = name;
		this.subFolders = [];
		this.files = [];
		this.type = type ?? this.TYPE.GENERAL;
	}

	// add(element) {

	// }

	hasFile(name, extension) {
		let exists = false;

		this.files.forEach(({ name: fileName, extension: fileExtension }) => {
			if (fileName === name && fileExtension === extension) {
				return exists = true;
			}
		});

		return exists;
	}

	hasFolder(name) {
		let exists = false;

		this.folders.forEach(({ name: folderName }) => {
			if (folderName === name) {
				return exists = true;
			}
		});

		return exists;
	}

	createFile(name, extension) {
		const file = new VirtualFile(name, extension);
		this.files.push(file);
		file.parent = this;
	}

	createFolder(name) {
		const newFolder = new VirtualFolder(name);
		this.subFolders.push(newFolder);
		newFolder.parent = this;
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
}
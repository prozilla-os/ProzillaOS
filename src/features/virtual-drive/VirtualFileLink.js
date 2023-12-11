import { VirtualFile } from "./virtualFile.js";

/**
 * A link that points to a virtual file
 */
export class VirtualFileLink extends VirtualFile {
	/**
	 * @param {string} name
	 * @param {VirtualFile} linkedFile
	 */
	constructor(name, linkedFile) {
		super(name);
		this.linkedFile = linkedFile;
	}

	/**
	 * @param {VirtualFile} file
	 * @returns {VirtualFileLink}
	 */
	setLinkedFile(file) {
		this.linkedFile = file;

		if (file) {
			this.linkedPath = file.path;
			this.extension = file.extension;
			this.content = file.content;
			this.source = file.source;
		}
		
		return this;
	}

	/**
	 * @param {string} path
	 * @returns {VirtualFileLink}
	 */
	setLinkedPath(path) {
		if (this.linkedFile && this.linkedFile.path === path)
			return;

		const target = this.parent.navigate(path);

		if (target instanceof VirtualFile) {
			this.setLinkedFile(target);
		} else {
			this.linkedFile = null;
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

		return (this.linkedFile != null);
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

	// Point certain methods to linked file

	/** @type {VirtualFile["setAlias"]} */
	setAlias(...args) {
		if (this.isValid()) return this.linkedFile.setAlias(...args);
	}

	/** @type {VirtualFile["setSource"]} */
	setSource(...args) {
		if (this.isValid()) return this.linkedFile.setSource(...args);
	}

	/** @type {VirtualFile["setContent"]} */
	setContent(...args) {
		if (this.isValid()) return this.linkedFile.setContent(...args);
	}

	/** @type {VirtualFile["id"]} */
	get id() {
		return this.isValid() ? this.linkedFile.id : null;
	}

	/** @type {VirtualFile["read"]} */
	read(...args) {
		if (this.isValid()) return this.linkedFile.read(...args);
	}
}
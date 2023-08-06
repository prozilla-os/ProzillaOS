import { VirtualBase } from "./virtual-base.js";

/**
 * A virtual file that can be stored inside a folder
 */
export class VirtualFile extends VirtualBase {
	static NON_TEXT_EXTENSIONS = [
		"png"
	];

	static EVENT_NAMES = {
		CONTENT_CHANGE: "contentchange"
	};

	/**
	 * @param {string} name 
	 * @param {string=} extension 
	 */
	constructor(name, extension) {
		super(name);
		this.extension = extension;
	}

	/**
	 * @param {string} alias
	 * @returns {VirtualFile}
	 */
	setAlias(alias) {
		return super.setAlias(alias);
	}

	/**
	 * Sets the source of this file and removes the content
	 * @param {string} source 
	 * @returns {VirtualFile}
	 */
	setSource(source) {
		if (this.source === source)
			return;

		this.source = source;
		this.content = null;

		this.emit(VirtualFile.EVENT_NAMES.CONTENT_CHANGE, this);
		this.getRoot().saveData();
		
		return this;
	}

	/**
	 * Sets the content of this file and removes the source
	 * @param {string | *} content 
	 * @returns {VirtualFile}
	 */
	setContent(content) {
		if (this.content === content)
			return;

		this.content = content;
		this.source = null;

		this.emit(VirtualFile.EVENT_NAMES.CONTENT_CHANGE, this);
		this.getRoot().saveData();

		return this;
	}

	get id() {
		if (this.extension == null || this.extension.trim() === "")
			return this.name;

		return `${this.name}.${this.extension}`;
	}

	/**
	 * @returns {Promise<string | null>}
	 */
	async read() {
		if (this.content != null)
			return this.content;

		const isText = !VirtualFile.NON_TEXT_EXTENSIONS.includes(this.extension);

		if (!isText) {
			return this.source;
		}

		return await fetch(this.source).then((response) =>
			response.text()
		).catch((error) => {
			console.error(`Error while reading file with id "${this.id}":`, error);
			return null;
		});
	}

	toJSON() {
		const object = super.toJSON();
		
		if (this.extension != null) {
			object.ext = this.extension;
		}

		if (this.content != null) {
			object.cnt = this.content;
		} else if (this.source != null) {
			object.src = this.source;
		}

		return object;
	}
}
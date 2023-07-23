import { VirtualBase } from "./virtual-base.js";

/**
 * A virtual file that can be stored inside a folder
 */
export class VirtualFile extends VirtualBase {
	/**
	 * @param {String} name 
	 * @param {String=} extension 
	 */
	constructor(name, extension) {
		super(name);
		this.extension = extension;
	}

	/**
	 * @param {String} alias
	 * @returns {VirtualFile}
	 */
	setAlias(alias) {
		return super.setAlias(alias);
	}

	/**
	 * Sets the source of this file and removes the content
	 * @param {String} source 
	 * @returns {VirtualFile}
	 */
	setSource(source) {
		this.source = source;
		this.content = null;
		return this;
	}

	/**
	 * Sets the content of this file and removes the source
	 * @param {String|*} content 
	 * @returns {VirtualFile}
	 */
	setContent(content) {
		this.content = content;
		this.source = null;
		return this;
	}

	get id() {
		if (this.extension == null || this.extension.trim() === "")
			return this.name;

		return `${this.name}.${this.extension}`;
	}
}
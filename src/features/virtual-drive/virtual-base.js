// eslint-disable-next-line no-unused-vars
import { VirtualRoot } from "./virtual-root.js";

export class VirtualBase {
	/**
	 * @param {String} name 
	 */
	constructor(name) {
		this.name = name;
	}

	get id() {
		return this.name;
	}

	/**
	 * @param {String} name 
	 * @returns {VirtualBase}
	 */
	setName(name) {
		this.name = name;
		return this;
	}

	/**
	 * @param {String} alias 
	 * @returns {ThisType}
	 */
	setAlias(alias) {
		this.alias = alias;
		this.getRoot().addShortcut(alias, this);
		return this;
	}

	/**
	 * @param {VirtualBase} parent
	 * @returns {VirtualBase}
	 */
	setParent(parent) {
		this.parent = parent;
		return this;
	}

	delete() {
		this.parent.remove?.(this);
	}

	open() {
		
	}

	get path() {
		return this.alias ?? this.absolutePath;
	}

	get absolutePath() {
		return this.parent?.path + "/" + this.id;
	}

	/**
	 * @returns {VirtualRoot}
	 */
	getRoot() {
		const root = this.root ?? this.parent.getRoot();

		if (root === null) {
			throw new Error("Root not found");
		}

		return root;
	}
}
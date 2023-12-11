import { EventEmitter } from "../utils/events.js";
import { VirtualRoot } from "./virtualRoot.js";

export class VirtualBase extends EventEmitter {
	/**
	 * @param {string} name 
	 */
	constructor(name) {
		super();
		this.name = name;
	}

	get id() {
		return this.name;
	}

	/**
	 * @param {string} name 
	 * @returns {VirtualBase}
	 */
	setName(name) {
		if (this.name === name || !this.canBeEdited)
			return;

		this.name = name;
		
		this.confirmChanges();
		return this;
	}

	/**
	 * @param {string} alias 
	 * @returns {ThisType}
	 */
	setAlias(alias) {
		if (this.alias === alias || !this.canBeEdited)
			return;

		this.alias = alias;
		this.getRoot().addShortcut(alias, this);

		this.confirmChanges();
		return this;
	}

	/**
	 * @param {VirtualBase} parent
	 * @returns {VirtualBase}
	 */
	setParent(parent) {
		if (this.parent === parent || !this.canBeEdited)
			return;

		this.parent = parent;

		this.confirmChanges();
		return this;
	}

	/**
	 * @param {boolean} value 
	 * @returns {VirtualBase}
	 */
	setProtected(value) {
		if (!this.canBeEdited)
			return;

		this.isProtected = value;
		return this;
	}

	delete() {
		if (!this.canBeEdited)
			return;

		console.log(this);

		const parent = this.parent;

		if (parent == null)
			return;

		parent.remove?.(this);
		this.confirmChanges(parent.getRoot());
	}

	/**
	 * @param {VirtualRoot} [root] 
	 */
	confirmChanges(root) {
		if (root == null)
			root = this.getRoot();

		if (root?.loadedDefaultData)
			this.editedByUser = true;

		root?.saveData();
	}

	open() {}

	get path() {
		return this.alias ?? this.displayPath;
	}

	/**
	 * Returns path without using alias
	 */
	get displayPath() {
		return this.parent?.path + "/" + this.id;
	}

	/**
	 * Returns path without using any aliases
	 * @returns {string}
	 */
	get absolutePath() {
		if (this.parent?.isRoot) {
			return "/" + this.id;
		} else {
			return this.parent?.absolutePath + "/" + this.id;
		}
	}

	/**
	 * Returns whether this can be edited in its current state
	 * @returns {boolean}
	 */
	get canBeEdited() {
		const isProtected = this.isProtected && this.getRoot().loadedDefaultData;

		if (!isProtected && this.parent != null) {
			return this.parent.canBeEdited;
		} else {
			return !isProtected;
		}
	}

	/**
	 * @returns {VirtualRoot}
	 */
	getRoot() {
		const root = this.root ?? this.parent?.getRoot();

		if (root === null) {
			throw new Error("Root not found");
		}

		return root;
	}

	/**
	 * @returns {boolean}
	 */
	isFile() {
		return false;
	}

	/**
	 * @returns {boolean}
	 */
	isFolder() {
		return false;
	}

	/**
	 * @returns {object | null}
	 */
	toJSON() {
		const object = {
			nam: this.name
		};

		return object;
	}
}
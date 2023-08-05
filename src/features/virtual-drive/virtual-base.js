import { EventEmitter } from "../utils/events.js";
// eslint-disable-next-line no-unused-vars
import { VirtualRoot } from "./virtual-root.js";

export class VirtualBase extends EventEmitter {
	/**
	 * @param {String} name 
	 */
	constructor(name) {
		super();
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
		this.getRoot().saveData();
		return this;
	}

	/**
	 * @param {String} alias 
	 * @returns {ThisType}
	 */
	setAlias(alias) {
		this.alias = alias;
		this.getRoot().addShortcut(alias, this);
		this.getRoot().saveData();
		return this;
	}

	/**
	 * @param {VirtualBase} parent
	 * @returns {VirtualBase}
	 */
	setParent(parent) {
		this.parent = parent;
		this.getRoot().saveData();
		return this;
	}

	delete() {
		const parent = this.parent;
		parent.remove?.(this);
		parent.getRoot().saveData();
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

	toJSON() {
		const object = {
			nam: this.name
		};

		return object;
	}
}
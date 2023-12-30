import { ZIndexManager } from "./zIndexManager.js";

export class ZIndexGroup {
	/** @type {number} */
	length = 0;

	/** @type {number} */
	offset = 0;

	/** @type {number} */
	groupIndex = 0;

	/** @type {ZIndexManager} */
	zIndexManager = null;

	/**
	 * @param {ZIndexManager} zIndexManager 
	 * @param {number} initialLength 
	 */
	constructor(zIndexManager, initialLength) {
		this.setManager(zIndexManager);
		this.setLength(initialLength ?? 0);
	}

	/**
	 * @param {ZIndexManager} zIndexManager 
	 * @returns {ZIndexGroup}
	 */
	setManager(zIndexManager) {
		this.zIndexManager = zIndexManager;
		return this;
	}

	/**
	 * @param {number} offset 
	 * @returns {ZIndexGroup}
	 */
	setOffset(offset) {
		this.offset = offset;
		return this;
	}

	/**
	 * @param {number} length 
	 * @returns {ZIndexGroup}
	 */
	setLength(length) {
		if (this.length === length)
			return;

		this.length = length;
		this.zIndexManager.update();
		return this;
	}

	/**
	 * @param {number} index
	 * @returns {number}
	 */
	getIndex(index) {
		if (this.length < index + 1) {
			this.setLength(index + 1);
		}

		return this.offset + index;
	}
}
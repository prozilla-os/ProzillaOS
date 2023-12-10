import { VirtualFolder } from "../../virtual-drive/virtualFolder.js";
import { VirtualRoot } from "../../virtual-drive/virtualRoot.js";

export default class Command {
	/** @type {string} */
	name;

	/**
	 * @param {string[]} args 
	 * @param {object} options
	 * @param {Function} options.promptOutput
	 * @param {Function} options.pushHistory 
	 * @param {VirtualRoot} options.virtualRoot 
	 * @param {VirtualFolder} options.currentDirectory 
	 * @param {Function} options.setCurrentDirectory 
	 * @param {string} options.username 
	 * @param {string} options.hostname 
	 * @param {string} options.rawInputValue 
	 * @returns {string|{ blank: boolean }}
	 */
	execute = (args, options) => {};

	/**
	 * @param {string} name 
	 * @param {Function} execute 
	 */
	constructor(name, execute) {
		this.name = name;
		this.execute = execute;
	}

	/**
	 * @param {string} name 
	 * @returns {Command}
	 */
	setName(name) {
		this.name = name;
		return this;
	}

	/**
	 * @param {Function} execute 
	 * @returns {Command}
	 */
	setExecute(execute) {
		this.execute = execute;
		return this;
	}

	/**
	 * @param {boolean} value 
	 * @returns {Command}
	 */
	setRequireArgs(value) {
		this.requireArgs = value;
		return this;
	}

	/**
	 * @param {{ purpose: string, usage: string, description: string}} name 
	 * @returns {Command}
	 */
	setManual({ purpose, usage, description }) {
		this.manual = { purpose, usage, description };
		return this;
	}
}
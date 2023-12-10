import Vector2 from "../math/vector2.js";
import ModalsManager from "./modals.js";

export default class Modal {
	/** @type {Vector2} */
	size = new Vector2(400, 200);
	/** @type {Vector2} */
	position = new Vector2(300, 300);
	/** @type {string | null} */
	icon = null;
	/** @type {title | null} */
	title = null;
	/** @type {ModalsManager} */
	modalsManager = null;
	/** @type {import("react").ReactElement	| null} */
	element = null;
	/** @type {object} */
	props = {};
	/** @type {Function | null} */
	callback = null;
	/** @type {number | null} */
	id = null;
	/** @type {boolean} */
	dismissible = true;

	/**
	 * @param {import("react").ReactElement} element
	 * @param {Function} callback
	 */
	constructor(element, callback) {
		this.element = element;
		this.callback = callback;
		this.focus();
	}

	/**
	 * @param {string} icon 
	 * @returns {Modal}
	 */
	setIcon(icon) {
		this.icon = icon;
		return this;
	}

	/**
	 * @param {string} title 
	 * @returns {Modal}
	 */
	setTitle(title) {
		this.title = title;
		return this;
	}

	/**
	 * @param {Vector2} position 
	 * @returns {Modal}
	 */
	setPosition(position) {
		this.position = position;
		return this;
	}

	/**
	 * @param {Vector2} size 
	 * @returns {Modal}
	 */
	setSize(size) {
		this.size = size;
		return this;
	}

	/**
	 * @param {object} props 
	 * @returns {Modal}
	 */
	setProps(props) {
		this.props = props;
		return this;
	}

	/**
	 * @param {boolean} dismissible 
	 * @returns {Modal}
	 */
	setDismissible(dismissible) {
		this.dismissible = dismissible;
		return this;
	}

	focus() {
		this.lastInteraction = new Date().valueOf();
	}

	/**
	 * @param {...any} args 
	 */
	finish(...args) {
		if (this.modalsManager == null || this.id == null)
			return;

		this.modalsManager.close(this.id);
		this.callback?.(...args);
	}

	close() {
		this.finish();
	}
}
import { EventEmitter } from "../../_utils/event.utils.js";

export default class Stream extends EventEmitter {
	static EVENT_NAMES = {
		NEW: "new",
		START: "start",
		STOP: "stop",
	};

	enabled = false;

	/**
	 * @param {Function} callback 
	 * @returns {Stream}
	 */
	start(callback) {
		if (this.enabled)
			return;

		callback?.(this);
		this.enabled = true;
		this.emit(Stream.EVENT_NAMES.START);
		return this;
	}

	/**
	 * @returns {Stream}
	 */
	stop() {
		if (!this.enabled)
			return;

		this.enabled = false;
		this.emit(Stream.EVENT_NAMES.STOP);
		return this;
	}

	/**
	 * @param {string} text 
	 * @returns {Stream}
	 */
	send(text) {
		if (this.enabled)
			this.emit(Stream.EVENT_NAMES.NEW, text);
		return this;
	}
}
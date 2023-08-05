export class EventEmitter {
	/**
	 * @type {Object<String, String>}
	 */
	static EVENT_NAMES = {};

	/**
	 * @type {Object<String, Array<Function>>}
	 */
	#events = {}

	/**
	 * Add event listener for an event
	 * @param {EVENT_NAMES} eventName
	 * @param {Function} callback
	 */
	on(eventName, callback) {
		if (!this.#events[eventName]) {
			this.#events[eventName] = [];
		}
		this.#events[eventName].push(callback);
	}
	
	/**
	 * Remove event listener for an event
	 * @param {EVENT_NAMES} eventName
	 * @param {Function} callback
	 */
	off(eventName, callback) {
		if (this.#events[eventName]) {
			this.#events[eventName] = this.#events[eventName].filter(
				(listener) => listener !== callback
			);
		}
	}
	
	/**
	 * Dispatch event
	 * @param {EVENT_NAMES} eventName
	 * @param {*} data
	 */
	emit(eventName, data) {
		if (this.#events[eventName]) {
			this.#events[eventName].forEach((listener) => {
				listener(data);
			});
		}
	}
}
export type EventNamesMap = Record<string, string>;
export type Listener = (data: unknown) => void;

export class EventEmitter<EventMap extends EventNamesMap> {
	static EVENT_NAMES: EventNamesMap = {};

	#events: Record<string, Array<Listener>> = {};

	/**
	 * Adds an event listener.
	 */
	on<Key extends keyof EventMap>(eventName: Key, callback: Listener) {
		if (!this.#events[eventName as string]) {
			this.#events[eventName as string] = [];
		}
		this.#events[eventName as string].push(callback);
		return callback;
	}
	
	/**
	 * Removes an event listener.
	 */
	off<Key extends keyof EventMap>(eventName: Key, callback: Listener) {
		if (this.#events[eventName as string]) {
			this.#events[eventName as string] = this.#events[eventName as string].filter(
				(listener) => listener !== callback
			);
		}
	}
	
	/**
	 * Dispatches an event.
	 */
	emit<Key extends keyof EventMap>(eventName: Key, data?: unknown) {
		if (this.#events[eventName as string]) {
			this.#events[eventName as string].forEach((listener) => {
				listener(data);
			});
		}
	}
}
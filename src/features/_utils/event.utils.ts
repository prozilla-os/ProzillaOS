export type EventNamesMap = Record<string, string>;

export class EventEmitter<EventMap extends EventNamesMap> {
	static EVENT_NAMES: EventNamesMap = {};

	#events: Record<string, Array<Function>> = {};

	/**
	 * Add event listener for an event
	 */
	on<Key extends keyof EventMap>(eventName: Key, callback: (data: any) => void) {
		if (!this.#events[eventName as string]) {
			this.#events[eventName as string] = [];
		}
		this.#events[eventName as string].push(callback);
	}
	
	/**
	 * Remove event listener for an event
	 */
	off<Key extends keyof EventMap>(eventName: Key, callback: (data: any) => void) {
		if (this.#events[eventName as string]) {
			this.#events[eventName as string] = this.#events[eventName as string].filter(
				(listener) => listener !== callback
			);
		}
	}
	
	/**
	 * Dispatch event
	 */
	emit<Key extends keyof EventMap>(eventName: Key, data?: any) {
		if (this.#events[eventName as string]) {
			this.#events[eventName as string].forEach((listener) => {
				listener(data);
			});
		}
	}
}
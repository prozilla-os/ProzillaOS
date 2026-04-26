import { removeFromArray } from "./array.utils";

/**
 * A function that handles an event.
 * @typeParam T - A record of all events.
 * @typeParam K - The event this function handles.
 */
export type Listener<T extends Record<keyof T, unknown[]>, K extends keyof T> = (...args: T[K]) => void | Promise<void>;

/**
 * A simple event emitter.
 * @typeParam T - A record of all events.
 */
export class EventEmitter<T extends Record<keyof T, unknown[]>> {
	#listeners: {
		[K in keyof T]?: Listener<T, K>[];
	} = {};

	/**
	 * Starts listening to an event.
	 * @param event - The event to listen to.
	 * @param listener - The function to call when the event is emitted.
	 * @returns The listener.
	 */
	public on<K extends keyof T>(event: K, listener: Listener<T, K>) {
		if (this.#listeners[event] === undefined) {
			this.#listeners[event] = [listener];
		} else {
			this.#listeners[event].push(listener);
		}
		return listener;
	}

	/**
	 * Registers an event listener that is automatically removed when called.
	 * @param event - The event to listen to.
	 * @param listener - The function to call once the event is emitted.
	 * @returns The wrapped listener.
	 */
	public once<K extends keyof T>(event: K, listener: Listener<T, K>) {
		const wrapper: Listener<T, K> = (...args) => {
			this.off(event, wrapper);
			return listener(...args);
		};
		return this.on(event, wrapper);
	}

	/**
	 * Removes an event listener.
	 * @param event - The event to remove the listener from.
	 * @param listener - The listener to remove.
	 */
	public off<K extends keyof T>(event: K, listener: Listener<T, K>): void {
		const listeners = this.#listeners[event];
		if (listeners === undefined)
			return;
		
		removeFromArray(listener, listeners);
	}

	/**
	 * Emits an event to all its listeners.
	 * @param event - The event to emit.
	 * @param args - The arguments to pass to the listeners.
	 */
	public emit<K extends keyof T>(event: K, ...args: T[K]): void {
		const listeners = this.#listeners[event];
		if (listeners === undefined)
			return;

		for (const listener of listeners) {
			void listener(...args);
		}
	}

	/**
	 * Emits an event and waits for all listeners to resolve.
	 * @param event - The event to emit.
	 * @param args - The arguments to pass to the listeners.
	 */
	public async emitAsync<K extends keyof T>(event: K, ...args: T[K]): Promise<void> {
		const listeners = this.#listeners[event];
		if (listeners === undefined)
			return;

		const promises = listeners.map((listener) => listener(...args));
		await Promise.all(promises);
	}
}
import { removeFromArray } from "./array.utils";

/**
 * A function that handles an event.
 * @typeParam T - A record of all events.
 * @typeParam K - The event this function handles.
 */
export type Listener<T extends Record<keyof T, unknown[]>, K extends keyof T> = (...args: T[K]) => void;

/**
 * A function that handles an event asynchronously.
 * @typeParam T - A record of all events.
 * @typeParam K - The event this function handles.
 */
export type AsyncListener<T extends Record<keyof T, unknown[]>, K extends keyof T> = (...args: T[K]) => Promise<void>;

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
	on<K extends keyof T>(event: K, listener: Listener<T, K>) {
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
	once<K extends keyof T>(event: K, listener: Listener<T, K>) {
		const wrapper = this.on(event, (...args) => {
			this.off(event, wrapper);
			listener(...args);
		});
		return wrapper;
	}

	/**
	 * Starts listening to an event.
	 * @param event - The event to listen to.
	 * @param listener - The function to call when the event is emitted.
	 * @returns The wrapped listener. 
	 */
	onAsync<K extends keyof T>(event: K, listener: AsyncListener<T, K>, onRejected?: Parameters<Promise<void>["catch"]>[0]) {
		return this.on(event, (...args) => {
			void listener(...args).catch((reason) => {
				if (onRejected) {
					onRejected(reason);
				} else {
					console.error(reason);
				}
			});
		});
	}
	
	/**
	 * Removes an event listener.
	 * @param event - The event to remove the listener from.
	 * @param listener - The listener to remove.
	 */
	off<K extends keyof T>(event: K, listener: Listener<T, K>) {
		if (this.#listeners[event] === undefined) {
			return;
		}
		removeFromArray(listener, this.#listeners[event]);
	}
	
	/**
	 * Emits an event to all its listeners.
	 * @param event - The event to emit.
	 * @param args - The arguments to pass to the listeners.
	 */
	emit<K extends keyof T>(event: K, ...args: T[K]) {
		if (this.#listeners[event] === undefined) {
			return;
		}
		for (const listener of this.#listeners[event]) {
			listener(...args);
		}	
	}
}
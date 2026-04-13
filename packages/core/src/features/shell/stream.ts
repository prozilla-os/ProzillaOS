import { EventEmitter } from "@prozilla-os/shared";

export type StreamSignal = "SIGINT" | "SIGKILL" | "SIGTERM" | "SIGINFO";

export interface StreamEvents<T = string> {
	data: [T];
	start: [];
	stop: [];
	signal: [StreamSignal];
}

/**
 * A communication channel for process I/O, supporting event-based data transmission,
 * signaling, and piping between streams.
 */
export class Stream<T = string> extends EventEmitter<StreamEvents<T>> {
	enabled = false;

	static readonly DATA_EVENT = "data";
	static readonly START_EVENT = "start";
	static readonly STOP_EVENT = "stop";
	static readonly SIGNAL_EVENT = "signal";

	/**
	 * Activates the stream and notifies listeners.
	 */
	start(callback?: (stream: this) => void): this {
		if (this.enabled) return this;
		this.enabled = true;
		callback?.(this);
		this.emit(Stream.START_EVENT);
		return this;
	}

	/**
	 * Deactivates the stream. Subsequent calls to {@link Stream.write} will be ignored.
	 */
	stop(): this {
		if (!this.enabled) return this;
		this.enabled = false;
		this.emit(Stream.STOP_EVENT);
		return this;
	}

	/**
	 * Emits a control signal. Standard termination signals will automatically stop the stream.
	 */
	signal(signal: StreamSignal): this {
		this.emit(Stream.SIGNAL_EVENT, signal);
		if (signal === "SIGINT" || signal === "SIGKILL" || signal === "SIGTERM") {
			this.stop();
		}
		return this;
	}

	/**
	 * Broadcasts data to all listeners if the stream is enabled.
	 */
	write(data: T): this {
		if (this.enabled)
			this.emit(Stream.DATA_EVENT, data);
		return this;
	}

	/**
	 * Forwards data, stop events, and signals from this stream to another.
	 * @param destination - The stream that will receive the forwarded data.
	 * @returns The destination stream to allow for chainable piping.
	 */
	pipe(destination: Stream<T>): Stream<T> {
		this.on(Stream.DATA_EVENT, (data) => destination.write(data));
		this.on(Stream.STOP_EVENT, () => destination.stop());
		this.on(Stream.SIGNAL_EVENT, (signal) => destination.signal(signal));
		return destination;
	}

	/**
	 * Returns a promise that resolves when the stream is stopped.
	 */
	async wait(): Promise<void>;
	/**
	 * Returns a promise that resolves when the stream is stopped.
	 * @param value - Value to return when the promise resolves.
	 */
	async wait<U>(value: U): Promise<U>;
	async wait<U>(value?: U): Promise<U | void> {
		return new Promise((resolve) => {
			this.once(Stream.STOP_EVENT, () => {
				resolve(value);
			});
		});
	}
}
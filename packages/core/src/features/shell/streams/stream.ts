import { EventEmitter, Result } from "@prozilla-os/shared";

export type StreamSignal = "SIGINT" | "SIGKILL" | "SIGTERM" | "SIGINFO" | "SIGHUP" | "SIGQUIT" | "SIGPIPE";

export type StreamError = 
	| { type: typeof Stream.INTERRUPTED; signal: StreamSignal }
	| { type: typeof Stream.CLOSED };

export interface StreamEvents<T = string> {
	data: [T];
	end: [];
	signal: [StreamSignal];
	error: [StreamError];
}

export interface InputStream<T = string> {
	read(): Promise<Result<T | null, StreamError>>;
}

export interface OutputStream<T = string> {
	write(data: T): Promise<Result<void, StreamError>>;
}

/**
 * A communication channel for process I/O, supporting event-based data transmission,
 * signaling, and piping between streams.
 */
export class Stream<T = string> extends EventEmitter<StreamEvents<T>> implements InputStream<T>, OutputStream<T> {
	private isClosed = false;
	private readonly buffer: T[] = [];
	private readonly pendingReads: { resolve: (value: Result<T | null, StreamError>) => void }[] = [];
	private currentSignal: StreamSignal | null = null;

	static readonly DATA_EVENT = "data";
	static readonly END_EVENT = "end";
	static readonly SIGNAL_EVENT = "signal";
	static readonly ERROR_EVENT = "error";

	static readonly INTERRUPTED = "interrupted";
	static readonly CLOSED = "closed";

	private static readonly TERMINATING_SIGNALS: StreamSignal[] = ["SIGINT", "SIGKILL", "SIGTERM", "SIGHUP", "SIGQUIT", "SIGPIPE"];

	/**
	 * Closes the stream (EOF). Subsequent calls to write will be rejected.
	 */
	end(): this {
		if (this.isClosed)
			return this;

		this.isClosed = true;

		while (this.pendingReads.length) {
			const request = this.pendingReads.shift();
			if (request !== undefined)
				request.resolve(Result.ok(null));
		}
		
		this.emit(Stream.END_EVENT);
		return this;
	}

	/**
	 * Emits a control signal. Standard termination signals will automatically close the stream.
	 */
	signal(signal: StreamSignal): this {
		this.currentSignal = signal;
		this.emit(Stream.SIGNAL_EVENT, signal);
		
		while (this.pendingReads.length) {
			const request = this.pendingReads.shift();
			if (request !== undefined)
				request.resolve(Result.error({ type: Stream.INTERRUPTED, signal: this.currentSignal }));
		}

		if (Stream.TERMINATING_SIGNALS.includes(signal))
			this.end();
		
		return this;
	}

	/**
	 * Broadcasts data to all listeners if the stream is open.
	 */
	async write(data: T): Promise<Result<void, StreamError>> {
		if (this.currentSignal !== null && Stream.TERMINATING_SIGNALS.includes(this.currentSignal))
			return Promise.resolve(Result.error({ type: Stream.INTERRUPTED, signal: this.currentSignal }));

		if (this.isClosed) {
			console.warn("Data dropped by stream: " + JSON.stringify(data));
			return Promise.resolve(Result.error({ type: Stream.CLOSED }));
		}

		if (this.pendingReads.length) {
			const request = this.pendingReads.shift();
			if (request !== undefined)
				request.resolve(Result.ok(data));
		} else {
			this.buffer.push(data);
		}

		this.emit(Stream.DATA_EVENT, data);
		return Promise.resolve(Result.ok(undefined));
	}

	/**
	 * Resolves with the next available chunk, or null if the stream is closed (EOF).
	 */
	async read(): Promise<Result<T | null, StreamError>> {
		if (this.currentSignal !== null && Stream.TERMINATING_SIGNALS.includes(this.currentSignal))
			return Promise.resolve(Result.error({ type: Stream.INTERRUPTED, signal: this.currentSignal }));

		if (this.buffer.length) {
			const chunk = this.buffer.shift();
			if (chunk !== undefined)
				return Promise.resolve(Result.ok(chunk));
		}

		if (this.isClosed)
			return Promise.resolve(Result.ok(null));

		return new Promise((resolve) => {
			this.pendingReads.push({ resolve });
		});
	}

	/**
	 * Forwards data, end events, and signals from this stream to another.
	 * @param destination - The stream that will receive the forwarded data.
	 * @returns The destination stream to allow for chainable piping.
	 */
	pipe(destination: Stream<T>, propagateEnd = true) {
		this.on(Stream.DATA_EVENT, (data) => void destination.write(data));
		this.on(Stream.SIGNAL_EVENT, (signal) => destination.signal(signal));

		if (propagateEnd)
			this.on(Stream.END_EVENT, () => destination.end());
		
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
			if (this.isClosed)
				return resolve(value);

			this.once(Stream.END_EVENT, () => resolve(value));
		});
	}

	/**
	 * Iterates over a readable string stream and yields each line.
	 */
	public static async* readLines(stream: InputStream): AsyncGenerator<Result<string, StreamError>> {
		let buffer = "";

		while (true) {
			const result = await stream.read();

			if (result.isError()) {
				yield Result.error(result.error);
				return;
			}

			const chunk = result.value;

			if (chunk === null) {
				if (buffer.length)
					yield Result.ok(buffer);
				return;
			}

			buffer += chunk;
			const lines = buffer.split("\n");

			const lastLine = lines.pop();
			buffer = lastLine !== undefined ? lastLine : "";

			for (let i = 0; i < lines.length; i++) {
				yield Result.ok(lines[i]);
			}
		}
	}
}
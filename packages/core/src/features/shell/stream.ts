import { EventEmitter } from "@prozilla-os/shared";

export type StreamSignal = "SIGINT" | "SIGKILL" | "SIGTERM" | "SIGINFO";

export interface StreamEvents<T = string> {
	data: [T];
	start: [];
	stop: [];
	signal: [StreamSignal];
}

export class Stream<T = string> extends EventEmitter<StreamEvents<T>> {
	enabled = false;

	static readonly DATA_EVENT = "data";
	static readonly START_EVENT = "start";
	static readonly STOP_EVENT = "stop";
	static readonly SIGNAL_EVENT = "signal";

	start(callback?: (stream: this) => void): this {
		if (this.enabled) return this;
		this.enabled = true;
		callback?.(this);
		this.emit(Stream.START_EVENT);
		return this;
	}

	stop(): this {
		if (!this.enabled) return this;
		this.enabled = false;
		this.emit(Stream.STOP_EVENT);
		return this;
	}

	signal(signal: StreamSignal): this {
		this.emit(Stream.SIGNAL_EVENT, signal);
		if (signal === "SIGINT" || signal === "SIGKILL" || signal === "SIGTERM") {
			this.stop();
		}
		return this;
	}

	write(data: T): this {
		if (this.enabled)
			this.emit(Stream.DATA_EVENT, data);
		return this;
	}

	pipe(destination: Stream<T>): Stream<T> {
		this.on(Stream.DATA_EVENT, (data) => destination.write(data));
		this.on(Stream.STOP_EVENT, () => destination.stop());
		this.on(Stream.SIGNAL_EVENT, (signal) => destination.signal(signal));
		return destination;
	}

	async wait(): Promise<void>;
	async wait<U>(value: U): Promise<U>;
	async wait<U>(value?: U): Promise<U | void> {
		return new Promise((resolve) => {
			this.once(Stream.STOP_EVENT, () => {
				resolve(value);
			});
		});
	}
}
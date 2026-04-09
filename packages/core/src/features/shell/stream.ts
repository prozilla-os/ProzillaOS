import { EventEmitter } from "@prozilla-os/shared";

export interface StreamEvents<T = string> {
    data: [T];
    start: [];
    stop: [];
}

export class Stream<T = string> extends EventEmitter<StreamEvents<T>> {
	enabled: boolean = false;

	static readonly DATA_EVENT = "data";
	static readonly START_EVENT = "start";
	static readonly STOP_EVENT = "stop";

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

	write(data: T): this {
		if (this.enabled)
			this.emit(Stream.DATA_EVENT, data);
		return this;
	}

	pipe(destination: Stream<T>): Stream<T> {
		this.on(Stream.DATA_EVENT, (data) => destination.write(data));
		this.on(Stream.STOP_EVENT, () => destination.stop());
		return destination;
	}


	async wait(): Promise<void>;
	async wait<T>(value: T): Promise<T>;
	async wait<T>(value?: T): Promise<T | void> {
		return new Promise((resolve) => {
			this.once(Stream.STOP_EVENT, () => {
				resolve(value);
			});
		});
	}
}
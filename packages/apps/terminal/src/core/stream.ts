import { EventEmitter } from "@prozilla-os/shared";

export interface StreamEvents {
	send: [string];
	start: [];
	stop: [];
}

export class Stream extends EventEmitter<StreamEvents> {

	enabled: boolean = false;

	static readonly SEND_EVENT = "send";
	static readonly START_EVENT = "start";
	static readonly STOP_EVENT = "stop";

	start(callback?: (stream: this) => void): Stream {
		if (this.enabled)
			return this;

		callback?.(this);
		this.enabled = true;
		this.emit(Stream.START_EVENT);
		return this;
	}

	stop(): Stream {
		if (!this.enabled)
			return this;

		this.enabled = false;
		this.emit(Stream.STOP_EVENT);
		return this;
	}

	send(text: string): Stream {
		if (this.enabled)
			this.emit(Stream.SEND_EVENT, text);
		return this;
	}
}
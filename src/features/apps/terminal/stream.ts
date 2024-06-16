import { EventEmitter } from "../../_utils/event.utils";

const StreamEvents = {
	new: "new",
	start: "start",
	stop: "stop",
} as const;

export class Stream extends EventEmitter<typeof StreamEvents> {
	static EVENT_NAMES = StreamEvents;

	enabled: boolean = false;

	start(callback?: Function): Stream {
		if (this.enabled)
			return this;

		callback?.(this);
		this.enabled = true;
		this.emit("start");
		return this;
	}

	stop(): Stream {
		if (!this.enabled)
			return this;

		this.enabled = false;
		this.emit("stop");
		return this;
	}

	send(text: string): Stream {
		if (this.enabled)
			this.emit("new", text);
		return this;
	}
}
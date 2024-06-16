import { EventEmitter } from "../_utils/event.utils";
import { ZIndexGroup } from "./zIndexGroup";

const ZIndexManagerEvents = {
	indexChange: "indexChange",
} as const;

export class ZIndexManager extends EventEmitter<typeof ZIndexManagerEvents> {
	static GROUPS = {
		WINDOWS: 0,
		TASKBAR: 1,
		MODALS: 2,
	};

	static EVENT_NAMES = ZIndexManagerEvents;

	groups: ZIndexGroup[] = [];

	constructor() {
		super();
		for (let i = 0; i < Object.keys(ZIndexManager.GROUPS).length; i++) {
			const group = new ZIndexGroup(this);
			this.groups.push(group);
		}
	}

	update() {
		let offset = 0;
		let changed = false;
		for (let i = 0; i < this.groups.length; i++) {
			const group = this.groups[i];
			if (group.offset !== offset) {
				changed = true;
				group.setOffset(offset);
			}
			offset += group.length;
		}
		if (changed) {
			this.emit("indexChange");
		}
	}

	getIndex(groupIndex: number, index: number) {
		return this.groups[groupIndex].getIndex(index);
	}
}
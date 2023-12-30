import { EventEmitter } from "../_utils/event.utils.js";
import { ZIndexGroup } from "./zIndexGroup.js";

export class ZIndexManager extends EventEmitter {
	static GROUPS = {
		WINDOWS: 0,
		TASKBAR: 1,
		MODALS: 2,
	};

	static EVENT_NAMES = {
		INDEX_CHANGE: "indexchange"
	};

	/** @type {ZIndexGroup[]} */
	groups = [];

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
			this.emit(ZIndexManager.EVENT_NAMES.INDEX_CHANGE);
		}
	}

	getIndex(groupIndex, index) {
		return this.groups[groupIndex].getIndex(index);
	}
}
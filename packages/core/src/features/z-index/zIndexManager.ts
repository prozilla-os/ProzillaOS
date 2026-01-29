import { EventEmitter } from "@prozilla-os/shared";
import { ZIndexGroup } from "./zIndexGroup";

export interface ZIndexManagerEvents {
	indexChange: [];
}

export class ZIndexManager extends EventEmitter<ZIndexManagerEvents> {
	static GROUPS = {
		WINDOWS: 0,
		TASKBAR: 1,
		MODALS: 2,
	};

	static readonly INDEX_CHANGE_EVENT = "indexChange";

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
			this.emit(ZIndexManager.INDEX_CHANGE_EVENT);
		}
	}

	getIndex(groupIndex: number, index: number) {
		return this.groups[groupIndex].getIndex(index);
	}
}
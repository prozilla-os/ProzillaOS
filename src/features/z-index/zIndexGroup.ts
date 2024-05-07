import { ZIndexManager } from "./zIndexManager";

export class ZIndexGroup {
	length: number = 0;
	offset: number = 0;
	groupIndex: number = 0;
	zIndexManager: ZIndexManager = null;

	constructor(zIndexManager: ZIndexManager, initialLength?: number) {
		this.setManager(zIndexManager);
		this.setLength(initialLength ?? 0);
	}

	setManager(zIndexManager: ZIndexManager): ZIndexGroup {
		this.zIndexManager = zIndexManager;
		return this;
	}

	setOffset(offset: number): ZIndexGroup {
		this.offset = offset;
		return this;
	}

	setLength(length: number): ZIndexGroup {
		if (this.length === length)
			return;

		this.length = length;
		this.zIndexManager.update();
		return this;
	}

	getIndex(index: number): number {
		if (this.length < index + 1) {
			this.setLength(index + 1);
		}

		return this.offset + index;
	}
}
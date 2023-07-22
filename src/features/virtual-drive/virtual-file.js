import { VirtualBase } from "./virtual-base.js";

export class VirtualFile extends VirtualBase {
	constructor(name, extension) {
		super(name);
		this.extension = extension;
	}

	get id() {
		return this.name + this.extension;
	}
}
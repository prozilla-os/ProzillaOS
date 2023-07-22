import { VirtualBase } from "./virtual-base.js";

export class VirtualFile extends VirtualBase {
	constructor(name, extension) {
		super(name);
		this.extension = extension;
	}

	setSource(source) {
		this.source = source;
		return this;
	}

	get id() {
		if (this.extension == null || this.extension.trim() === "")
			return this.name;

		return `${this.name}.${this.extension}`;
	}
}
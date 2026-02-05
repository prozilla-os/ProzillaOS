import { VirtualBase, VirtualFile, VirtualFolder, VirtualRoot } from "../../../src/features";

export class MockVirtualFile extends VirtualFile {

	constructor(name: string, extension?: string) {
		super(name, extension);
	}

	override confirmChanges(_root?: VirtualRoot): void {
		this.editedByUser = true;
		this.emit(VirtualBase.UPDATE_EVENT);
	}
}

export class MockVirtualFolder extends VirtualFolder {

	constructor(name: string, type?: number) {
		super(name, type);
	}

	override confirmChanges(_root?: VirtualRoot): void {
		this.editedByUser = true;
		this.emit(VirtualBase.UPDATE_EVENT);
	}
}
import { SystemManager, VirtualBase, VirtualFile, VirtualFolder, VirtualRoot, VirtualLazyFolder } from "../../../src/features";

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

export class MockVirtualRoot extends VirtualRoot {

	constructor(systemManager: SystemManager) {
		super(systemManager);
		this.init();
	}

}

export class MockVirtualLazyFolder extends VirtualLazyFolder {
	private resolve!: () => void;
	readonly populated: Promise<void>;
	private onPopulateCallback: (Folder: MockVirtualLazyFolder) => void

	constructor(name: string, onPopulateCallback: (Folder: MockVirtualLazyFolder) => void = () => {}) {
		super(name);
		this.onPopulateCallback = onPopulateCallback
		this.populated = new Promise((resolve) => {
			this.resolve = resolve;
		});
	}

	override onPopulate(): Promise<void> {
		return this.populated.then(() =>{
			this.onPopulateCallback(this)
		})
	}

	completePopulation() {
		this.resolve();
	}
}
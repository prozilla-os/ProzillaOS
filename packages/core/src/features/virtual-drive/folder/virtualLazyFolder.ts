import { VirtualBase, VirtualBaseEvents } from "../virtualBase";
import { VirtualFile } from "../file";
import { VirtualFolder } from "./virtualFolder";

export class VirtualLazyFolder<E extends VirtualBaseEvents = VirtualBaseEvents> extends VirtualFolder<E> {
	private hasPopulated = false;

	constructor(name: string, type?: number) {
		super(name, type);
	}

	/**
	 * Override this method to populate the folder with files and sub-folders.
	 * Called once, the first time the folder's contents are requested.
	 */
	onPopulate(): Promise<void> {
		return Promise.resolve();
	}

	private triggerPopulate() {
		if (this.hasPopulated)
			return;

		this.hasPopulated = true;
		
		this.onPopulate().then(() => {
			this.emit(VirtualBase.UPDATE_EVENT);
		});
	}

	getFiles(showHidden = false): VirtualFile[] {
		this.triggerPopulate();
		return super.getFiles(showHidden);
	}

	getSubFolders(showHidden = false): VirtualFolder[] {
		this.triggerPopulate();
		return super.getSubFolders(showHidden);
	}
}
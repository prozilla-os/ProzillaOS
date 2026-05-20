import { VirtualBase, VirtualBaseEvents } from "../virtualBase";
import { VirtualFile } from "../file";
import { VirtualFolder } from "./virtualFolder";

export class VirtualLazyFolder<E extends VirtualBaseEvents = VirtualBaseEvents> extends VirtualFolder<E> {
	private hasPopulated = false;
	private content: Promise<void> = Promise.resolve()

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

	async loadContent(): Promise<void> {
		if (this.hasPopulated) {
			return this.content
		}

		this.hasPopulated = true
		this.content = this.onPopulate().then(() => {
			this.emit(VirtualBase.UPDATE_EVENT);
		});

		return this.content
	}

	getFiles(showHidden = false): VirtualFile[] {
		this.loadContent();
		return super.getFiles(showHidden);
	}

	getSubFolders(showHidden = false): VirtualFolder[] {
		this.loadContent();
		return super.getSubFolders(showHidden);
	}
}
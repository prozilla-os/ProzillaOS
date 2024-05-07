import { APPS } from "../../../config/apps.config";
import AppsManager from "../../apps/appsManager";
import { VirtualFolder } from ".";
import { VirtualFolderJson } from "./virtualFolder";

export interface VirtualFolderLinkJson extends VirtualFolderJson {
	lnk: string;
}

/**
 * A link that points to a virtual folder
 */
export class VirtualFolderLink extends VirtualFolder {
	linkedPath: string;

	constructor(name: string, linkedFolder?: VirtualFolder) {
		super(name);
		this.linkedFolder = linkedFolder;
	}

	setLinkedFolder(folder: VirtualFolder): VirtualFolderLink {
		this.linkedFolder = folder;

		if (folder) {
			this.linkedPath = folder.path;
			this.type = folder.type;
		}

		return this;
	}

	setLinkedPath(path: string): VirtualFolderLink {
		if (this.linkedFolder && this.linkedFolder.path === path)
			return;

		const target = this.navigate(path);

		if (target instanceof VirtualFolder) {
			this.setLinkedFolder(target);
		} else {
			this.linkedFolder = null;
		}

		return this;
	}

	isValid(): boolean {
		if (!this.linkedPath)
			return false;

		this.setLinkedPath(this.linkedPath);

		return (this.linkedFolder != null);
	}

	getIconUrl(): string {
		if (this.iconUrl != null)
			return this.iconUrl;

		if (this.isValid() && this.linkedFolder.iconUrl)
			return this.linkedFolder.iconUrl;

		return AppsManager.getAppIconUrl(APPS.FILE_EXPLORER, "folder-link");
	}

	toJSON(): VirtualFolderLinkJson | null {
		if (this.linkedPath == null)
			return;

		const object = {
			nam: this.name,
			lnk: this.linkedPath
		};

		return object;
	}

	// Point certain methods to linked folder

	setAlias(...args: Parameters<VirtualFolder["setAlias"]>) {
		if (this.isValid())
			this.linkedFolder.setAlias(...args);
		return this;
	}

	createFile(...args: Parameters<VirtualFolder["createFile"]>) {
		if (this.isValid())
			this.linkedFolder.createFile(...args);
		return this;
	}

	createFiles(...args: Parameters<VirtualFolder["createFiles"]>) {
		if (this.isValid())
			this.linkedFolder.createFiles(...args);
		return this;
	}

	createFolder(...args: Parameters<VirtualFolder["createFolder"]>) {
		if (this.isValid())
			this.linkedFolder.createFolder(...args);
		return this;
	}

	createFolders(...args: Parameters<VirtualFolder["createFolders"]>) {
		if (this.isValid())
			this.linkedFolder.createFolders(...args);
		return this;
	}

	hasFile(...args: Parameters<VirtualFolder["hasFile"]>): ReturnType<VirtualFolder["hasFile"]> | undefined {
		if (this.isValid()) return this.linkedFolder.hasFile(...args);
	}

	hasFolder(...args: Parameters<VirtualFolder["hasFolder"]>): ReturnType<VirtualFolder["hasFolder"]> | undefined {
		if (this.isValid()) return this.linkedFolder.hasFolder(...args);
	}

	findFile(...args: Parameters<VirtualFolder["findFile"]>): ReturnType<VirtualFolder["findFile"]> | undefined {
		if (this.isValid()) return this.linkedFolder.findFile(...args);
	}

	findSubFolder(...args: Parameters<VirtualFolder["findSubFolder"]>): ReturnType<VirtualFolder["findSubFolder"]> | undefined {
		if (this.isValid()) return this.linkedFolder.findSubFolder(...args);
	}

	getFiles(...args: Parameters<VirtualFolder["getFiles"]>): ReturnType<VirtualFolder["getFiles"]> | undefined {
		if (this.isValid()) return this.linkedFolder.getFiles(...args);
	}

	getSubFolders(...args: Parameters<VirtualFolder["getSubFolders"]>): ReturnType<VirtualFolder["getSubFolders"]> | undefined {
		if (this.isValid()) return this.linkedFolder.getSubFolders(...args);
	}

	open(...args: Parameters<VirtualFolder["open"]>): ReturnType<VirtualFolder["open"]> | undefined {
		if (this.isValid()) return this.linkedFolder.open(...args);
	}

	getItemCount(...args: Parameters<VirtualFolder["getItemCount"]>): ReturnType<VirtualFolder["getItemCount"]> | undefined {
		if (this.isValid()) return this.linkedFolder.getItemCount(...args);
	}
}
import { APPS } from "../../../constants/apps.const";
import { AppsManager } from "../../apps/appsManager";
import { VirtualFolder } from ".";
import { VirtualFolderJson } from "./virtualFolder";

export interface VirtualFolderLinkJson extends VirtualFolderJson {
	lnk: string;
}

/**
 * A link that points to a virtual folder
 */
export class VirtualFolderLink extends VirtualFolder {
	linkedPath?: string;

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
			return this;

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

		if (this.isValid() && this.linkedFolder?.iconUrl)
			return this.linkedFolder.iconUrl;

		return AppsManager.getAppIconUrl(APPS.FILE_EXPLORER, "folder-link");
	}

	toJSON(): VirtualFolderLinkJson | null {
		if (this.linkedPath == null)
			return null;

		const object = {
			nam: this.name,
			lnk: this.linkedPath
		};

		return object;
	}

	// Point certain methods to linked folder

	setAlias(...args: Parameters<VirtualFolder["setAlias"]>) {
		if (this.isValid())
			this.linkedFolder?.setAlias(...args);
		return this;
	}

	createFile(...args: Parameters<VirtualFolder["createFile"]>) {
		if (this.isValid())
			this.linkedFolder?.createFile(...args);
		return this;
	}

	createFiles(...args: Parameters<VirtualFolder["createFiles"]>) {
		if (this.isValid())
			this.linkedFolder?.createFiles(...args);
		return this;
	}

	createFolder(...args: Parameters<VirtualFolder["createFolder"]>) {
		if (this.isValid())
			this.linkedFolder?.createFolder(...args);
		return this;
	}

	createFolders(...args: Parameters<VirtualFolder["createFolders"]>) {
		if (this.isValid())
			this.linkedFolder?.createFolders(...args);
		return this;
	}

	hasFile(...args: Parameters<VirtualFolder["hasFile"]>): ReturnType<VirtualFolder["hasFile"]> {
		if (this.isValid()) return this.linkedFolder?.hasFile(...args) ?? false;
		return false;
	}

	hasFolder(...args: Parameters<VirtualFolder["hasFolder"]>): ReturnType<VirtualFolder["hasFolder"]> {
		if (this.isValid()) return this.linkedFolder?.hasFolder(...args) ?? false;
		return false;
	}

	findFile(...args: Parameters<VirtualFolder["findFile"]>): ReturnType<VirtualFolder["findFile"]> {
		if (this.isValid()) return this.linkedFolder?.findFile(...args) as ReturnType<VirtualFolder["findFile"]>;
		return null;
	}

	findSubFolder(...args: Parameters<VirtualFolder["findSubFolder"]>): ReturnType<VirtualFolder["findSubFolder"]> {
		if (this.isValid()) return this.linkedFolder?.findSubFolder(...args) as ReturnType<VirtualFolder["findSubFolder"]>;
		return null;
	}

	getFiles(...args: Parameters<VirtualFolder["getFiles"]>): ReturnType<VirtualFolder["getFiles"]> {
		if (this.isValid()) return this.linkedFolder?.getFiles(...args) ?? [];
		return [];
	}

	getSubFolders(...args: Parameters<VirtualFolder["getSubFolders"]>): ReturnType<VirtualFolder["getSubFolders"]> {
		if (this.isValid()) return this.linkedFolder?.getSubFolders(...args) ?? [];
		return [];
	}

	open(...args: Parameters<VirtualFolder["open"]>): ReturnType<VirtualFolder["open"]> {
		if (this.isValid()) return this.linkedFolder?.open(...args) as ReturnType<VirtualFolder["open"]>;
		return null;
	}

	getItemCount(...args: Parameters<VirtualFolder["getItemCount"]>): ReturnType<VirtualFolder["getItemCount"]> {
		if (this.isValid()) return this.linkedFolder?.getItemCount(...args) ?? 0;
		return 0;
	}
}
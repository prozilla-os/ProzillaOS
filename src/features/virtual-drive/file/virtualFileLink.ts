import { VirtualFile } from ".";
import { APPS } from "../../../config/apps.config";
import { AppsManager } from "../../apps/appsManager";
import { VirtualFileJson } from "./virtualFile";

export interface VirtualFileLinkJson extends VirtualFileJson {
	lnk: string;
}

/**
 * A link that points to a virtual file
 */
export class VirtualFileLink extends VirtualFile {
	linkedPath?: string;

	constructor(name: string, linkedFile?: VirtualFile) {
		super(name);
		this.linkedFile = linkedFile;
	}

	setLinkedFile(file: VirtualFile): VirtualFileLink {
		this.linkedFile = file;

		if (file) {
			this.linkedPath = file.path;
			this.extension = file.extension;
			this.content = file.content;
			this.source = file.source;
		}
		
		return this;
	}

	setLinkedPath(path: string): VirtualFileLink {
		if (this.linkedFile && this.linkedFile.path === path)
			return this;

		const target = this.parent?.navigate(path);

		if (target instanceof VirtualFile) {
			this.setLinkedFile(target);
		} else {
			this.linkedFile = null;
		}

		return this;
	}

	isValid(): boolean {
		if (!this.linkedPath)
			return false;

		this.setLinkedPath(this.linkedPath);

		return (this.linkedFile != null);
	}

	toJSON(): VirtualFileLinkJson | null {
		if (this.linkedPath == null)
			return null;

		const object = {
			nam: this.name,
			lnk: this.linkedPath
		};

		return object;
	}

	// Point certain methods to linked file

	setAlias(...args: Parameters<VirtualFile["setAlias"]>) {
		if (this.isValid())
			this.linkedFile?.setAlias(...args);
		return this;
	}

	setSource(...args: Parameters<VirtualFile["setSource"]>) {
		if (this.isValid())
			this.linkedFile?.setSource(...args);
		return this;
	}

	setContent(...args: Parameters<VirtualFile["setContent"]>) {
		if (this.isValid())
			this.linkedFile?.setContent(...args);
		return this;
	}

	get id() {
		return this.isValid() ? this.linkedFile?.id ?? "" : "";
	}

	open(...args: Parameters<VirtualFile["open"]>): ReturnType<VirtualFile["open"]>  {
		if (this.isValid()) return this.linkedFile?.open(...args) as ReturnType<VirtualFile["open"]>;
		return null;
	}

	async read(...args: Parameters<VirtualFile["read"]>): Promise<string | null | undefined>  {
		if (this.isValid())	return await this.linkedFile?.read(...args);
	}

	getIconUrl(...args: Parameters<VirtualFile["getIconUrl"]>): ReturnType<VirtualFile["getIconUrl"]>  {
		const defaultIconUrl = AppsManager.getAppIconUrl(APPS.FILE_EXPLORER, "file");
		if (this.isValid()) {
			return this.iconUrl ?? this.linkedFile?.getIconUrl(...args) ?? defaultIconUrl;
		} else {
			return defaultIconUrl;
		}
	}
}
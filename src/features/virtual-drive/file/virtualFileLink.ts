import { VirtualFile, VirtualFileJson } from "./virtualFile";

export interface VirtualFileLinkJson extends VirtualFileJson {
	lnk: string;
}

/**
 * A link that points to a virtual file
 */
export class VirtualFileLink extends VirtualFile {
	linkedPath: string;

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
			return;

		const target = this.parent.navigate(path);

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
			return;

		const object = {
			nam: this.name,
			lnk: this.linkedPath
		};

		return object;
	}

	// Point certain methods to linked file

	setAlias(...args: Parameters<VirtualFile["setAlias"]>) {
		if (this.isValid())
			this.linkedFile.setAlias(...args);
		return this;
	}

	setSource(...args: Parameters<VirtualFile["setSource"]>) {
		if (this.isValid())
			this.linkedFile.setSource(...args);
		return this;
	}

	setContent(...args: Parameters<VirtualFile["setContent"]>) {
		if (this.isValid())
			this.linkedFile.setContent(...args);
		return this;
	}

	get id() {
		return this.isValid() ? this.linkedFile.id : null;
	}

	open(...args: Parameters<VirtualFile["open"]>): ReturnType<VirtualFile["open"]> | undefined  {
		if (this.isValid()) return this.linkedFile.open(...args);
	}

	read(...args: Parameters<VirtualFile["read"]>): ReturnType<VirtualFile["read"]> | undefined  {
		if (this.isValid()) return this.linkedFile.read(...args);
	}

	getIconUrl(...args: Parameters<VirtualFile["getIconUrl"]>): ReturnType<VirtualFile["getIconUrl"]> | undefined  {
		if (this.isValid()) return this.iconUrl ?? this.linkedFile.getIconUrl(...args);
	}
}
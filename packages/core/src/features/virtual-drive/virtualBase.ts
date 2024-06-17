import { EventEmitter, EventNamesMap } from "../_utils/event.utils";
import { VirtualRoot } from "./root/virtualRoot";
import { VirtualFile } from "./file";
import { VirtualFolder } from "./folder";

export interface VirtualBaseJson {
	nam: string;
	ico?: string;
}

export class VirtualBase extends EventEmitter<EventNamesMap> {
	name: string;
	alias: string | undefined | null;
	parent: VirtualFolder | undefined | null;
	isProtected: boolean | undefined | null;
	iconUrl: string | undefined | null;
	linkedFile: VirtualFile | undefined | null;
	linkedFolder: VirtualFolder | undefined | null;
	editedByUser: boolean | undefined | null;
	isRoot: boolean | undefined | null;
	root: VirtualRoot | undefined | null;

	constructor(name: string) {
		super();
		this.name = name;
	}

	get id() {
		return this.name;
	}

	setName(name: string): this {
		if (this.name === name || !this.canBeEdited)
			return this;

		this.name = name;
		
		this.confirmChanges();
		return this;
	}

	setAlias(alias: string): this {
		if (this.alias === alias || !this.canBeEdited)
			return this;;

		this.alias = alias;
		this.getRoot().addShortcut(alias, this as never);

		this.confirmChanges();
		return this;
	}

	setParent(parent: VirtualFolder): this {
		if (this.parent === parent || !this.canBeEdited)
			return this;

		this.parent = parent;

		this.confirmChanges();
		return this;
	}

	setProtected(value: boolean): this {
		if (!this.canBeEdited)
			return this;

		this.isProtected = value;
		return this;
	}

	setIconUrl(iconUrl: string | null): this {
		if (this.iconUrl === iconUrl || !this.canBeEdited)
			return this;

		this.iconUrl = iconUrl;

		this.confirmChanges();
		return this;
	}

	getIconUrl(): string {
		if (this.iconUrl != null) return this.iconUrl;
		if (this.linkedFile?.iconUrl != null) return this.linkedFile.iconUrl;
		if (this.linkedFolder?.iconUrl != null) return this.linkedFolder.iconUrl;

		const { virtualDriveConfig } = this.getRoot().systemManager;
		return virtualDriveConfig.fileIcon;
	}

	getType(): string {
		return "None";
	}

	delete() {
		if (!this.canBeEdited)
			return;

		const parent = this.parent;

		if (parent == null)
			return;

		parent.remove?.(this as never);
		this.confirmChanges(parent.getRoot());
	}

	confirmChanges(root?: VirtualRoot) {
		if (root == null)
			root = this.getRoot();

		if (root?.loadedDefaultData)
			this.editedByUser = true;

		root?.saveData();
	}

	open(..._args: unknown[]): unknown {
		return null;
	};

	get path(): string {
		return this.alias ?? this.displayPath;
	}

	/**
	 * Returns path without using alias
	 */
	get displayPath() {
		return this.parent?.path + "/" + this.id;
	}

	/**
	 * Returns path without using any aliases
	 */
	get absolutePath(): string {
		if (this.parent?.isRoot) {
			return "/" + this.id;
		} else {
			return this.parent?.absolutePath + "/" + this.id;
		}
	}

	/**
	 * Returns whether this can be edited in its current state
	 */
	get canBeEdited(): boolean {
		const isProtected = this.isProtected && this.getRoot().loadedDefaultData;

		if (!isProtected && this.parent != null) {
			return this.parent.canBeEdited;
		} else {
			return !isProtected;
		}
	}

	getRoot(): VirtualRoot {
		const root = this.root ?? this.parent?.getRoot();

		if (root == null) {
			throw new Error("Root not found");
		}

		return root;
	}

	isFile(): boolean {
		return false;
	}

	isFolder(): boolean {
		return false;
	}

	toJSON(): VirtualBaseJson | null {
		const object = {
			nam: this.name,
			ico: this.iconUrl,
		} as VirtualBaseJson;

		return object;
	}

	toString(): string | null {
		const json = this.toJSON();

		if (json == null)
			return null;

		return JSON.stringify(json);
	}
}
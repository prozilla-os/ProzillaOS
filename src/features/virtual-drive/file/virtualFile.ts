import { APPS } from "../../../config/apps.config";
import { IMAGE_FORMATS } from "../../../config/apps/mediaViewer.config";
import { AppsManager } from "../../apps/appsManager";
import { WindowsManager } from "../../windows/windowsManager";
import { VirtualBase, VirtualBaseJson } from "../virtualBase";

export interface VirtualFileJson extends VirtualBaseJson {
	ext?: string;
	cnt?: string;
	src?: string;
}

type OptionalStringProperty = string | null | undefined;

/**
 * A virtual file that can be stored inside a folder
 */
export class VirtualFile extends VirtualBase {
	extension: OptionalStringProperty;
	source: OptionalStringProperty;
	content: OptionalStringProperty;

	static NON_TEXT_EXTENSIONS = [
		"png"
	];

	static EVENT_NAMES = {
		CONTENT_CHANGE: "contentchange"
	};

	constructor(name: string, extension?: string | undefined) {
		super(name);
		this.extension = extension;
	}

	setAlias(alias: string): this {
		return super.setAlias(alias);
	}

	/**
	 * Sets the source of this file and removes the content
	 */
	setSource(source: string): this {
		if (this.source === source || !this.canBeEdited)
			return this;

		this.source = source;
		this.content = null;

		this.emit(VirtualFile.EVENT_NAMES.CONTENT_CHANGE, this);

		this.confirmChanges();
		return this;
	}

	/**
	 * Sets the content of this file and removes the source
	 */
	setContent(content: string): this {
		if (this.content === content || !this.canBeEdited)
			return this;

		this.content = content;
		this.source = null;

		this.emit(VirtualFile.EVENT_NAMES.CONTENT_CHANGE, this);

		this.confirmChanges();
		return this;
	}

	get id() {
		if (this.extension == null || this.extension.trim() === "")
			return this.name;

		return `${this.name}.${this.extension}`;
	}

	static splitId(id: string): {
		name: string;
		extension: OptionalStringProperty;
	} {
		if (!id.includes("."))
			return { name: id, extension: "" };

		const sections = id.split(".");
		const extension = sections.pop();
		const name = sections.join(".");
		return { name, extension };
	}

	/**
	 * Opens this file in an app associated with its extension
	 */
	open(windowsManager: WindowsManager): object | null {
		return windowsManager.openFile(this);
	}

	async read(): Promise<OptionalStringProperty | undefined> {
		if (this.content != null) return this.content;
		if (this.source == null) return null;

		const isText = this.extension == null || !VirtualFile.NON_TEXT_EXTENSIONS.includes(this.extension);

		if (!isText) return this.source;

		return await fetch(this.source).then((response) => {
			return response.text();
		}).catch((error) => {
			console.error(`Error while reading file with id "${this.id}":`, error);
			return null;
		}) as string;
	}

	isFile(): boolean {
		return true;
	}

	getIconUrl(): string {
		if (this.iconUrl != null)
			return this.iconUrl;

		let iconUrl = null;

		if (this.source != null && this.extension != null && IMAGE_FORMATS.includes(this.extension))
			return this.source;

		switch (this.extension) {
			case "txt":
			case "md":
				iconUrl = AppsManager.getAppIconUrl(APPS.FILE_EXPLORER, "file-text");
				break;
			case "xml":
			case "js":
			case "json":
			case "jsx":
			case "ts":
			case "tsx":
			case "css":
			case "html":
			case "yml":
				iconUrl = AppsManager.getAppIconUrl(APPS.FILE_EXPLORER, "file-code");
				break;
			default:
				iconUrl = AppsManager.getAppIconUrl(APPS.FILE_EXPLORER, "file");
				break;
		}

		return iconUrl;
	}

	getType(): string {
		let type = "";

		if (this.extension == null) return "Unknown file";

		switch (this.extension) {
			case "png":
				type = "PNG Image";
				break;
			case "txt":
				type = "Text";
				break;
			case "md":
				type = "Markdown source";
				break;
			case "xml":
				type = "XML source";
				break;
		}

		return `${type} file (.${this.extension.toLowerCase()})`.trim();
	}

	toJSON(): VirtualFileJson | null {
		// Don't return file if it can't or hasn't been edited
		if (!this.canBeEdited || (this.editedByUser == null || !this.editedByUser))
			return null;

		const object = super.toJSON() as VirtualFileJson;

		if (object == null)
			return null;
		
		if (this.extension != null) {
			object.ext = this.extension;
		}

		if (this.content != null) {
			object.cnt = this.content;
		} else if (this.source != null) {
			object.src = this.source;
		}

		return object;
	}
}
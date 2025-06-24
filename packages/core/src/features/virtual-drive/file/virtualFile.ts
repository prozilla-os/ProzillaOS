import { FILE_SCHEMES, IMAGE_EXTENSIONS } from "../../../constants/virtualDrive.const";
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
		"png",
	];

	static EVENT_NAMES = {
		contentChange: "contentchange",
		...super.EVENT_NAMES,
	};

	constructor(name: string, extension?: string  ) {
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

		this.emit(VirtualFile.EVENT_NAMES.contentChange, this);

		this.confirmChanges();
		return this;
	}

	/**
	 * Sets the content of this file and removes the source
	 */
	setContent(content: string | string[]): this {
		if (this.content === content || !this.canBeEdited)
			return this;

		this.content = typeof content === "string" ? content : content.join("\n");
		this.source = null;

		this.emit(VirtualFile.EVENT_NAMES.contentChange, this);

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
		if (this.isDeleted) return null;
		if (this.content != null) return this.content;
		if (this.source == null) return null;

		const isText = this.extension == null || !VirtualFile.NON_TEXT_EXTENSIONS.includes(this.extension);

		if (!isText) return this.source;

		return await fetch(this.source).then((response) =>
			response.text()
		).catch((error) => {
			console.error(`Error while reading file with ID: ${this.id}\n`, error);
			return null;
		}) as string;
	}

	isFile(): boolean {
		return true;
	}

	getIconUrl(): string {
		if (this.isDeleted)
			return super.getIconUrl();

		if (this.iconUrl != null)
			return this.iconUrl;

		const { skin, appsConfig } = this.getRoot().systemManager;

		if (this.source != null) {
			if (this.extension != null && IMAGE_EXTENSIONS.includes(this.extension)) {
				return this.source;
			} else if (this.source.startsWith(FILE_SCHEMES.app)) {
				const app = appsConfig.getAppById(VirtualFile.removeFileScheme(this.source));

				if (app?.iconUrl != null)
					return app?.iconUrl;
			} else if (this.source.startsWith(FILE_SCHEMES.external) && skin.fileIcons.external != null) {
				return skin.fileIcons.external;
			}
		}

		let iconUrl = null;

		switch (this.extension) {
			case "txt":
			case "md":
				iconUrl = skin.fileIcons.text ?? skin.fileIcons.generic;
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
				iconUrl = skin.fileIcons.code ?? skin.fileIcons.generic;
				break;
			default:
				iconUrl = skin.fileIcons.generic;
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

	download() {
		if (!this.isDownloadable()) {
			return;
		}

		void this.read().then((content) => {
			if (content) {
				const blob = new Blob([content], { type: "text/plain" });
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = this.id;
				document.body.appendChild(a);
				a.click();
				window.URL.revokeObjectURL(url);
				document.body.removeChild(a);
			}
		}).catch((error) => {
			console.error("Error while downloading file:", error);
		});
	}

	isDownloadable(): boolean {
		if (this.content != null) {
			return true;
		} else if (this.source != null) {
			return !this.source.startsWith(FILE_SCHEMES.external) && !this.source.startsWith(FILE_SCHEMES.app);
		}
		return false;
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

	static removeFileScheme(source: string) {
		let done = false;
		
		Object.values(FILE_SCHEMES).forEach((scheme) => {
			if (source.startsWith(scheme) && !done) {
				source.replace(scheme, "");
				done = true;
			}
		});

		return source;
	}
}
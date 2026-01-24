import { Listener, parseBool } from "@prozilla-os/shared";
import { VirtualFile } from "../virtual-drive/file";
import { VirtualRoot } from "../virtual-drive/root/virtualRoot";

const PARENT_NODE = "options";

export class Settings {
	path: string;
	file: VirtualFile;
	xmlDoc?: Document;
	#virtualRoot?: VirtualRoot;

	constructor(virtualRoot: VirtualRoot, path: string) {
		this.#virtualRoot = virtualRoot;
		this.path = path;
		this.file = this.#virtualRoot.navigate(this.path) as VirtualFile;

		if (this.file == null) {
			console.warn(`Unable to read settings from path: ${this.path}\nNo such file or directory.`);
			return;
		} else if (!(this.file instanceof VirtualFile)) {
			console.warn(`Unable to read settings from path: ${this.path}\nPath does not point to VirtualFile.`);
			return;
		} else if (this.file.extension !== "xml") {
			console.warn(`Unable to read settings from path: ${this.path}\nFile does not have extension "xml".`);
			return;
		}
	}

	/**
	 * Reads the xml doc from the given path and assigns it to itself
	 */
	async read(): Promise<void> {
		if (!this.file)
			return;

		const text = await this.file.read();

		if (!text)
			return;

		const parser = new DOMParser();
    	const xmlDoc = parser.parseFromString(text, "text/xml");

		this.xmlDoc = xmlDoc;
	}

	write() {
		if (this.file == null || this.xmlDoc == null)
			return;

		const serializer = new XMLSerializer();
		const xmlString = serializer.serializeToString(this.xmlDoc);

		this.file.setContent(xmlString);
	}

	/**
	 * Checks if xml doc is missing
	 */
	async isMissingXmlDoc(): Promise<boolean> {
		if (this.xmlDoc == null)
			await this.read();

		return (this.xmlDoc == null);
	}

	/**
	 * Gets a value by a given key if it exists and optionally calls a callback function whenever the value changes
	 * @param key The key of the setting
	 * @param callback The callback function to call whenever the value changes
	 */
	async get(key: string, callback?: (value: string) => void): Promise<{ value: string | null, listener?: Listener }> {
		if (await this.isMissingXmlDoc())
			return { value: null };

		let value = this.xmlDoc?.getElementsByTagName(key)?.[0]?.textContent as string | null;
		let listener: Listener | undefined;

		if (callback) {
			if (value != null) callback(value);

			listener = this.file.on(VirtualFile.EVENT_NAMES.contentChange, () => {
				void (async () => {
					await this.read();
					const newValue = (await this.get(key)).value;

					if (newValue != null && newValue !== value) {
						callback(newValue);
						value = newValue;
					}
				})();
			});
		}

		return { value, listener };
	}

	async #getParsed<Type>(key: string, parser: (value: string) => Type, callback?: (value: Type) => void): Promise<{ value: Type | null, listener?: Listener }> {
		let result: { value: string | null, listener?: Listener } = { value: null };
		if (callback !== undefined) {
			result = await this.get(key, (value) => {
				callback?.(parser(value));
			});
		} else {
			result = await this.get(key);
		}

		return {
			value: result.value ? parser(result.value) : null,
			listener: result.listener,
		};
	}

	/**
	 * Gets a value by a given key as a boolean
	 */
	async getBool(key: string, callback?: (value: boolean) => void): Promise<{ value: boolean | null, listener?: Listener }> {
		return await this.#getParsed(key, parseBool, callback);
	}

	/**
	 * Gets a value by a given key as an integer
	 */
	async getInt(key: string, callback?: (value: number) => void): Promise<{ value: number | null, listener?: Listener }> {
		return await this.#getParsed(key, parseInt, callback);
	}

	/**
	 * Sets the value associated with a given key
	 * @param key The key of the setting
	 * @param value The new value
	 */
	async set(key: string, value: string) {
		if (await this.isMissingXmlDoc() || this.xmlDoc == null)
			return;

		if (this.xmlDoc.getElementsByTagName(key).length > 0) {
			this.xmlDoc.getElementsByTagName(key)[0].textContent = value;
		} else if (this.xmlDoc.getElementsByTagName(PARENT_NODE).length > 0) {
			const newOption = this.xmlDoc.createElement(key);
			newOption.textContent = value;
			this.xmlDoc.getElementsByTagName(PARENT_NODE)[0].appendChild(newOption);
		}

		this.write();
	}

	/**
	 * Removes a listener from the settings file
	 * @param listener The listener to remove
	 */
	removeListener(listener: Listener) {
		this.file.off(VirtualFile.EVENT_NAMES.contentChange, listener);
	}
}
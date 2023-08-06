// eslint-disable-next-line no-unused-vars
import { VirtualFile } from "../virtual-drive/virtual-file.js";
// eslint-disable-next-line no-unused-vars
import { VirtualRoot } from "../virtual-drive/virtual-root.js";

export class Settings {
	xmlDoc = null;

	/**
	 * @type {VirtualRoot}
	 */
	#virtualRoot = null;

	/**
	 * @param {VirtualRoot} virtualRoot 
	 * @param {string} path 
	 */
	constructor(virtualRoot, path) {
		this.#virtualRoot = virtualRoot;
		this.path = path;
		this.file = this.#virtualRoot.navigate(this.path);

		if (this.file == null) {
			console.warn(`Unable to read settings from path: ${this.path}\nNo such file or directory.`);
			return null;
		} else if (!(this.file instanceof VirtualFile)) {
			console.warn(`Unable to read settings from path: ${this.path}\nPath does not point to VirtualFile.`);
			return null;
		} else if (this.file.extension !== "xml") {
			console.warn(`Unable to read settings from path: ${this.path}\nFile does not have extension "xml".`);
			return null;
		}
	}

	/**
	 * Reads the xml doc from the given path and assigns it to itself
	 * @returns {Promise<Settings>}
	 */
	async read() {
		if (!this.file)
			return;

		const text = await this.file.read();

		if (!text)
			return;

		const parser = new DOMParser();
    	const xmlDoc = parser.parseFromString(text, "text/xml");

		this.xmlDoc = xmlDoc;
	}

	async write() {
		if (!this.file)
			return;

		const serializer = new XMLSerializer();
		const xmlString = serializer.serializeToString(this.xmlDoc);

		this.file.setContent(xmlString);
	}

	/**
	 * Checks if xml doc is missing
	 * @returns {Promise<boolean>}
	 */
	async isMissingXmlDoc() {
		if (this.xmlDoc == null)
			await this.read();

		return (this.xmlDoc == null);
	}

	/**
	 * @callback valueCallback
	 * @param {string} value
	 */

	/**
	 * Gets a value by a given key if it exists or calls a callback function whenever the value changes
	 * @param {string} key 
	 * @param {valueCallback} callback
	 * @returns {Promise<string | null>}
	 */
	async get(key, callback) {
		if (await this.isMissingXmlDoc())
			return null;

		let value = this.xmlDoc.getElementsByTagName(key)?.[0]?.textContent;

		if (callback) {
			callback(value);

			this.file.on(VirtualFile.EVENT_NAMES.CONTENT_CHANGE, async () => {
				await this.read();
				const newValue = await this.get(key);

				if (newValue !== value) {
					callback(newValue);
					value = newValue;
				}
			});
		}

		return value;
	}

	/**
	 * @param {string} key 
	 * @param {string} value 
	 */
	async set(key, value) {
		if (await this.isMissingXmlDoc())
			return;

		if (this.xmlDoc.getElementsByTagName(key)?.[0])
			this.xmlDoc.getElementsByTagName(key)[0].textContent = value;

		await this.write();
	}
}

export class SettingsManager {
	/**
	 * @type {Object<string, string>}
	 */
	static VIRTUAL_PATHS = {
		"desktop": "~/.config/desktop.xml"
	};

	/**
	 * @type {Object<string, Settings>}
	 */
	#pathToSettings = {};

	/**
	 * @type {VirtualRoot}
	 */
	#virtualRoot = null;

	/**
	 * @param {VirtualRoot} virtualRoot 
	 */
	constructor(virtualRoot) {
		this.#virtualRoot = virtualRoot;

		Object.values(SettingsManager.VIRTUAL_PATHS).forEach((path) => {
			this.#pathToSettings[path] = new Settings(this.#virtualRoot, path);
		});
	}

	/**
	 * @param {string} path 
	 * @returns {Settings}
	 */
	get(path) {
		return this.#pathToSettings[path];
	}
}
import { VirtualDriveStorage, VirtualRoot } from "../../virtual-drive";

export interface VirtualDriveConfigOptions {
	/**
	 * Enables persistent storage of the virtual drive.
	 * @default {
	enableCompression: true,
	prefix: "pos-"
}
	 */
	saveData: false | {
		/**
		 * Enables compression of stored items.
		 * @default false
		 */
		enableCompression: boolean;

		/**
		 * The prefix to prepend to stored keys.
		 * @default "pos-"
		 */
		prefix?: string;

		/**
		 * An array of tuples of old and new keys to migrate.
		 * @default [["data", VirtualDriveStorage.KEY]]
		 */
		migrations?: [string, string][];
	};

	/**
	 * Configure the data that is loaded initially when ProzillaOS is opened.
	 */
	defaultData: {
		/**
		 * Include pictures folder in default data.
		 * @default true
		 */
		includePicturesFolder?: boolean;

		/**
		 * Include documents folder in default data.
		 * @default true
		 */
		includeDocumentsFolder?: boolean;

		/**
		 * Include desktop folder in default data.
		 * @default true
		 */
		includeDesktopFolder?: boolean;

		/**
		 * Include source tree folder in default data.
		 * @default true
		 */
		includeSourceTree?: boolean;

		/**
		 * Include apps folder in default data.
		 * @default true
		 */
		includeAppsFolder?: boolean;

		loadData?: (virtualRoot: VirtualRoot) => void;
	};
}

export class VirtualDriveConfig {
	saveData: VirtualDriveConfigOptions["saveData"];
	defaultData: VirtualDriveConfigOptions["defaultData"];

	constructor(options: Partial<VirtualDriveConfigOptions> = {}) {
		const { saveData, defaultData } = options;

		this.saveData = saveData ?? {
			enableCompression: false,
			prefix: "pos-",
			migrations: [["data", VirtualDriveStorage.KEY]],
		};

		this.defaultData = {
			includePicturesFolder: true,
			includeDocumentsFolder: true,
			includeDesktopFolder: true,
			includeSourceTree: true,
			includeAppsFolder: true,
			...defaultData,
		};
	}
}
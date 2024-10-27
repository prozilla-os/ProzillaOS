import { OptionalInterface } from "../../../types/utils";
import { VirtualRoot } from "../../virtual-drive";

export interface VirtualDriveConfigOptions {
	/**
	 * Enables persistent storage of the virtual drive
	 * @default true
	 */
	saveData: boolean;

	/**
	 * Configure the data that is loaded initially when ProzillaOS is opened
	 */
	defaultData: {
		/**
		 * Include pictures folder in default data
		 * @default true
		 */
		includePicturesFolder?: boolean;

		/**
		 * Include documents folder in default data
		 * @default true
		 */
		includeDocumentsFolder?: boolean;

		/**
		 * Include desktop folder in default data
		 * @default true
		 */
		includeDesktopFolder?: boolean;

		/**
		 * Include source tree folder in default data
		 * @default true
		 */
		includeSourceTree?: boolean;

		/**
		 * Include apps folder in default data
		 * @default true
		 */
		includeAppsFolder?: boolean;

		loadData?: (virtualRoot: VirtualRoot) => void;
	};
}

export class VirtualDriveConfig {
	saveData: VirtualDriveConfigOptions["saveData"];
	defaultData: VirtualDriveConfigOptions["defaultData"];

	constructor(options: OptionalInterface<VirtualDriveConfigOptions> = {}) {
		const { saveData, defaultData } = options as VirtualDriveConfigOptions;

		this.saveData = saveData ?? true;

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
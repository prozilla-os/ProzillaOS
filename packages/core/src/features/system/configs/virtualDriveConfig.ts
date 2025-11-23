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

    /**
     * Include audio folder in default data
     * @default true
     */
    includeAudioFolder?: boolean;

    /**
     * Include video folder in default data
     * @default true
     */
    includeVideoFolder?: boolean;

    loadData?: (virtualRoot: VirtualRoot) => void;
  };
}

export class VirtualDriveConfig {
	saveData: VirtualDriveConfigOptions["saveData"];
	defaultData: VirtualDriveConfigOptions["defaultData"];

	constructor(options: Partial<VirtualDriveConfigOptions> = {}) {
		const { saveData, defaultData } = options as VirtualDriveConfigOptions;

		this.saveData = saveData ?? true;

		this.defaultData = {
			includeDesktopFolder: true,
			includeSourceTree: true,
			includeAppsFolder: true,
			includeAudioFolder: true,
			includeVideoFolder: true,
			...defaultData,
		};
	}
}

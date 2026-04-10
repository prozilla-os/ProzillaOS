import { AppsConfig, DesktopConfig, MiscConfig, ModalsConfig, SystemManager, SystemManagerParams, TaskbarConfig, TrackingConfig, VirtualDriveConfig, WindowsConfig } from "../../../src/features";

export class MockSystemManager extends SystemManager {

	constructor(params: Partial<SystemManagerParams> = {}) {
		const {
			systemName,
			tagLine,
			appsConfig,
			desktopConfig,
			miscConfig,
			modalsConfig,
			taskbarConfig,
			trackingConfig,
			windowsConfig,
			virtualDriveConfig,
		} = params;

		super({
			systemName: systemName ?? null,
			tagLine: tagLine ?? null,
			appsConfig: appsConfig ?? new AppsConfig(),
			desktopConfig: desktopConfig ?? new DesktopConfig(),
			miscConfig: miscConfig ?? new MiscConfig(),
			modalsConfig: modalsConfig ?? new ModalsConfig(),
			taskbarConfig: taskbarConfig ?? new TaskbarConfig(),
			trackingConfig: trackingConfig ?? new TrackingConfig(),
			windowsConfig: windowsConfig ?? new WindowsConfig(),
			virtualDriveConfig: virtualDriveConfig ?? new VirtualDriveConfig({
				defaultData: {
					includeAppsFolder: true,
					includeDesktopFolder: true,
					includeDocumentsFolder: true,
					includePicturesFolder: true,
					includeSourceTree: false,
				},
				saveData: false,
			}),
		});
	}

}
import { formatRelativeTime } from "../_utils";
import { Skin } from "@prozilla-os/skins";
import { VirtualDriveConfig } from "./configs";
import { AppsConfig } from "./configs/appsConfig";
import { DesktopConfig } from "./configs/desktopConfig";
import { MiscConfig } from "./configs/miscConfig";
import { ModalsConfig } from "./configs/modalsConfig";
import { TaskbarConfig } from "./configs/taskbarConfig";
import { TrackingConfig } from "./configs/trackingConfig";
import { WindowsConfig } from "./configs/windowsConfig";

export interface SystemManagerParams {
	systemName: SystemManager["systemName"] | null;
	tagLine: SystemManager["tagLine"] | null;

	skin?: SystemManager["skin"];

	desktopConfig: DesktopConfig;
	appsConfig: AppsConfig;
	miscConfig: MiscConfig;
	modalsConfig: ModalsConfig;
	taskbarConfig: TaskbarConfig;
	trackingConfig: TrackingConfig;
	windowsConfig: WindowsConfig;
	virtualDriveConfig: VirtualDriveConfig;
}; 

export class SystemManager {
	systemName: string;
	tagLine: string;
	#startDate: Date;

	skin?: Skin;

	appsConfig: AppsConfig;
	desktopConfig: DesktopConfig;
	miscConfig: MiscConfig;
	modalsConfig: ModalsConfig;
	taskbarConfig: TaskbarConfig;
	trackingConfig: TrackingConfig;
	windowsConfig: WindowsConfig;
	virtualDriveConfig: VirtualDriveConfig;

	constructor({
		systemName,
		tagLine,
		skin,
		desktopConfig,
		appsConfig,
		miscConfig,
		modalsConfig,
		taskbarConfig,
		trackingConfig,
		windowsConfig,
		virtualDriveConfig
	}: SystemManagerParams) {
		this.systemName = systemName ?? "ProzillaOS";
		this.tagLine = tagLine ?? "Web-based Operating System";

		this.skin = skin;

		this.desktopConfig = desktopConfig;
		this.appsConfig = appsConfig;
		this.miscConfig = miscConfig;
		this.modalsConfig = modalsConfig;
		this.taskbarConfig = taskbarConfig;
		this.trackingConfig = trackingConfig;
		this.windowsConfig = windowsConfig;
		this.virtualDriveConfig = virtualDriveConfig;

		if (this.skin != null) {
			const skin = this.skin;

			if (skin.appIcons != null) {
				const appIcons = skin.appIcons as { [key: string]: string };

				this.appsConfig.apps.forEach((app) => {
					if (Object.keys(appIcons).includes(app.id))
						app.setIconUrl(appIcons[app.id]);
				});
			}

			if (skin.wallpapers != null)
				this.desktopConfig.wallpapers = this.desktopConfig.wallpapers.concat(skin.wallpapers);

			if (skin.defaultWallpaper != null)
				this.desktopConfig.defaultWallpaper = skin.defaultWallpaper;

			if (skin.fileIcons != null) {
				this.virtualDriveConfig.fileIcon = skin.fileIcons.generic;
				this.virtualDriveConfig.infoFileIcon = skin.fileIcons.info ?? skin.fileIcons.generic;
				this.virtualDriveConfig.textFileIcon = skin.fileIcons.text ?? skin.fileIcons.generic;
				this.virtualDriveConfig.codeFileIcon = skin.fileIcons.code ?? skin.fileIcons.generic;
			}

			if (skin.folderIcons != null) {
				this.virtualDriveConfig.folderIcon = skin.folderIcons.generic;
				this.virtualDriveConfig.textFolderIcon = skin.folderIcons.text ?? skin.folderIcons.generic;
				this.virtualDriveConfig.imagesFolderIcon = skin.folderIcons.images ?? skin.folderIcons.generic;
				this.virtualDriveConfig.folderLinkIcon = skin.folderIcons.link ?? skin.folderIcons.generic;
			}

			if (skin.loadStyleSheet != null)
				skin.loadStyleSheet();
		}

		this.#startDate = new Date();
	}

	getUptime(precision = 2) {
		return formatRelativeTime(this.#startDate, precision, false); 
	}
}
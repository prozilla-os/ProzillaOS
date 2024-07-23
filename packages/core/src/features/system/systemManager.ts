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
	readonly systemName: string;
	readonly tagLine: string;
	#startDate: Date;

	readonly skin: Skin;

	readonly appsConfig: AppsConfig;
	readonly desktopConfig: DesktopConfig;
	readonly miscConfig: MiscConfig;
	readonly modalsConfig: ModalsConfig;
	readonly taskbarConfig: TaskbarConfig;
	readonly trackingConfig: TrackingConfig;
	readonly windowsConfig: WindowsConfig;
	readonly virtualDriveConfig: VirtualDriveConfig;

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

		this.skin = skin ?? new Skin();

		this.desktopConfig = desktopConfig;
		this.appsConfig = appsConfig;
		this.miscConfig = miscConfig;
		this.modalsConfig = modalsConfig;
		this.taskbarConfig = taskbarConfig;
		this.trackingConfig = trackingConfig;
		this.windowsConfig = windowsConfig;
		this.virtualDriveConfig = virtualDriveConfig;

		this.loadSkin();

		this.#startDate = new Date();
	}

	private loadSkin() {
		const skin = this.skin;

		if (skin.appIcons != null || skin.appNames != null) {
			const appIcons = skin.appIcons as { [key: string]: string } ?? {};
			const appNames = skin.appNames as { [key: string]: string } ?? {};

			this.appsConfig.apps.forEach((app) => {
				if (Object.keys(appIcons).includes(app.id))
					app.setIconUrl(appIcons[app.id]);
				if (Object.keys(appNames).includes(app.id))
					app.setName(appNames[app.id]);
			});
		}

		if (skin.loadStyleSheet != null)
			skin.loadStyleSheet();
	}

	getUptime(precision = 2) {
		return formatRelativeTime(this.#startDate, precision, false); 
	}
}
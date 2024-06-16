import { formatRelativeTime } from "../_utils";
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
	desktopConfig: DesktopConfig;
	appsConfig: AppsConfig;
	miscConfig: MiscConfig;
	modalsConfig: ModalsConfig;
	taskbarConfig: TaskbarConfig;
	trackingConfig: TrackingConfig;
	windowsConfig: WindowsConfig;
}; 

export class SystemManager {
	systemName: string;
	tagLine: string;
	#startDate: Date;

	appsConfig: AppsConfig;
	desktopConfig: DesktopConfig;
	miscConfig: MiscConfig;
	modalsConfig: ModalsConfig;
	taskbarConfig: TaskbarConfig;
	trackingConfig: TrackingConfig;
	windowsConfig: WindowsConfig;

	constructor({
		systemName,
		tagLine,
		desktopConfig,
		appsConfig,
		miscConfig,
		modalsConfig,
		taskbarConfig,
		trackingConfig,
		windowsConfig
	}: SystemManagerParams) {
		this.systemName = systemName ?? "ProzillaOS";
		this.tagLine = tagLine ?? "Web-based Operating System";

		this.desktopConfig = desktopConfig;
		this.appsConfig = appsConfig;
		this.miscConfig = miscConfig;
		this.modalsConfig = modalsConfig;
		this.taskbarConfig = taskbarConfig;
		this.trackingConfig = trackingConfig;
		this.windowsConfig = windowsConfig;

		this.#startDate = new Date();
	}

	getUptime(precision = 2) {
		return formatRelativeTime(this.#startDate, precision, false); 
	}
}
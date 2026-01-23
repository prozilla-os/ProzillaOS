import styles from "../../Settings.module.css";
import { SettingsManager, useListSetting, useSystemManager } from "@prozilla-os/core";
import { AppOption } from "./AppOption";

export function InstalledAppsSettings() {
	const { appsConfig } = useSystemManager();
	const [pins, setPins] = useListSetting(SettingsManager.VIRTUAL_PATHS.taskbar, "pins");

	return <div className={`${styles.Option} ${styles.OptionList}`}>
		{appsConfig.apps.sort((a, b) =>
			a.name.toLowerCase().localeCompare(b.name.toLowerCase())
		).map((app) => 
			<AppOption key={app.id} app={app} pins={pins} setPins={setPins}/>
		)}
	</div>;
}
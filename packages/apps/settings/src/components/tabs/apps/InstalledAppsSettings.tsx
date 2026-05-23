import styles from "../../Settings.module.css";
import { Settings, useInstalledApps, useListSetting } from "@prozilla-os/core";
import { AppOption } from "./AppOption";

export function InstalledAppsSettings() {
	const [pins, setPins] = useListSetting(Settings.TASKBAR, "pins");
	const apps = useInstalledApps();

	return <div className={`${styles.Option} ${styles.OptionList}`}>
		{apps.map((app) => 
			<AppOption key={app.id} app={app} pins={pins} setPins={setPins}/>
		)}
	</div>;
}
import { useEffect, useState } from "react";
import styles from "../Settings.module.css";
import AppsManager from "../../../../features/apps/appsManager";
import { useSettingsManager } from "../../../../hooks/settings/settingsManagerContext";
import { SettingsManager } from "../../../../features/settings/settingsManager";
import { AppOption } from "./AppOption";

export function AppsSettings() {
	const settingsManager = useSettingsManager();
	const [pins, setPins] = useState([]);

	useEffect(() => {
		const settings = settingsManager.get(SettingsManager.VIRTUAL_PATHS.taskbar);
		void settings.get("pins", (pins) => {
			setPins(pins.split(","));
		});
	}, [settingsManager]);

	return <div className={`${styles["Option"]} ${styles["Option-list"]}`}>
		<p className={styles["Label"]}>Apps</p>
		{AppsManager.APPS.sort((a, b) =>
			a.name.toLowerCase().localeCompare(b.name.toLowerCase())
		).map((app) => 
			<AppOption key={app.id} app={app} pins={pins} setPins={setPins}/>
		)}
	</div>;
}
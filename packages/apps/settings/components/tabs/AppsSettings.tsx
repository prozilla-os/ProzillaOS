import { useEffect, useState } from "react";
import styles from "../Settings.module.css";
import { AppsManager } from "../../../../features/apps/appsManager";
import { useSettingsManager } from "../../../../hooks/settings/settingsManagerContext";
import { SettingsManager } from "../../../../features/settings/settingsManager";
import { AppOption } from "./AppOption";

export function AppsSettings() {
	const settingsManager = useSettingsManager();
	const [pins, setPins] = useState<string[]>([]);

	useEffect(() => {
		const settings = settingsManager?.getSettings(SettingsManager.VIRTUAL_PATHS.taskbar);
		void settings?.get("pins", (newPins) => {
			setPins(newPins.split(","));
		});
	}, [settingsManager]);

	return <div className={`${styles.Option} ${styles.OptionList}`}>
		<p className={styles.Label}>Apps</p>
		{AppsManager.APPS.sort((a, b) =>
			a.name.toLowerCase().localeCompare(b.name.toLowerCase())
		).map((app) => 
			<AppOption key={app.id} app={app} pins={pins} setPins={setPins}/>
		)}
	</div>;
}
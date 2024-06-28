import { useEffect, useState } from "react";
import styles from "../Settings.module.css";
import { AppOption } from "./AppOption";
import { SettingsManager, useSettingsManager, useSystemManager } from "@prozilla-os/core";

export function AppsSettings() {
	const { appsConfig } = useSystemManager();
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
		{appsConfig.apps.sort((a, b) =>
			a.name.toLowerCase().localeCompare(b.name.toLowerCase())
		).map((app) => 
			<AppOption key={app.id} app={app} pins={pins} setPins={setPins}/>
		)}
	</div>;
}
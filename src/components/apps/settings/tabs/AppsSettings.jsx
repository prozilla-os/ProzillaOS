import { useEffect, useState } from "react";
import styles from "../Settings.module.css";
import AppsManager from "../../../../features/apps/appsManager.js";
import { useSettingsManager } from "../../../../hooks/settings/settingsManagerContext.js";
import { SettingsManager } from "../../../../features/settings/settingsManager.js";
import ModalsManager from "../../../../features/modals/modalsManager.js";
import { AppOption } from "./AppOption.jsx";

/**
 * @param {object} props 
 * @param {ModalsManager} props.modalsManager 
 */
export function AppsSettings({ modalsManager }) {
	const settingsManager = useSettingsManager();
	const [pins, setPins] = useState([]);

	useEffect(() => {
		const settings = settingsManager.get(SettingsManager.VIRTUAL_PATHS.taskbar);
		settings.get("pins", (pins) => {
			setPins(pins.split(","));
		});
	}, [settingsManager]);

	return <div className={`${styles["Option"]} ${styles["Option-list"]}`}>
		<p className={styles["Label"]}>Apps</p>
		{AppsManager.APPS.sort((a, b) =>
			a.name.toLowerCase().localeCompare(b.name.toLowerCase())
		).map((app) => 
			<AppOption key={app.id} app={app} modalsManager={modalsManager} pins={pins} setPins={setPins}/>
		)}
	</div>;
}
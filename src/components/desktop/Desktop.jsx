import { useState } from "react";
import { SettingsManager } from "../../features/settings/settings.js";
import { useSettings } from "../../hooks/settings/SettingsContext.js";
import styles from "./Desktop.module.css";
import { useEffect } from "react";

export function Desktop() {
	const settingsManager = useSettings();
	const [wallpaper, setWallpaper] = useState(null);

	useEffect(() => {
		(async () => {
			const settings = settingsManager.get(SettingsManager.VIRTUAL_PATHS.desktop);
			settings.get("wallpaper", setWallpaper);
		})();
	}, [settingsManager]);

	return (
		<div className={styles.Container} style={{ backgroundImage: `url(${wallpaper})` }}/>
	);
}
import { useEffect, useState } from "react";
import styles from "./Settings.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { useVirtualRoot } from "../../../hooks/virtual-drive/VirtualRootContext.js";
import { useSettings } from "../../../hooks/settings/SettingsContext.js";
import { SettingsManager } from "../../../features/settings/settings.js";

import { VirtualRoot } from "../../../features/virtual-drive/virtual-root.js";

/**
 * @param {object} props 
 * @param {VirtualRoot} props.virtualRoot 
 * @param {SettingsManager} props.settingsManager 
 */
function AppearanceTab({ virtualRoot, settingsManager }) {
	const [wallpaper, setWallpaper] = useState(null);
	const settings = settingsManager.get(SettingsManager.VIRTUAL_PATHS.desktop);

	useEffect(() => {
		settings.get("wallpaper", setWallpaper);
	}, [settings]);

	const onChange = (event) => {
		const value = event.target.value;
		settings.set("wallpaper", value);
	};

	return (
		<div className={styles["Option"]}>
			<p>Wallpaper</p>
			<div className={styles["Input"]}>
				{virtualRoot.navigate("~/Images")?.getFiles()?.map(({ name, id, source }) =>
					<label className={styles["Image-select"]} key={id}>
						<input type="radio" value={source} checked={source === wallpaper ? "checked" : ""} onChange={onChange}/>
						<img src={source} alt={id}/>
					</label>
				)}
			</div>
		</div>
	);
}

export function Settings() {
	const [tabIndex, setTabIndex] = useState(0);
	const virtualRoot = useVirtualRoot();
	const settingsManager = useSettings();

	return (
		<div className={styles.Container}>
			<div className={styles.Tabs}>
				<button title="Home" className={styles["Tab-button"]} onClick={() => { setTabIndex(0); }}>
					<FontAwesomeIcon icon={faPalette}/>
					Appearance
				</button>
			</div>
			<div className={styles["Tab-panel"]}>
				{tabIndex === 0
					? <AppearanceTab virtualRoot={virtualRoot} settingsManager={settingsManager}/>
					: null
				}
			</div>
		</div>
	);
}
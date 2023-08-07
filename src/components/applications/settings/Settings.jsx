import { useEffect, useState } from "react";
import styles from "./Settings.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHardDrive, faPalette } from "@fortawesome/free-solid-svg-icons";
import { useVirtualRoot } from "../../../hooks/virtual-drive/VirtualRootContext.js";
import { useSettings } from "../../../hooks/settings/SettingsContext.js";
import { SettingsManager } from "../../../features/settings/settings.js";
import { VirtualRoot } from "../../../features/virtual-drive/virtual-root.js";
import { StorageManager } from "../../../features/storage/storage.js";
import { round } from "../../../features/math/round.js";

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

	return (<>
		<div className={styles["Option"]}>
			<p className={styles["Label"]}>Wallpaper</p>
			<div className={styles["Input"]}>
				{virtualRoot.navigate("~/Images")?.getFiles()?.map(({ name, id, source }) =>
					<label className={styles["Image-select"]} key={id}>
						<input type="radio" value={source} checked={source === wallpaper ? "checked" : ""} onChange={onChange}/>
						<img src={source} alt={id}/>
					</label>
				)}
			</div>
		</div>
	</>);
}

/**
 * @param {object} root 
 * @param {VirtualRoot} root.virtualRoot 
 */
function StorageTab({ virtualRoot }) {
	const maxBytes = StorageManager.MAX_BYTES;
	const usedBytes = StorageManager.getByteSize(virtualRoot.toString());

	const maxKB = StorageManager.byteToKilobyte(maxBytes);
	const usedKB = StorageManager.byteToKilobyte(usedBytes);
	const freeKB = maxKB - usedKB;

	return (<>
		<div className={styles["Option"]}>
			<p className={styles["Label"]}>Virtual Drive ({round(maxKB, 1)} KB)</p>
			<p>{round(usedKB, 1)} KB used - {round(freeKB, 1)} KB free</p>
		</div>
		<div className={styles["Option"]}>
			<p className={styles["Label"]}>Manage data</p>
			<button title="Reset" className={`${styles.Button} ${styles["Button-red"]}`}>Reset</button>
		</div>
	</>);
}

export function Settings() {
	const [tabIndex, setTabIndex] = useState(0);
	const virtualRoot = useVirtualRoot();
	const settingsManager = useSettings();

	return (
		<div className={styles.Container}>
			<div className={styles.Tabs}>
				<button title="Appearance" className={styles["Tab-button"]} onClick={() => { setTabIndex(0); }}>
					<FontAwesomeIcon icon={faPalette}/>
					Appearance
				</button>
				<button title="Storage" className={styles["Tab-button"]} onClick={() => { setTabIndex(1); }}>
					<FontAwesomeIcon icon={faHardDrive}/>
					Storage
				</button>
			</div>
			<div className={styles["Tab-panel"]}>
				{tabIndex === 0
					? <AppearanceTab virtualRoot={virtualRoot} settingsManager={settingsManager}/>
					: tabIndex === 1
						? <StorageTab virtualRoot={virtualRoot}/>
						: null
				}
			</div>
		</div>
	);
}
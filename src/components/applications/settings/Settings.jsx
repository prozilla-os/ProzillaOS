import { useEffect, useState } from "react";
import styles from "./Settings.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faHardDrive, faPalette } from "@fortawesome/free-solid-svg-icons";
import { useVirtualRoot } from "../../../hooks/virtual-drive/VirtualRootContext.js";
import { useSettings } from "../../../hooks/settings/SettingsContext.js";
import { SettingsManager } from "../../../features/settings/settings.js";
import { VirtualRoot } from "../../../features/virtual-drive/virtual-root.js";
import { StorageManager } from "../../../features/storage/storage.js";
import { round } from "../../../features/math/round.js";
import { Button } from "../../utils/Button.jsx";
import { ProgressBar } from "../../utils/ProgressBar.jsx";
import utilStyles from "../../../styles/utils.module.css";
import { useWindowsManager } from "../../../hooks/windows/WindowsManagerContext.js";
import Vector2 from "../../../features/math/vector2.js";

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
		<div className={`${styles["Option"]} ${styles["Progress-bar-container"]}`}>
			<p className={styles["Label"]}>Virtual Drive ({round(maxKB, 1)} KB)</p>
			<ProgressBar fillPercentage={usedKB / maxKB * 100} className={styles["Progress-bar"]}/>
			<span className={styles["Progress-bar-labels"]}>
				<p className={utilStyles["Text-light"]}>{round(usedKB, 1)} KB used</p>
				<p className={utilStyles["Text-light"]}>{round(freeKB, 1)} KB free</p>
			</span>
		</div>
		<div className={styles["Option"]}>
			<p className={styles["Label"]}>Manage data</p>
			<Button
				className={`${styles.Button} ${styles["Button-red"]} ${utilStyles["Text-bold"]}`}
				onClick={() => { virtualRoot.reset?.(); }}
			>
				Reset
			</Button>
		</div>
	</>);
}

function AboutTab({ windowsManager, virtualRoot }) {
	return (<>
		<div className={styles["Option"]}>
			<p className={styles["Label"]}>About ProzillaOS</p>
			<p className={utilStyles["Text-light"]}>ProzillaOS is a web-based operating system inspired by Ubuntu Linux and Windows made with React.js by Prozilla.</p>
			<div className={styles["Button-group"]}>
				<Button
					className={`${styles.Button} ${utilStyles["Text-bold"]}`}
					onClick={(event) => {
						event.preventDefault();
						windowsManager.open("text-editor", {
							mode: "view",
							file: virtualRoot.navigate("~/Documents").findFile("info", "md"),
							size: new Vector2(575, 675),
						});
					}}
				>
					Open info.md
				</Button>
				<Button
					className={`${styles.Button} ${utilStyles["Text-bold"]}`}
					onClick={(event) => {
						event.preventDefault();
						window.open("https://github.com/Prozilla/prozilla-os");
					}}
				>
					View source
				</Button>
			</div>
		</div>
	</>);
}

/**
 * @param {number} param0 
 */
export function Settings({ initialTabIndex }) {
	const [tabIndex, setTabIndex] = useState(initialTabIndex ?? 0);
	const virtualRoot = useVirtualRoot();
	const settingsManager = useSettings();
	const windowsManager = useWindowsManager();

	const getClassName = (index) => {
		const classNames = [styles["Tab-button"]];

		if (index === tabIndex)
			classNames.push(styles["Active-tab"]);
		
		return classNames.join(" ");
	};

	return (
		<div className={styles.Container}>
			<div className={styles.Tabs}>
				<button title="Appearance" className={getClassName(0)} onClick={() => { setTabIndex(0); }}>
					<FontAwesomeIcon icon={faPalette}/>
					<p className={utilStyles["Text-semibold"]}>Appearance</p>
				</button>
				<button title="Storage" className={getClassName(1)} onClick={() => { setTabIndex(1); }}>
					<FontAwesomeIcon icon={faHardDrive}/>
					<p className={utilStyles["Text-semibold"]}>Storage</p>
				</button>
				<button title="Storage" className={getClassName(2)} onClick={() => { setTabIndex(2); }}>
					<FontAwesomeIcon icon={faCircleInfo}/>
					<p className={utilStyles["Text-semibold"]}>About</p>
				</button>
			</div>
			<div className={styles["Tab-panel"]}>
				{tabIndex === 0
					? <AppearanceTab virtualRoot={virtualRoot} settingsManager={settingsManager}/>
					: tabIndex === 1
						? <StorageTab virtualRoot={virtualRoot}/>
						: tabIndex === 2
							? <AboutTab virtualRoot={virtualRoot} windowsManager={windowsManager}/>
							: null
				}
			</div>
		</div>
	);
}
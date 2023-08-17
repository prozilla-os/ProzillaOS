import { useEffect, useState } from "react";
import { SettingsManager } from "../../../features/settings/settingsManager.js";
import styles from "./Settings.module.css";
import { useVirtualRoot } from "../../../hooks/virtual-drive/virtualRootContext.js";
import { useSettingsManager } from "../../../hooks/settings/settingsManagerContext.js";

const wallpapersPath = "~/Images/Wallpapers";

export function AppearanceSettings() {
	const virtualRoot = useVirtualRoot();
	const settingsManager = useSettingsManager();
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
				{virtualRoot.navigate(wallpapersPath)?.getFiles()?.toReversed().map(({ id, source }) =>
					<label className={styles["Image-select"]} key={id}>
						<input
							type="radio"
							value={source}
							aria-label="Wallpaper image"
							checked={source === wallpaper ? "checked" : ""}
							onChange={onChange}
							tabIndex={0}
						/>
						<img src={source} alt={id} draggable="false"/>
					</label>
				)}
			</div>
		</div>
	</>);
}
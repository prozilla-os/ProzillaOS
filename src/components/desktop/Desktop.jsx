import { useState } from "react";
import { SettingsManager } from "../../features/settings/settings.js";
import { useSettings } from "../../hooks/settings/SettingsContext.js";
import styles from "./Desktop.module.css";
import { useEffect } from "react";
import { useModals } from "../../hooks/modals/Modals.js";
import { ModalsView } from "../modals/ModalsView.jsx";
import { useWindowsManager } from "../../hooks/windows/WindowsManagerContext.js";
import { useContextMenu } from "../../hooks/modals/ContextMenu.js";

export function Desktop() {
	const settingsManager = useSettings();
	const [wallpaper, setWallpaper] = useState(null);
	const [modalsManager, modals] = useModals();
	const windowsManager = useWindowsManager();
	const { onContextMenu } = useContextMenu({
		modalsManager,
		options: {
			"Change appearance": () => { windowsManager.open("settings", { initialTabIndex: 0 }); },
			"Open in Files": () => { windowsManager.open("file-explorer", { startPath: "~/Desktop" }); }
		}
	});

	useEffect(() => {
		(async () => {
			const settings = settingsManager.get(SettingsManager.VIRTUAL_PATHS.desktop);
			settings.get("wallpaper", setWallpaper);
		})();
	}, [settingsManager]);

	return (<>
		<div className={styles.Container} style={{ backgroundImage: `url(${wallpaper})` }} onContextMenu={onContextMenu}>
			<ModalsView modalsManager={modalsManager} modals={modals}/>
		</div>
	</>);
}
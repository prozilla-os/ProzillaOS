import { useState } from "react";
import { SettingsManager } from "../../features/settings/settingsManager.js";
import { useSettingsManager } from "../../hooks/settings/settingsManagerContext.js";
import styles from "./Desktop.module.css";
import { useEffect } from "react";
import { useModals } from "../../hooks/modals/modals.js";
import { ModalsView } from "../modals/ModalsView.jsx";
import { useWindowsManager } from "../../hooks/windows/windowsManagerContext.js";
import { useContextMenu } from "../../hooks/modals/contextMenu.js";

export function Desktop() {
	const settingsManager = useSettingsManager();
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
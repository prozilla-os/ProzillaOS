import { memo, useState } from "react";
import { SettingsManager } from "../../features/settings/settingsManager.js";
import { useSettingsManager } from "../../hooks/settings/settingsManagerContext.js";
import styles from "./Desktop.module.css";
import { useEffect } from "react";
import { useModals } from "../../hooks/modals/modals.js";
import { ModalsView } from "../modals/ModalsView.jsx";
import { useWindowsManager } from "../../hooks/windows/windowsManagerContext.js";
import { useContextMenu } from "../../hooks/modals/contextMenu.js";
import { FALLBACK_WALLPAPER } from "../../constants/desktop.js";
import { reloadViewport } from "../../features/utils/browser.js";

export const Desktop = memo(() => {
	const settingsManager = useSettingsManager();
	const [wallpaper, setWallpaper] = useState(null);
	const [modalsManager, modals] = useModals();
	const windowsManager = useWindowsManager();
	const { onContextMenu } = useContextMenu({
		modalsManager,
		options: {
			"Refresh": () => { reloadViewport(); },
			"Change appearance": () => { windowsManager.open("settings", { initialTabIndex: 0 }); },
			"Open in Files": () => { windowsManager.open("file-explorer", { startPath: "~/Desktop" }); },
		}
	});

	useEffect(() => {
		(async () => {
			const settings = settingsManager.get(SettingsManager.VIRTUAL_PATHS.desktop);
			settings.get("wallpaper", setWallpaper);
		})();
	}, [settingsManager]);

	const onError = () => {
		const settings = settingsManager.get(SettingsManager.VIRTUAL_PATHS.desktop);
		settings.set("wallpaper", FALLBACK_WALLPAPER);
	};

	return (<>
		<div
			className={styles.Container}
			onContextMenu={onContextMenu}
		>
			{wallpaper
				? <img src={wallpaper} className={styles.Wallpaper} alt="Desktop wallpaper" onError={onError}/>
				: null
			}
			<ModalsView modalsManager={modalsManager} modals={modals}/>
		</div>
	</>);
});
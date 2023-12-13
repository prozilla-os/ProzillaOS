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
import { useVirtualRoot } from "../../hooks/virtual-drive/virtualRootContext.js";
import { DirectoryList } from "../applications/file-explorer/directory-list/DirectoryList.jsx";
import { APPS, APP_NAMES } from "../../constants/applications.js";
import Vector2 from "../../features/math/vector2.js";

export const Desktop = memo(() => {
	const settingsManager = useSettingsManager();
	const [wallpaper, setWallpaper] = useState(null);
	const [modalsManager, modals] = useModals();
	const windowsManager = useWindowsManager();
	const virtualRoot = useVirtualRoot();

	const { onContextMenu } = useContextMenu({
		modalsManager,
		options: {
			"Refresh": () => { reloadViewport(); },
			"Change appearance": () => { windowsManager.open("settings", { initialTabIndex: 0 }); },
			[`Open in ${APP_NAMES.FILE_EXPLORER}`]: () => {
				windowsManager.open(APPS.FILE_EXPLORER, { startPath: "~/Desktop" });
			},
		}
	});
	const { onContextMenu: onContextMenuFile } = useContextMenu({
		modalsManager,
		options: {
			"Open": (file) => {	file.open(windowsManager); },
			[`Reveal in ${APP_NAMES.FILE_EXPLORER}`]: (file) => {
				windowsManager.open(APPS.FILE_EXPLORER, { startPath: file.parent.path });
			},
			"Delete": (file) => { file.delete(); },
		}
	});
	const { onContextMenu: onContextMenuFolder } = useContextMenu({
		modalsManager,
		options: {
			"Open": (folder) => { folder.open(windowsManager); },
			[`Reveal in ${APP_NAMES.FILE_EXPLORER}`]: (folder) => {
				windowsManager.open(APPS.FILE_EXPLORER, { startPath: folder.parent.path });
			},
			"Delete": (folder) => { folder.delete(); },
		}
	});

	useEffect(() => {
		(async () => {
			const settings = settingsManager.get(SettingsManager.VIRTUAL_PATHS.desktop);
			settings.get("wallpaper", setWallpaper);
		})();
	}, [settingsManager]);

	const directory = virtualRoot.navigate("~/Desktop");

	const onError = () => {
		const settings = settingsManager.get(SettingsManager.VIRTUAL_PATHS.desktop);
		settings.set("wallpaper", FALLBACK_WALLPAPER);
	};

	return (<>
		<div
			className={styles.Container}
			onContextMenu={onContextMenu}
		>
			<ModalsView modalsManager={modalsManager} modals={modals}/>
			<div className={styles.Content}>
				<DirectoryList
					directory={directory}
					fileClassname={styles["Item"]}
					folderClassname={styles["Item"]}
					onClickFile={(event, file) => {
						event.preventDefault();

						const options = {};
						if (file.name === "info.md") {
							options.mode = "view";
							options.size = new Vector2(575, 675);
						}

						windowsManager.openFile(file, options);
					}}
					onClickFolder={(event, { linkedPath, path }) => {
						windowsManager.open(APPS.FILE_EXPLORER, { startPath: linkedPath ?? path });
					}}
					onContextMenuFile={onContextMenuFile}
					onContextMenuFolder={onContextMenuFolder}
				/>
			</div>
			{wallpaper
				? <img src={wallpaper} className={styles.Wallpaper} alt="Desktop wallpaper" onError={onError}/>
				: null
			}
		</div>
	</>);
});
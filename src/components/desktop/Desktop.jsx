import { memo, useState } from "react";
import { SettingsManager } from "../../features/settings/settingsManager.js";
import { useSettingsManager } from "../../hooks/settings/settingsManagerContext.js";
import styles from "./Desktop.module.css";
import { useEffect } from "react";
import { useModals } from "../../hooks/modals/modals.js";
import { ModalsView } from "../modals/ModalsView.jsx";
import { useWindowsManager } from "../../hooks/windows/windowsManagerContext.js";
import { useContextMenu } from "../../hooks/modals/contextMenu.js";
import { FALLBACK_ICON_SIZE, FALLBACK_WALLPAPER } from "../../config/desktop.config.js";
import { reloadViewport } from "../../features/_utils/browser.utils.js";
import { useVirtualRoot } from "../../hooks/virtual-drive/virtualRootContext.js";
import { DirectoryList } from "../apps/file-explorer/directory-list/DirectoryList.jsx";
import { APPS, APP_ICONS, APP_NAMES } from "../../config/apps.config.js";
import Vector2 from "../../features/math/vector2.js";
import { Actions } from "../actions/Actions.jsx";
import { ClickAction } from "../actions/actions/ClickAction.jsx";
import { faArrowsRotate, faEye, faFolder, faPaintBrush, faTerminal, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToggleAction } from "../actions/actions/ToggleAction.jsx";
import { DropdownAction } from "../actions/actions/DropdownAction.jsx";
import { RadioAction } from "../actions/actions/RadioAction.jsx";
import { Divider } from "../actions/actions/Divider.jsx";
import { isValidInteger } from "../../features/_utils/number.utils.js";

export const Desktop = memo(() => {
	const settingsManager = useSettingsManager();
	const [wallpaper, setWallpaper] = useState(null);
	const [modalsManager, modals] = useModals();
	const windowsManager = useWindowsManager();
	const virtualRoot = useVirtualRoot();
	const [showIcons, setShowIcons] = useState(false);
	const [iconSize, setIconSize] = useState(FALLBACK_ICON_SIZE);

	const directory = virtualRoot.navigate("~/Desktop");

	const { onContextMenu, ShortcutsListener } = useContextMenu({ modalsManager, Actions: (props) =>
		<Actions {...props}>
			<DropdownAction label="View" icon={faEye}>
				<RadioAction initialIndex={iconSize} onTrigger={(event, params, value) => {
					const settings = settingsManager.get(SettingsManager.VIRTUAL_PATHS.desktop);
					settings.set("icon-size", parseInt(value));
				}} options={[
					{ label: "Small icons" },
					{ label: "Medium icons" },
					{ label: "Large icons" }
				]}/>
				<Divider/>
				<ToggleAction label="Show dekstop icons" initialValue={showIcons} onTrigger={(event, params, value) => {
					const settings = settingsManager.get(SettingsManager.VIRTUAL_PATHS.desktop);
					settings.set("show-icons", (!showIcons).toString());
				}}/>
			</DropdownAction>
			<ClickAction label="Reload" shortcut={["Control", "r"]} icon={faArrowsRotate} onTrigger={() => {
				reloadViewport();
			}}/>
			<ClickAction label="Change appearance" icon={faPaintBrush} onTrigger={() => {
				windowsManager.open("settings", { initialTabIndex: 0 });
			}}/>
			<Divider/>
			<ClickAction label={`Open in ${APP_NAMES.FILE_EXPLORER}`} icon={APP_ICONS.FILE_EXPLORER} onTrigger={() => {
				windowsManager.open(APPS.FILE_EXPLORER, { startPath: directory.path });
			}}/>
			<ClickAction label={`Open in ${APP_NAMES.TERMINAL}`} icon={APP_ICONS.TERMINAL} onTrigger={() => {
				windowsManager.open(APPS.TERMINAL, { startPath: directory.path });
			}}/>
		</Actions>
	});
	const { onContextMenu: onContextMenuFile } = useContextMenu({ modalsManager, Actions: (props) =>
		<Actions {...props}>
			<ClickAction label="Open" onTrigger={(event, file) => {
				file.open(windowsManager);
			}}/>
			<ClickAction label={`Reveal in ${APP_NAMES.FILE_EXPLORER}`} icon={faFolder} onTrigger={(event, file) => {
				file.parent.open(windowsManager);
			}}/>
			<ClickAction label="Delete" icon={faTrash} onTrigger={(event, file) => {
				file.delete();
			}}/>
		</Actions>
	});
	const { onContextMenu: onContextMenuFolder } = useContextMenu({ modalsManager, Actions: (props) =>
		<Actions {...props}>
			<ClickAction label="Open" onTrigger={(event, folder) => {
				folder.open(windowsManager);
			}}/>
			<ClickAction label={`Open in ${APP_NAMES.TERMINAL}`} icon={faTerminal} onTrigger={(event, folder) => {
				windowsManager.open(APPS.TERMINAL, { startPath: folder.path });
			}}/>
			<ClickAction label={`Reveal in ${APP_NAMES.FILE_EXPLORER}`} icon={faFolder} onTrigger={(event, folder) => {
				folder.parent.open(windowsManager);
			}}/>
			<Divider/>
			<ClickAction label="Delete" icon={faTrash} onTrigger={(event, folder) => {
				folder.delete();
			}}/>
		</Actions>
	});

	useEffect(() => {
		(async () => {
			const settings = settingsManager.get(SettingsManager.VIRTUAL_PATHS.desktop);
			settings.get("wallpaper", setWallpaper);
			settings.get("show-icons", (value) => {
				if (value != null) {
					setShowIcons(value === "true");
				} else {
					setShowIcons(true);
				}
			});
			settings.get("icon-size", (value) => {
				if (isValidInteger(value))
					setIconSize(parseInt(value));
			});
		})();
	}, [settingsManager]);

	const onError = () => {
		const settings = settingsManager.get(SettingsManager.VIRTUAL_PATHS.desktop);
		settings.set("wallpaper", FALLBACK_WALLPAPER);
	};

	const iconScale = 1 + ((isValidInteger(iconSize) ? iconSize : FALLBACK_ICON_SIZE) - 1) / 4;

	return (<>
		<ShortcutsListener/>
		<div
			className={styles.Container}
			onContextMenu={onContextMenu}
		>
			<ModalsView modalsManager={modalsManager} modals={modals}/>
			{showIcons && <DirectoryList
				directory={directory}
				className={styles.Content}
				style={{
					"--scale": `${iconScale}rem`
				}}
				fileClassName={styles["Item"]}
				folderClassName={styles["Item"]}
				onOpenFile={(event, file) => {
					event.preventDefault();

					const options = {};
					if (file.name === "info.md")
						options.size = new Vector2(575, 675);
					if (file.extension === "md")
						options.mode = "view";

					windowsManager.openFile(file, options);
				}}
				onOpenFolder={(event, { linkedPath, path }) => {
					windowsManager.open(APPS.FILE_EXPLORER, { startPath: linkedPath ?? path });
				}}
				onContextMenuFile={onContextMenuFile}
				onContextMenuFolder={onContextMenuFolder}
			/>}
			{wallpaper
				? <img src={wallpaper} className={styles.Wallpaper} alt="Desktop wallpaper" onError={onError}/>
				: null
			}
		</div>
	</>);
});
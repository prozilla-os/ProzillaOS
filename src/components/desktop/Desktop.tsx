import { memo, useState } from "react";
import { SettingsManager } from "../../features/settings/settingsManager";
import { useSettingsManager } from "../../hooks/settings/settingsManagerContext";
import styles from "./Desktop.module.css";
import { useEffect } from "react";
import { useWindowsManager } from "../../hooks/windows/windowsManagerContext";
import { useContextMenu } from "../../hooks/modals/contextMenu";
import { FALLBACK_ICON_SIZE, FALLBACK_WALLPAPER } from "../../config/desktop.config";
import { reloadViewport } from "../../features/_utils/browser.utils";
import { useVirtualRoot } from "../../hooks/virtual-drive/virtualRootContext";
import { DirectoryList } from "../apps/file-explorer/directory-list/DirectoryList";
import { APPS, APP_ICONS, APP_NAMES } from "../../config/apps.config";
import Vector2 from "../../features/math/vector2";
import { Actions } from "../actions/Actions";
import { ClickAction } from "../actions/actions/ClickAction";
import { faArrowsRotate, faEye, faFolder, faPaintBrush, faTerminal, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToggleAction } from "../actions/actions/ToggleAction";
import { DropdownAction } from "../actions/actions/DropdownAction";
import { RadioAction } from "../actions/actions/RadioAction";
import { Divider } from "../actions/actions/Divider";
import { isValidInteger } from "../../features/_utils/number.utils";
import { useWindowedModal } from "../../hooks/modals/windowedModal";
import { Share } from "../modals/share/Share";
import ModalsManager from "../../features/modals/modalsManager";
import { VirtualFolder } from "../../features/virtual-drive/folder/virtualFolder";
import { VirtualFolderLink } from "../../features/virtual-drive/folder/virtualFolderLink";

export const Desktop = memo(() => {
	const settingsManager = useSettingsManager();
	const [wallpaper, setWallpaper] = useState(null);
	const windowsManager = useWindowsManager();
	const virtualRoot = useVirtualRoot();
	const [showIcons, setShowIcons] = useState(false);
	const [iconSize, setIconSize] = useState(FALLBACK_ICON_SIZE);
	const { openWindowedModal } = useWindowedModal();

	const directory = virtualRoot.navigate("~/Desktop");

	const { onContextMenu, ShortcutsListener } = useContextMenu({ Actions: (props) =>
		<Actions {...props}>
			<DropdownAction label="View" icon={faEye}>
				<RadioAction initialIndex={iconSize} onTrigger={(event, params, value: string) => {
					const settings = settingsManager.get(SettingsManager.VIRTUAL_PATHS.desktop);
					settings.set("icon-size", value);
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
				windowsManager.open("settings", { tab: 0 });
			}}/>
			<Divider/>
			<ClickAction label={`Open in ${APP_NAMES.FILE_EXPLORER}`} icon={APP_ICONS.FILE_EXPLORER} onTrigger={() => {
				windowsManager.open(APPS.FILE_EXPLORER, { startPath: directory.path });
			}}/>
			<ClickAction label={`Open in ${APP_NAMES.TERMINAL}`} icon={APP_ICONS.TERMINAL} onTrigger={() => {
				windowsManager.open(APPS.TERMINAL, { startPath: directory.path });
			}}/>
			<Divider/>
			<ClickAction label={"Share"} icon={ModalsManager.getModalIconUrl("share")} onTrigger={() => {
				openWindowedModal({
					size: new Vector2(350, 350),
					Modal: (props) => <Share {...props}/>
				});
			}}/>
		</Actions>
	});
	const { onContextMenu: onContextMenuFile } = useContextMenu({ Actions: (props) =>
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
	const { onContextMenu: onContextMenuFolder } = useContextMenu({ Actions: (props) =>
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
			{showIcons && <DirectoryList
				directory={directory as VirtualFolder}
				className={styles.Content}
				style={{
					"--scale": `${iconScale}rem`
				}}
				fileClassName={styles["Item"]}
				folderClassName={styles["Item"]}
				onOpenFile={(event, file) => {
					(event as Event).preventDefault();

					const options: Record<string, any> = {};
					if (file.name === "info.md")
						options.size = new Vector2(575, 675);
					if (file.extension === "md")
						options.mode = "view";

					windowsManager.openFile(file, options);
				}}
				onOpenFolder={(event, { linkedPath, path }: VirtualFolderLink & VirtualFolder) => {
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
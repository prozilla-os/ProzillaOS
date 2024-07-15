import { memo, MouseEventHandler, useState } from "react";
import styles from "./Desktop.module.css";
import { useEffect } from "react";
import { Actions } from "../actions/Actions";
import { ClickAction } from "../actions/actions/ClickAction";
import { faArrowsRotate, faCompress, faExpand, faEye, faPaintBrush, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToggleAction } from "../actions/actions/ToggleAction";
import { DropdownAction } from "../actions/actions/DropdownAction";
import { RadioAction } from "../actions/actions/RadioAction";
import { Divider } from "../actions/actions/Divider";
import { Share } from "../modals/share/Share";
import { ModalProps } from "../modals/ModalView";
import { SettingsManager, reloadViewport, ModalsManager, Vector2, isValidInteger, AppsConfig } from "../../features";
import { VirtualFile } from "../../features/virtual-drive/file";
import { VirtualFolder, VirtualFolderLink } from "../../features/virtual-drive/folder";
import { useSettingsManager, useWindowsManager, useVirtualRoot, useWindowedModal, useContextMenu, useSystemManager } from "../../hooks";
import { DirectoryList } from "../_utils";
import { FileEventHandler, FolderEventHandler } from "../_utils/directory-list/DirectoryList";
import { useClassNames } from "../../hooks";

export const Desktop = memo(() => {
	const { desktopConfig, skin, appsConfig } = useSystemManager();
	const settingsManager = useSettingsManager();
	const windowsManager = useWindowsManager();
	const virtualRoot = useVirtualRoot();

	const [wallpaper, setWallpaper] = useState<string | null>(null);
	const [showIcons, setShowIcons] = useState(false);
	const [iconSize, setIconSize] = useState<number>(desktopConfig.defaultIconSize);
	const [iconDirection, setIconDirection] = useState<number>(desktopConfig.defaultIconDirection);
	const { openWindowedModal } = useWindowedModal();

	const directory = virtualRoot?.navigate("~/Desktop");

	const fileExplorerApp = appsConfig.getAppByRole(AppsConfig.APP_ROLES.FileExplorer);
	const terminalApp = appsConfig.getAppByRole(AppsConfig.APP_ROLES.Terminal);
	const settingsApp = appsConfig.getAppByRole(AppsConfig.APP_ROLES.Settings);

	const { onContextMenu, ShortcutsListener } = useContextMenu({ Actions: (props) =>
		<Actions {...props}>
			<DropdownAction label="View" icon={faEye}>
				<RadioAction initialIndex={iconSize} onTrigger={(event, params, value) => {
					const settings = settingsManager?.getSettings(SettingsManager.VIRTUAL_PATHS.desktop);
					void settings?.set("icon-size", value as string);
				}} options={[
					{ label: "Small icons" },
					{ label: "Medium icons" },
					{ label: "Large icons" },
				]}/>
				<Divider/>
				<RadioAction initialIndex={iconDirection} onTrigger={(event, params, value) => {
					const settings = settingsManager?.getSettings(SettingsManager.VIRTUAL_PATHS.desktop);
					void settings?.set("icon-direction", value as string);
				}} options={[
					{ label: "Align vertically" },
					{ label: "Align horizontally" },
				]}/>
				<Divider/>
				<ToggleAction label="Show dekstop icons" initialValue={showIcons} onTrigger={() => {
					const settings = settingsManager?.getSettings(SettingsManager.VIRTUAL_PATHS.desktop);
					void settings?.set("show-icons", (!showIcons).toString());
				}}/>
			</DropdownAction>
			<ClickAction label="Reload" shortcut={["Control", "r"]} icon={faArrowsRotate} onTrigger={() => {
				reloadViewport();
			}}/>
			<ClickAction
				label={!document.fullscreenElement ? "Enter fullscreen" : "Exit fullscreen"}
				shortcut={["F11"]}
				icon={!document.fullscreenElement ? faExpand : faCompress}
				onTrigger={() => {
					if (windowsManager?.isAnyFocused())
						return;

					if (!document.fullscreenElement) {
						void document.body.requestFullscreen().catch((error) => {
							console.error(error);
						});
					} else {
						void document.exitFullscreen().catch((error) => {
							console.error(error);
						});
					}
				}}
			/>
			{settingsApp != null &&
				<ClickAction label="Change appearance" icon={faPaintBrush} onTrigger={() => {
					windowsManager?.open(settingsApp.id, { tab: 2 });
				}}/>
			}
			<Divider/>
			{fileExplorerApp != null &&
				<ClickAction label={`Open in ${fileExplorerApp.name}`} icon={fileExplorerApp.iconUrl as string | undefined} onTrigger={() => {
					windowsManager?.open(fileExplorerApp.id, { path: directory?.path });
				}}/>
			}
			{terminalApp != null &&
				<ClickAction label={`Open in ${terminalApp.name}`} icon={terminalApp.iconUrl as string | undefined} onTrigger={() => {
					windowsManager?.open(terminalApp.id, { path: directory?.path });
				}}/>
			}
			<Divider/>
			<ClickAction label={"Share"} icon={ModalsManager.getModalIconUrl("share")} onTrigger={() => {
				openWindowedModal({
					size: new Vector2(350, 350),
					Modal: (props: ModalProps) => <Share {...props}/>
				});
			}}/>
		</Actions>
	});
	const { onContextMenu: onContextMenuFile } = useContextMenu({ Actions: (props) =>
		<Actions {...props}>
			<ClickAction label="Open" onTrigger={(event, file) => {
				if (windowsManager != null) (file as VirtualFile).open(windowsManager);
			}}/>
			{fileExplorerApp != null &&
				<ClickAction label={`Reveal in ${fileExplorerApp.name}`} icon={fileExplorerApp.iconUrl as string | undefined} onTrigger={(event, file) => {
					if (windowsManager != null)	(file as VirtualFile).parent?.open(windowsManager);
				}}/>
			}
			<ClickAction label="Delete" icon={faTrash} onTrigger={(event, file) => {
				(file as VirtualFile).delete();
			}}/>
		</Actions>
	});
	const { onContextMenu: onContextMenuFolder } = useContextMenu({ Actions: (props) =>
		<Actions {...props}>
			<ClickAction label="Open" onTrigger={(event, folder) => {
				if (windowsManager != null)	(folder as VirtualFolder).open(windowsManager);
			}}/>
			{fileExplorerApp != null &&
				<ClickAction label={`Open in ${fileExplorerApp.name}`} icon={fileExplorerApp.iconUrl as string | undefined} onTrigger={(event, folder) => {
					windowsManager?.open(fileExplorerApp.id, { path: (folder as VirtualFolder).path });
				}}/>
			}
			{terminalApp != null &&
				<ClickAction label={`Open in ${terminalApp.name}`} icon={terminalApp.iconUrl as string | undefined} onTrigger={(event, folder) => {
					if (windowsManager != null)	(folder as VirtualFolder).parent?.open(windowsManager);
				}}/>
			}
			<Divider/>
			<ClickAction label="Delete" icon={faTrash} onTrigger={(event, folder) => {
				(folder as VirtualFolder).delete();
			}}/>
		</Actions>
	});

	useEffect(() => {
		const settings = settingsManager?.getSettings(SettingsManager.VIRTUAL_PATHS.desktop);
		void settings?.get("wallpaper", setWallpaper);
		void settings?.get("show-icons", (value) => {
			if (value != null) {
				setShowIcons(value === "true");
			} else {
				setShowIcons(true);
			}
		});
		void settings?.get("icon-size", (value) => {
			if (isValidInteger(value))
				setIconSize(parseInt(value));
		});
		void settings?.get("icon-direction", (value) => {
			if (isValidInteger(value))
				setIconDirection(parseInt(value));
		});
	}, [settingsManager]);

	const onError = () => {
		const settings = settingsManager?.getSettings(SettingsManager.VIRTUAL_PATHS.desktop);
		void settings?.set("wallpaper", skin.defaultWallpaper);
	};

	const iconScale = 1 + ((isValidInteger(iconSize) ? iconSize : desktopConfig.defaultIconSize) - 1) / 5;
	const wallpaperClassName = useClassNames([styles.Wallpaper], "Desktop", "Wallpaper");

	return <>
		<ShortcutsListener/>
		<div
			className={useClassNames([styles.Desktop], "Desktop")}
			onContextMenu={onContextMenu as unknown as MouseEventHandler}
		>
			{showIcons && <DirectoryList
				directory={directory as VirtualFolder}
				className={styles.Content}
				style={{
					"--scale": `${iconScale}rem`,
					"--direction": iconDirection == 1 ? "row" : "column"
				}}
				fileClassName={styles["Item"]}
				folderClassName={styles["Item"]}
				onOpenFile={(event, file) => {
					(event).preventDefault();

					const options: Record<string, unknown> = {};
					if (file.name === "Info.md")
						options.size = new Vector2(575, 675);
					if (file.extension === "md")
						options.mode = "view";

					windowsManager?.openFile(file, options);
				}}
				onOpenFolder={(event, folder) => {
					if (fileExplorerApp != null) {
						windowsManager?.open(fileExplorerApp.id, {
							path: (folder as VirtualFolderLink).linkedPath ?? folder.path
						});
					}
				}}
				onContextMenuFile={onContextMenuFile as unknown as FileEventHandler}
				onContextMenuFolder={onContextMenuFolder as unknown as FolderEventHandler}
			/>}
			{wallpaper
				? <img
					src={wallpaper}
					className={wallpaperClassName}
					alt="Desktop wallpaper"
					onError={onError}
				/>
				: null
			}
		</div>
	</>;
});
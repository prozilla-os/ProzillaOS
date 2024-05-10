import { ChangeEventHandler, FC, KeyboardEventHandler, useCallback, useEffect, useState } from "react";
import { useVirtualRoot } from "../../../hooks/virtual-drive/virtualRootContext";
import styles from "./FileExplorer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faCaretLeft, faCaretRight, faCircleInfo, faCog, faDesktop, faFileLines, faHouse, faImage, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useWindowsManager } from "../../../hooks/windows/windowsManagerContext";
import { useContextMenu } from "../../../hooks/modals/contextMenu";
import { QuickAccessButton } from "./QuickAccessButton";
import { useWindowedModal } from "../../../hooks/modals/windowedModal";
import Vector2 from "../../../features/math/vector2";
import { DIALOG_CONTENT_TYPES } from "../../../config/modals.config";
import { DirectoryList, OnSelectionChangeParams } from "./directory-list/DirectoryList";
import { Actions } from "../../actions/Actions";
import { ClickAction } from "../../actions/actions/ClickAction";
import utilStyles from "../../../styles/utils.module.css";
import { DialogBox } from "../../modals/dialog-box/DialogBox";
import AppsManager from "../../../features/apps/appsManager";
import { APPS, APP_ICONS, APP_NAMES } from "../../../config/apps.config";
import { TITLE_SEPARATOR } from "../../../config/windows.config";
import { FileProperties } from "../../modals/file-properties/FileProperties";
import { useHistory } from "../../../hooks/_utils/history";
import { Divider } from "../../actions/actions/Divider";
import { CODE_FORMATS } from "../../../config/apps/textEditor.config";
import { SELECTOR_MODE } from "../../../config/apps/fileExplorer.config";
import { WindowProps } from "../../windows/WindowView";
import { VirtualFolder } from "../../../features/virtual-drive/folder/virtualFolder";
import { VirtualFile } from "../../../features/virtual-drive/file/virtualFile";
import { VirtualFolderLink } from "../../../features/virtual-drive/folder/virtualFolderLink";

interface FileExplorerProps extends WindowProps {
	startPath?: string;
	selectorMode?: number;
	Footer: FC;
	onSelectionChange: (params: OnSelectionChangeParams) => void;
	onSelectionFinish: Function;
}

export function FileExplorer({ startPath, selectorMode, Footer, onSelectionChange, onSelectionFinish }: FileExplorerProps) {
	const isSelector = (Footer != null && selectorMode != null && selectorMode !== SELECTOR_MODE.NONE);

	const virtualRoot = useVirtualRoot();
	const [currentDirectory, setCurrentDirectory] = useState<VirtualFolder>(virtualRoot.navigate(startPath ?? "~") as VirtualFolder);
	const [path, setPath] = useState<string>(currentDirectory?.path ?? "");
	const windowsManager = useWindowsManager();
	const [showHidden] = useState(true);
	const { history, stateIndex, pushState, undo, redo, undoAvailable, redoAvailable } = useHistory<string>(currentDirectory.path);

	const { openWindowedModal } = useWindowedModal();
	const { onContextMenu: onContextMenuFile } = useContextMenu({ Actions: (props) =>
		<Actions {...props}>
			<ClickAction label={!isSelector ? "Open" : "Select"} onTrigger={(event, file: VirtualFile) => {
				if (isSelector) {
					onSelectionChange?.({ files: [file.id], directory: currentDirectory });
					onSelectionFinish?.();
					return;
				}
				file.open(windowsManager);
			}}/>
			<ClickAction label="Delete" icon={faTrash} onTrigger={(event, file: VirtualFile) => {
				file.delete();
			}}/>
			<ClickAction label="Properties" icon={faCircleInfo} onTrigger={(event, file: VirtualFile) => {
				openWindowedModal({
					title: `${file.id} ${TITLE_SEPARATOR} Properties`,
					iconUrl: file.getIconUrl(),
					size: new Vector2(400, 500),
					Modal: (props: object) => <FileProperties file={file} {...props}/>
				});
			}}/>
		</Actions>
	});
	const { onContextMenu: onContextMenuFolder } = useContextMenu({ Actions: (props) =>
		<Actions {...props}>
			<ClickAction label="Open" onTrigger={(event, folder: VirtualFolder & VirtualFolderLink) => {
				changeDirectory(folder.linkedPath ?? folder.name);
			}}/>
			<ClickAction label={`Open in ${APP_NAMES.TERMINAL}`} icon={APP_ICONS.TERMINAL} onTrigger={(event, folder: VirtualFolder) => {
				windowsManager.open(APPS.TERMINAL, { startPath: folder.path });
			}}/>
			<Divider/>
			<ClickAction label="Delete" icon={faTrash} onTrigger={(event, folder: VirtualFolder) => {
				folder.delete();
			}}/>
		</Actions>
	});
	// const { onContextMenu: onNew } = useContextMenu({
	// 	modalsManager,
	// 	options: {
	// 		"File": () => { currentDirectory.createFile("New File"); },
	// 		"Folder": () => { currentDirectory.createFolder("New Folder"); }
	// 	}
	// });

	const changeDirectory = useCallback((path: string, absolute = false) => {
		if (path == null)
			return;

		if (currentDirectory == null)
			absolute = true;

		const directory = absolute ? virtualRoot.navigate(path) : currentDirectory.navigate(path);

		if (directory != null) {
			setCurrentDirectory(directory as VirtualFolder);
			setPath(directory.root ? "/" : directory.path);
			pushState(directory.path);
		}
	}, [currentDirectory, pushState, virtualRoot]);

	useEffect(() => {
		if (history.length === 0)
			return;

		const path = history[stateIndex];
		const directory = virtualRoot.navigate(path);
		if (directory != null) {
			setCurrentDirectory(directory as VirtualFolder);
			setPath(directory.root ? "/" : directory.path);
		}
	}, [history, stateIndex, virtualRoot]);

	const onPathChange = (event: Event) => {
		setPath((event.target as HTMLInputElement).value);
	};

	const onKeyDown = (event: KeyboardEvent) => {
		let value = (event.target as HTMLInputElement).value;

		if (event.key === "Enter") {
			if (value === "")
				value = "~";

			const directory = virtualRoot.navigate(value);

			if (directory == null) {
				openWindowedModal({
					title: "Error",
					iconUrl: AppsManager.getAppIconUrl(APPS.FILE_EXPLORER),
					size: new Vector2(300, 150),
					Modal: (props) =>
						<DialogBox {...props}>
							<p>Invalid path: "{value}"</p>
							<button data-type={DIALOG_CONTENT_TYPES.CloseButton}>Ok</button>
						</DialogBox>
				});
				return;
			}

			setCurrentDirectory(directory as VirtualFolder);
			setPath(directory.root ? "/" : directory.path);
		}
	};

	const itemCount = currentDirectory.getItemCount(showHidden);

	return (
		<div className={!isSelector ? styles.Container : `${styles.Container} ${styles.Selector}`}>
			<div className={styles.Header}>
				<button
					title="Back"
					tabIndex={0}
					className={styles["Icon-button"]}
					onClick={() => { undo(); }}
					disabled={!undoAvailable}
				>
					<FontAwesomeIcon icon={faCaretLeft}/>
				</button>
				<button
					title="Forward"
					tabIndex={0}
					className={styles["Icon-button"]}
					onClick={() => { redo(); }}
					disabled={!redoAvailable}
				>
					<FontAwesomeIcon icon={faCaretRight}/>
				</button>
				<button
					title="Up"
					tabIndex={0}
					className={styles["Icon-button"]}
					onClick={() => { changeDirectory(".."); }}
					disabled={currentDirectory.isRoot}
				>
					<FontAwesomeIcon icon={faArrowUp}/>
				</button>
				<button
					title="New"
					tabIndex={0}
					className={styles["Icon-button"]}
					onClick={() => {
						openWindowedModal({
							title: "Error",
							iconUrl: AppsManager.getAppIconUrl(APPS.FILE_EXPLORER),
							size: new Vector2(300, 150),
							Modal: (props) =>
								<DialogBox {...props}>
									<p>This folder is protected.</p>
									<button data-type={DIALOG_CONTENT_TYPES.CloseButton}>Ok</button>
								</DialogBox>
						});

						// if (currentDirectory.canBeEdited) {
						// 	onNew(event);
						// } else {
							
						// }
					}}
					disabled={!currentDirectory.canBeEdited}
				>
					<FontAwesomeIcon icon={faPlus}/>
				</button>
				<input
					value={path}
					type="text"
					aria-label="Path"
					className={styles["Path-input"]}
					tabIndex={0}
					onChange={onPathChange as unknown as ChangeEventHandler}
					onKeyDown={onKeyDown as unknown as KeyboardEventHandler}
					placeholder="Enter a path..."
				/>
				<button title="Search" tabIndex={0} className={styles["Icon-button"]}>
					<FontAwesomeIcon icon={faSearch}/>
				</button>
				<button title="Settings" tabIndex={0} className={styles["Icon-button"]}>
					<FontAwesomeIcon icon={faCog}/>
				</button>
			</div>
			<div className={styles.Body}>
				<div className={styles.Sidebar}>
					<QuickAccessButton name={"Home"} onClick={() => { changeDirectory("~"); }} icon={faHouse}/>
					<QuickAccessButton name={"Desktop"} onClick={() => { changeDirectory("~/Desktop"); }} icon={faDesktop}/>
					<QuickAccessButton name={"Images"} onClick={() => { changeDirectory("~/Pictures"); }} icon={faImage}/>
					<QuickAccessButton name={"Documents"} onClick={() => { changeDirectory("~/Documents"); }} icon={faFileLines}/>
				</div>
				<DirectoryList
					directory={currentDirectory} 
					id="main"
					className={styles.Main}
					showHidden={showHidden}
					onOpenFile={(event, file) => {
						(event as Event).preventDefault();
						if (isSelector)
							return void onSelectionFinish?.();
						const options: Record<string, string> = {};
						if (file.extension === "md" || CODE_FORMATS.includes(file.extension))
							options.mode = "view";
						windowsManager.openFile(file, options);
					}}
					onOpenFolder={(event, folder) => {
						changeDirectory((folder as VirtualFolderLink).linkedPath ?? folder.name);
					}}
					onContextMenuFile={onContextMenuFile}
					onContextMenuFolder={onContextMenuFolder}
					allowMultiSelect={selectorMode !== SELECTOR_MODE.SINGLE}
					onSelectionChange={onSelectionChange}
				/>
			</div>
			{!isSelector
				? <span className={styles.Footer}>
					<p className={utilStyles["Text-light"]}>
						{itemCount === 1
							? itemCount + " item"
							: itemCount + " items"
						}
					</p>
				</span>
				: <div className={`${styles.Footer} ${styles["Selector-footer"]}`}>
					<Footer/>
				</div>
			}
		</div>
	);
}
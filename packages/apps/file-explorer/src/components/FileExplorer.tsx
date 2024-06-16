import { ChangeEventHandler, FC, KeyboardEventHandler, useCallback, useEffect, useState } from "react";
import styles from "./FileExplorer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faCaretLeft, faCaretRight, faCircleInfo, faCog, faDesktop, faFileLines, faHouse, faImage, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { QuickAccessButton } from "./QuickAccessButton";
import { ImportButton } from "./ImportButton";
import { Actions, AppsManager, ClickAction, CODE_EXTENSIONS, DIALOG_CONTENT_TYPES, DialogBox, DirectoryList, Divider, FileEventHandler, FolderEventHandler, OnSelectionChangeParams, useAlert, useContextMenu, useHistory, useSystemManager, useVirtualRoot, useWindowedModal, useWindowsManager, utilStyles, Vector2, VirtualFile, VirtualFolder, VirtualFolderLink, VirtualRoot, WindowProps } from "@prozilla-os/core";
import { SELECTOR_MODE } from "../constants/fileExplorer.const";
import { FileProperties } from "./modals/file-properties/FileProperties";

interface FileExplorerProps extends WindowProps {
	path?: string;
	selectorMode?: number;
	Footer: FC;
	onSelectionChange: (params: OnSelectionChangeParams) => void;
	onSelectionFinish: Function;
}

export function FileExplorer({ app, path: startPath, selectorMode, Footer, onSelectionChange, onSelectionFinish }: FileExplorerProps) {
	const isSelector = (Footer != null && selectorMode != null && selectorMode !== SELECTOR_MODE.NONE);

	const virtualRoot = useVirtualRoot();
	const windowsManager = useWindowsManager();
	const { windowsConfig } = useSystemManager();

	const [currentDirectory, setCurrentDirectory] = useState<VirtualFolder>(virtualRoot?.navigate(startPath ?? "~") as VirtualFolder);
	const [path, setPath] = useState<string>(currentDirectory?.path ?? "");
	const [showHidden] = useState(true);
	const { history, stateIndex, pushState, undo, redo, undoAvailable, redoAvailable } = useHistory<string>(currentDirectory.path);
	const { alert } = useAlert();

	const { openWindowedModal } = useWindowedModal();
	const { onContextMenu: onContextMenuFile } = useContextMenu({ Actions: (props) =>
		<Actions {...props}>
			<ClickAction label={!isSelector ? "Open" : "Select"} onTrigger={(event, file) => {
				if (isSelector) {
					onSelectionChange?.({ files: [(file as VirtualFile).id], directory: currentDirectory });
					onSelectionFinish?.();
					return;
				}
				if (windowsManager != null)	(file as VirtualFile).open(windowsManager);
			}}/>
			<ClickAction label="Delete" icon={faTrash} onTrigger={(event, file) => {
				(file as VirtualFile).delete();
			}}/>
			<ClickAction label="Properties" icon={faCircleInfo} onTrigger={(event, file) => {
				openWindowedModal({
					title: `${(file as VirtualFile).id} ${windowsConfig.titleSeparator} Properties`,
					iconUrl: (file as VirtualFile).getIconUrl(),
					size: new Vector2(400, 500),
					Modal: (props: object) => <FileProperties file={file as VirtualFile} {...props}/>
				});
			}}/>
		</Actions>
	});
	const { onContextMenu: onContextMenuFolder } = useContextMenu({ Actions: (props) =>
		<Actions {...props}>
			<ClickAction label="Open" onTrigger={(event, folder) => {
				changeDirectory((folder as VirtualFolderLink).linkedPath ?? (folder as VirtualFolder).name);
			}}/>
			{/* <ClickAction label={`Open in ${APP_NAMES.TERMINAL}`} icon={APP_ICONS.TERMINAL} onTrigger={(event, folder) => {
				windowsManager?.open(APPS.TERMINAL, { startPath: (folder as VirtualFolder).path });
			}}/> */}
			<Divider/>
			<ClickAction label="Delete" icon={faTrash} onTrigger={(event, folder) => {
				(folder as VirtualFolder).delete();
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

		const directory = absolute ? virtualRoot?.navigate(path) : currentDirectory.navigate(path);

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
		const directory = virtualRoot?.navigate(path);
		if (directory != null) {
			setCurrentDirectory(directory as VirtualFolder);
			setPath(directory.root ? "/" : directory.path);
		}
	}, [history, stateIndex, virtualRoot]);

	useEffect(() => {
		type Error = { message: string };
		const onError = (error: unknown) => {
			alert({
				title: (error as Error).message,
				text: "You have exceeded the virtual drive capacity. Files and folders will not be saved until more storage is freed.",
				iconUrl: app?.id != null ? AppsManager.getAppIconUrl(app.id) : undefined,
				size: new Vector2(300, 200),
				single: true,
			});
		};

		virtualRoot?.on(VirtualRoot.EVENT_NAMES.ERROR, onError);

		return () => {
			virtualRoot?.off(VirtualRoot.EVENT_NAMES.ERROR, onError);
		};
	}, []);

	const onPathChange = (event: Event) => {
		setPath((event.target as HTMLInputElement).value);
	};

	const onKeyDown = (event: KeyboardEvent) => {
		let value = (event.target as HTMLInputElement).value;

		if (event.key === "Enter") {
			if (value === "")
				value = "~";

			const directory = virtualRoot?.navigate(value);

			if (directory == null) {
				openWindowedModal({
					title: "Error",
					iconUrl: app?.id != null ? AppsManager.getAppIconUrl(app.id) : undefined,
					size: new Vector2(300, 150),
					Modal: (props: {}) =>
						<DialogBox {...props}>
							<p>Invalid path: "{value}"</p>
							<button data-type={DIALOG_CONTENT_TYPES.closeButton}>Ok</button>
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
		<div className={!isSelector ? styles.FileExplorer : `${styles.FileExplorer} ${styles.Selector}`}>
			<div className={styles.Header}>
				<button
					title="Back"
					tabIndex={0}
					className={styles.IconButton}
					onClick={() => { undo(); }}
					disabled={!undoAvailable}
				>
					<FontAwesomeIcon icon={faCaretLeft}/>
				</button>
				<button
					title="Forward"
					tabIndex={0}
					className={styles.IconButton}
					onClick={() => { redo(); }}
					disabled={!redoAvailable}
				>
					<FontAwesomeIcon icon={faCaretRight}/>
				</button>
				<button
					title="Up"
					tabIndex={0}
					className={styles.IconButton}
					onClick={() => { changeDirectory(".."); }}
					disabled={currentDirectory.isRoot != null && currentDirectory.isRoot}
				>
					<FontAwesomeIcon icon={faArrowUp}/>
				</button>
				<button
					title="New"
					tabIndex={0}
					className={styles.IconButton}
					onClick={() => {
						// openWindowedModal({
						// 	title: "Error",
						// 	iconUrl: AppsManager.getAppIconUrl(APPS.FILE_EXPLORER),
						// 	size: new Vector2(300, 150),
						// 	Modal: (props) =>
						// 		<DialogBox {...props}>
						// 			<p>This folder is protected.</p>
						// 			<button data-type={DIALOG_CONTENT_TYPES.CloseButton}>Ok</button>
						// 		</DialogBox>
						// });

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
					className={styles.PathInput}
					tabIndex={0}
					onChange={onPathChange as unknown as ChangeEventHandler}
					onKeyDown={onKeyDown as unknown as KeyboardEventHandler}
					placeholder="Enter a path..."
				/>
				<ImportButton directory={currentDirectory}/>
				<button title="Search" tabIndex={0} className={styles.IconButton}>
					<FontAwesomeIcon icon={faSearch}/>
				</button>
				<button title="Settings" tabIndex={0} className={styles.IconButton}>
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
						event.preventDefault();
						if (isSelector)
							return void onSelectionFinish?.();
						const options: Record<string, string> = {};
						if (file.extension === "md" || (file.extension != null && CODE_EXTENSIONS.includes(file.extension)))
							options.mode = "view";
						windowsManager?.openFile(file, options);
					}}
					onOpenFolder={(event, folder) => {
						changeDirectory((folder as VirtualFolderLink).linkedPath ?? folder.name);
					}}
					onContextMenuFile={onContextMenuFile as unknown as FileEventHandler}
					onContextMenuFolder={onContextMenuFolder as unknown as FolderEventHandler}
					allowMultiSelect={selectorMode !== SELECTOR_MODE.SINGLE}
					onSelectionChange={onSelectionChange}
				/>
			</div>
			{!isSelector
				? <span className={styles.Footer}>
					<p className={utilStyles.TextLight}>
						{itemCount === 1
							? itemCount + " item"
							: itemCount + " items"
						}
					</p>
				</span>
				: <div className={styles.Footer}>
					<Footer/>
				</div>
			}
		</div>
	);
}
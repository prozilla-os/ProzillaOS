import { useCallback, useEffect, useState } from "react";
import { useVirtualRoot } from "../../../hooks/virtual-drive/virtualRootContext.js";
import styles from "./FileExplorer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faCaretLeft, faCaretRight, faCircleInfo, faCog, faDesktop, faFileLines, faHouse, faImage, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useWindowsManager } from "../../../hooks/windows/windowsManagerContext.js";
import { useContextMenu } from "../../../hooks/modals/contextMenu.js";
import { QuickAccessButton } from "./QuickAccessButton.jsx";
import { useWindowedModal } from "../../../hooks/modals/windowedModal.js";
import Vector2 from "../../../features/math/vector2.js";
import { DIALOG_CONTENT_TYPES } from "../../../constants/modals.js";
import { DirectoryList } from "./directory-list/DirectoryList.jsx";
import { Actions } from "../../actions/Actions.jsx";
import { ClickAction } from "../../actions/actions/ClickAction.jsx";
import utilStyles from "../../../styles/utils.module.css";
import { DialogBox } from "../../modals/dialog-box/DialogBox.jsx";
import AppsManager from "../../../features/applications/applications.js";
import { APPS } from "../../../constants/applications.js";
import { TITLE_SEPARATOR } from "../../../constants/windows.js";
import { FileProperties } from "../../modals/file-properties/FileProperties.jsx";
import { useHistory } from "../../../hooks/utils/history.js";

/**
 * @param {import("../../windows/WindowView.jsx").windowProps} props 
 */
export function FileExplorer({ startPath, app, modalsManager }) {
	const virtualRoot = useVirtualRoot();
	const [currentDirectory, setCurrentDirectory] = useState(virtualRoot.navigate(startPath ?? "~"));
	const [path, setPath] = useState(currentDirectory?.path ?? "");
	const windowsManager = useWindowsManager();
	const [showHidden] = useState(true);
	const { history, stateIndex, pushState, undo, redo, undoAvailable, redoAvailable } = useHistory(currentDirectory.path);

	const { openWindowedModal } = useWindowedModal({ modalsManager });
	const { onContextMenu: onContextMenuFile } = useContextMenu({ modalsManager, Actions: (props) =>
		<Actions {...props}>
			<ClickAction label="Open" onTrigger={(event, file) => {
				file.open(windowsManager);
			}}/>
			<ClickAction label="Delete" icon={faTrash} onTrigger={(event, file) => {
				file.delete();
			}}/>
			<ClickAction label="Properties" icon={faCircleInfo} onTrigger={(event, file) => {
				openWindowedModal({
					title: `${file.id} ${TITLE_SEPARATOR} Properties`,
					iconUrl: file.getIconUrl(),
					size: new Vector2(400, 500),
					Modal: (props) =>
						<FileProperties file={file} {...props}/>
				});
			}}/>
		</Actions>
	});
	const { onContextMenu: onContextMenuFolder } = useContextMenu({ modalsManager, Actions: (props) =>
		<Actions {...props}>
			<ClickAction label="Open" onTrigger={(event, folder) => {
				changeDirectory(folder.name);
			}}/>
			<ClickAction label="Delete" icon={faTrash} onTrigger={(event, folder) => {
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

	const changeDirectory = useCallback((path, absolute = false) => {
		if (path == null)
			return;

		if (currentDirectory == null)
			absolute = true;

		const directory = absolute ? virtualRoot.navigate(path) : currentDirectory.navigate(path);

		console.debug(directory);

		if (directory != null) {
			setCurrentDirectory(directory);
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
			setCurrentDirectory(directory);
			setPath(directory.root ? "/" : directory.path);
		}
	}, [history, stateIndex, virtualRoot]);

	const onPathChange = (event) => {
		setPath(event.target.value);
	};

	const onKeyDown = (event) => {
		let value = event.target.value;

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

			setCurrentDirectory(directory);
			setPath(directory.root ? "/" : directory.path);
		}
	};

	const itemCount = currentDirectory.getItemCount(showHidden);

	return (
		<div className={styles.Container}>
			<div className={styles.Header}>
				<button
					title="Back"
					tabIndex={0}
					className={styles["Icon-button"]}
					onClick={undo}
					disabled={!undoAvailable}
				>
					<FontAwesomeIcon icon={faCaretLeft}/>
				</button>
				<button
					title="Forward"
					tabIndex={0}
					className={styles["Icon-button"]}
					onClick={redo}
					disabled={!redoAvailable}
				>
					<FontAwesomeIcon icon={faCaretRight}/>
				</button>
				<button title="Up" tabIndex={0} className={styles["Icon-button"]} onClick={() => { changeDirectory(".."); }}>
					<FontAwesomeIcon icon={faArrowUp}/>
				</button>
				<button title="New" tabIndex={0} className={styles["Icon-button"]}
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
				>
					<FontAwesomeIcon icon={faPlus}/>
				</button>
				<input
					value={path}
					type="text"
					aria-label="Path"
					className={styles["Path-input"]}
					tabIndex={0}
					onChange={onPathChange}
					onKeyDown={onKeyDown}
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
					onClickFile={(event, file) => {
						event.preventDefault();
						windowsManager.openFile(file, { mode: "view" });
					}}
					onClickFolder={(event, folder) => {
						changeDirectory(folder.linkedPath ?? folder.name);
					}}
					onContextMenuFile={onContextMenuFile}
					onContextMenuFolder={onContextMenuFolder}
				/>
			</div>
			<span className={styles.Footer}>
				<p className={utilStyles["Text-light"]}>
					{itemCount === 1
						? itemCount + " item"
						: itemCount + " items"
					}
				</p>
			</span>
		</div>
	);
}
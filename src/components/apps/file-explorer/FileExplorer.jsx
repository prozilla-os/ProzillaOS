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
import { DIALOG_CONTENT_TYPES } from "../../../config/modals.config.js";
import { DirectoryList } from "./directory-list/DirectoryList.jsx";
import { Actions } from "../../actions/Actions.jsx";
import { ClickAction } from "../../actions/actions/ClickAction.jsx";
import utilStyles from "../../../styles/utils.module.css";
import { DialogBox } from "../../modals/dialog-box/DialogBox.jsx";
import AppsManager from "../../../features/apps/appsManager.js";
import { APPS, APP_ICONS, APP_NAMES } from "../../../config/apps.config.js";
import { TITLE_SEPARATOR } from "../../../config/windows.config.js";
import { FileProperties } from "../../modals/file-properties/FileProperties.jsx";
import { useHistory } from "../../../hooks/_utils/history.js";
import { Divider } from "../../actions/actions/Divider.jsx";
import { CODE_FORMATS } from "../../../config/apps/textEditor.config.js";
import { SELECTOR_MODE } from "../../../config/apps/fileExplorer.config.js";

/**
 * @param {import("../../windows/WindowView.jsx").windowProps} props 
 * @param {string} props.startPath
 * @param {*} props.Footer
 * @param {number} props.selectorMode
 * @param {import("./directory-list/DirectoryList.jsx").onSelectionChange} props.onSelectionChange
 * @param {Function} props.onSelectionFinish
 */
export function FileExplorer({ startPath, selectorMode, Footer, onSelectionChange, onSelectionFinish }) {
	const isSelector = (Footer != null && selectorMode != null && selectorMode !== SELECTOR_MODE.NONE);

	const virtualRoot = useVirtualRoot();
	const [currentDirectory, setCurrentDirectory] = useState(virtualRoot.navigate(startPath ?? "~"));
	const [path, setPath] = useState(currentDirectory?.path ?? "");
	const windowsManager = useWindowsManager();
	const [showHidden] = useState(true);
	const { history, stateIndex, pushState, undo, redo, undoAvailable, redoAvailable } = useHistory(currentDirectory.path);

	const { openWindowedModal } = useWindowedModal();
	const { onContextMenu: onContextMenuFile } = useContextMenu({ Actions: (props) =>
		<Actions {...props}>
			<ClickAction label={!isSelector ? "Open" : "Select"} onTrigger={(event, file) => {
				if (isSelector) {
					onSelectionChange?.({ files: [file.id], directory: currentDirectory });
					onSelectionFinish?.();
					return;
				}
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
					Modal: (props) => <FileProperties file={file} {...props}/>
				});
			}}/>
		</Actions>
	});
	const { onContextMenu: onContextMenuFolder } = useContextMenu({ Actions: (props) =>
		<Actions {...props}>
			<ClickAction label="Open" onTrigger={(event, folder) => {
				changeDirectory(folder.linkedPath ?? folder.name);
			}}/>
			<ClickAction label={`Open in ${APP_NAMES.TERMINAL}`} icon={APP_ICONS.TERMINAL} onTrigger={(event, folder) => {
				windowsManager.open(APPS.TERMINAL, { startPath: folder.path });
			}}/>
			<Divider/>
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
		<div className={!isSelector ? styles.Container : `${styles.Container} ${styles.Selector}`}>
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
				<button
					title="Up"
					tabIndex={0}
					className={styles["Icon-button"]}
					onClick={() => { changeDirectory(".."); }}
					disabled={currentDirectory.root}
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
					onChange={onPathChange}
					onKeyDown={onKeyDown}
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
						event.preventDefault();
						if (isSelector)
							return onSelectionFinish?.();
						const options = {};
						if (file.extension === "md" || CODE_FORMATS.includes(file.extension))
							options.mode = "view";
						windowsManager.openFile(file, options);
					}}
					onOpenFolder={(event, folder) => {
						changeDirectory(folder.linkedPath ?? folder.name);
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
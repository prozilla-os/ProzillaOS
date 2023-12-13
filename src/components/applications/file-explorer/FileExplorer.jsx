import { useState } from "react";
import { useVirtualRoot } from "../../../hooks/virtual-drive/virtualRootContext.js";
import styles from "./FileExplorer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faCaretLeft, faCaretRight, faCog, faDesktop, faFileLines, faHouse, faImage, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useWindowsManager } from "../../../hooks/windows/windowsManagerContext.js";
import { useContextMenu } from "../../../hooks/modals/contextMenu.js";
import { QuickAccessButton } from "./QuickAccessButton.jsx";
import { useDialogBox } from "../../../hooks/modals/dialogBox.js";
import Vector2 from "../../../features/math/vector2.js";
import { DIALOG_CONTENT_TYPES } from "../../../constants/modals.js";
import { DirectoryList } from "./directory-list/DirectoryList.jsx";

/**
 * @param {import("../../windows/WindowView.jsx").windowProps} props 
 */
export function FileExplorer({ startPath, app, modalsManager }) {
	const virtualRoot = useVirtualRoot();
	const [currentDirectory, setCurrentDirectory] = useState(virtualRoot.navigate(startPath ?? "~"));
	const [path, setPath] = useState(currentDirectory?.path ?? "");
	const windowsManager = useWindowsManager();
	const [showHidden] = useState(true);

	const { onContextMenu: onContextMenuFile } = useContextMenu({
		modalsManager,
		options: {
			"Open": (file) => {	file.open(windowsManager); },
			"Delete": (file) => { file.delete(); },
		}
	});
	const { onContextMenu: onContextMenuFolder } = useContextMenu({
		modalsManager,
		options: {
			"Open": (folder) => { changeDirectory(folder.name); },
			"Delete": (folder) => { folder.delete(); }
		}
	});
	// const { onContextMenu: onNew } = useContextMenu({
	// 	modalsManager,
	// 	options: {
	// 		"File": () => { currentDirectory.createFile("New File"); },
	// 		"Folder": () => { currentDirectory.createFolder("New Folder"); }
	// 	}
	// });
	const { onDialogBox } = useDialogBox({ modalsManager });

	const changeDirectory = (path, absolute = false) => {
		if (currentDirectory == null)
			absolute = true;

		const directory = absolute ? virtualRoot.navigate(path) : currentDirectory.navigate(path);

		console.log(directory);

		if (directory) {
			setCurrentDirectory(directory);
			setPath(directory.root ? "/" : directory.path);
		}
	};

	const onPathChange = (event) => {
		return setPath(event.target.value);
	};

	const onKeyDown = (event) => {
		let value = event.target.value;

		if (event.key === "Enter") {
			if (value === "")
				value = "~";

			const directory = virtualRoot.navigate(value);

			setCurrentDirectory(directory);
			setPath(directory.root ? "/" : directory.path);
		}
	};

	return (
		<div className={styles.Container}>
			<div className={styles.Header}>
				<button title="Back" tabIndex={0} className={styles["Icon-button"]}>
					<FontAwesomeIcon icon={faCaretLeft}/>
				</button>
				<button title="Forward" tabIndex={0} className={styles["Icon-button"]}>
					<FontAwesomeIcon icon={faCaretRight}/>
				</button>
				<button title="Up" tabIndex={0} className={styles["Icon-button"]} onClick={() => { changeDirectory(".."); }}>
					<FontAwesomeIcon icon={faArrowUp}/>
				</button>
				<button title="New" tabIndex={0} className={styles["Icon-button"]}
					onClick={(event) => {
						onDialogBox(event, {
							app,
							title: "Error",
							size: new Vector2(300, 150),
							children: <>
								<p>This folder is protected.</p>
								<button data-type={DIALOG_CONTENT_TYPES.CloseButton}>Ok</button>
							</>
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
					<QuickAccessButton name={"Images"} onClick={() => { changeDirectory("~/Images"); }} icon={faImage}/>
					<QuickAccessButton name={"Documents"} onClick={() => { changeDirectory("~/Documents"); }} icon={faFileLines}/>
				</div>
				<div id="main" className={styles.Main}>
					<DirectoryList
						directory={currentDirectory} 
						showHidden={showHidden}
						onClickFile={(event, file) => {
							event.preventDefault();
							windowsManager.openFile(file);
						}}
						onClickFolder={(event, folder) => {
							changeDirectory(folder.linkedPath ?? folder.name);
						}}
						onContextMenuFile={onContextMenuFile}
						onContextMenuFolder={onContextMenuFolder}
					/>
				</div>
			</div>
		</div>
	);
}
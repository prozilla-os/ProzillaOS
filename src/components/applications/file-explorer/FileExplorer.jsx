import { useState } from "react";
import { useVirtualRoot } from "../../../hooks/virtual-drive/virtualRootContext.js";
import styles from "./FileExplorer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faCaretLeft, faCaretRight, faCog, faDesktop, faFile, faFileLines, faFolder, faHouse, faImage, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { VirtualFile } from "../../../features/virtual-drive/virtualFile.js";
import { useWindowsManager } from "../../../hooks/windows/windowsManagerContext.js";
import utilStyles from "../../../styles/utils.module.css";
// import { useContextMenu } from "../../../hooks/modals/ContextMenu.js";
import { useModals } from "../../../hooks/modals/modals.js";
import { ModalsView } from "../../modals/ModalsView.jsx";

/**
 * @param {object} props
 * @param {VirtualFile} props.file
 */
function FilePreview({ file }) {
	let preview = null;

	switch (file.extension) {
		case "png":
			preview = (<div className={styles["File-button-preview"]}>
				<img src={file.source} alt={file.id} draggable="false"/>
			</div>);
			break;
		case "txt":
		case "md":
			preview = <FontAwesomeIcon icon={faFileLines}/>;
			break;
		default:
			preview = <FontAwesomeIcon icon={faFile}/>;
			break;
	}

	return preview;
}

export function FileExplorer({ startPath }) {
	const virtualRoot = useVirtualRoot();
	const [currentDirectory, setCurrentDirectory] = useState(virtualRoot.navigate(startPath ?? "~"));
	const [path, setPath] = useState(currentDirectory?.path ?? "");
	const windowsManager = useWindowsManager();
	const [showHidden] = useState(true);
	const [modalsManager, modals] = useModals();
	// const { onContextMenuFile } = useContextMenu({
	// 	modalsManager,
	// 	options: {
	// 		"Open": () => {}
	// 	}
	// });

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
			<ModalsView modalsManager={modalsManager} modals={modals}/>
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
				<button title="New" tabIndex={0} className={styles["Icon-button"]}>
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
					<button
						tabIndex={0}
						className={`${styles["Nav-button"]} ${utilStyles["Text-semibold"]}`}
						onClick={() => { changeDirectory("~"); }}>
						<FontAwesomeIcon icon={faHouse}/>
						Home
					</button>
					<button
						tabIndex={0}
						className={`${styles["Nav-button"]} ${utilStyles["Text-semibold"]}`}
						onClick={() => { changeDirectory("~/Desktop"); }}>
						<FontAwesomeIcon icon={faDesktop}/>
						Desktop
					</button>
					<button
						tabIndex={0}
						className={`${styles["Nav-button"]} ${utilStyles["Text-semibold"]}`}
						onClick={() => { changeDirectory("~/Documents"); }}>
						<FontAwesomeIcon icon={faFileLines}/>
						Documents
					</button>
					<button
						tabIndex={0}
						className={`${styles["Nav-button"]} ${utilStyles["Text-semibold"]}`}
						onClick={() => { changeDirectory("~/Images"); }}>
						<FontAwesomeIcon icon={faImage}/>
						Images
					</button>
				</div>
				<div className={styles.Main}>
					{currentDirectory?.getSubFolders(showHidden)?.map(({ name }, index) => 
						<button key={index} tabIndex={0} className={styles["Folder-button"]}
							onClick={() => {
								changeDirectory(name);
							}}
						>
							<FontAwesomeIcon icon={faFolder}/>
							<p>{name}</p>
						</button>
					)}
					{currentDirectory?.getFiles(showHidden)?.map((file, index) => 
						<button key={index} tabIndex={0} className={styles["File-button"]}
							onClick={(event) => {
								event.preventDefault();
								windowsManager.openFile(file);
							}}
						>
							<FilePreview file={file}/>
							<p>{file.id}</p>
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
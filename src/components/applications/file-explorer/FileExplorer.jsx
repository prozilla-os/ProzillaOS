import { useState } from "react";
import { useVirtualRoot } from "../../../hooks/virtual-drive/VirtualRootContext.js";
import styles from "./FileExplorer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faCaretLeft, faCaretRight, faCog, faDesktop, faFile, faFileLines, faFolder, faHouse, faImage, faSearch } from "@fortawesome/free-solid-svg-icons";
// eslint-disable-next-line no-unused-vars
import { VirtualFile } from "../../../features/virtual-drive/virtual-file.js";
import { useWindowsManager } from "../../../hooks/windows/WindowsManagerContext.js";

/**
 * @param {Object} props
 * @param {VirtualFile} props.file
 */
function FilePreview({ file }) {
	let preview = null;

	switch (file.extension) {
		case "png":
			preview = (<div className={styles["File-button-preview"]}>
				<img src={file.source} alt={file.id}/>
			</div>)
			break;
		case "txt":
		case "md":
			preview = <FontAwesomeIcon icon={faFileLines}/>
			break;
		default:
			preview = <FontAwesomeIcon icon={faFile}/>
			break;
	}

	return preview;
}

export function FileExplorer({ startPath }) {
	const virtualRoot = useVirtualRoot();
	const [currentDirectory, setCurrentDirectory] = useState(virtualRoot.navigate(startPath ?? "~"));
	const [path, setPath] = useState(currentDirectory.path);
	const windowsManager = useWindowsManager();
	const [showHidden] = useState(true);

	const changeDirectory = (path, absolute = false) => {
		const directory = absolute ? virtualRoot.navigate(path) : currentDirectory.navigate(path);

		console.log(directory);

		if (directory) {
			setCurrentDirectory(directory);
			setPath(directory.path);
		}
	}

	const onPathChange = (event) => {
		return setPath(event.target.value);
	};

	const onKeyDown = (event) => {
		const value = event.target.value;

		if (event.key === "Enter") {
			setCurrentDirectory(virtualRoot.navigate(value));
		}
	};

	return (
		<div className={styles.Container}>
			<div className={styles.Header}>
				<button title="Back" className={styles["Icon-button"]}>
					<FontAwesomeIcon icon={faCaretLeft}/>
				</button>
				<button title="Forward" className={styles["Icon-button"]}>
					<FontAwesomeIcon icon={faCaretRight}/>
				</button>
				<button title="Up" className={styles["Icon-button"]} onClick={() => { changeDirectory(".."); }}>
					<FontAwesomeIcon icon={faArrowUp}/>
				</button>
				<input
					value={path}
					type="text"
					className={styles["Path-input"]}
					onChange={onPathChange}
					onKeyDown={onKeyDown}
				/>
				<button title="Search" className={styles["Icon-button"]}>
					<FontAwesomeIcon icon={faSearch}/>
				</button>
				<button title="Settings" className={styles["Icon-button"]}>
					<FontAwesomeIcon icon={faCog}/>
				</button>
			</div>
			<div className={styles.Body}>
				<div className={styles.Sidebar}>
					<button title="Home" className={styles["Nav-button"]} onClick={() => { changeDirectory("~"); }}>
						<FontAwesomeIcon icon={faHouse}/>
						Home
					</button>
					<button title="Desktop" className={styles["Nav-button"]} onClick={() => { changeDirectory("~/Desktop"); }}>
						<FontAwesomeIcon icon={faDesktop}/>
						Desktop
					</button>
					<button title="Documents" className={styles["Nav-button"]} onClick={() => { changeDirectory("~/Documents"); }}>
						<FontAwesomeIcon icon={faFileLines}/>
						Documents
					</button>
					<button title="Images" className={styles["Nav-button"]} onClick={() => { changeDirectory("~/Images"); }}>
						<FontAwesomeIcon icon={faImage}/>
						Images
					</button>
				</div>
				<div className={styles.Main}>
					{currentDirectory.getFiles(showHidden).map((file, index) => 
						<button key={index} title={file.id} className={styles["File-button"]} onClick={(event) => {
							event.preventDefault();
							windowsManager.openFile(file);
						}}>
							<FilePreview file={file}/>
							<p>{file.id}</p>
						</button>
					)}
					{currentDirectory.getSubFolders(showHidden).map(({ name }, index) => 
						<button key={index} title={name} className={styles["Folder-button"]} onClick={() => {
							changeDirectory(name);
						}}>
							<FontAwesomeIcon icon={faFolder}/>
							<p>{name}</p>
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
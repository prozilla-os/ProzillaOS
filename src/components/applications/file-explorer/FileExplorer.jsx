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
			preview = <FontAwesomeIcon icon={faImage}/>
			break;
		default:
			preview = <FontAwesomeIcon icon={faFile}/>
			break;
	}

	return preview;
}

export function FileExplorer() {
	const virtualRoot = useVirtualRoot();
	const [currentDirectory, setCurrentDirectory] = useState(virtualRoot.navigate("~"));
	const [path, setPath] = useState(currentDirectory.path);
	const windowsManager = useWindowsManager();

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
				<button className={styles["Icon-button"]}>
					<FontAwesomeIcon icon={faCaretLeft}/>
				</button>
				<button className={styles["Icon-button"]}>
					<FontAwesomeIcon icon={faCaretRight}/>
				</button>
				<button className={styles["Icon-button"]} onClick={() => { changeDirectory(".."); }}>
					<FontAwesomeIcon icon={faArrowUp}/>
				</button>
				<input
					value={path}
					type="text"
					className={styles["Path-input"]}
					onChange={onPathChange}
					onKeyDown={onKeyDown}
				/>
				<button className={styles["Icon-button"]}>
				<FontAwesomeIcon icon={faSearch}/>
				</button>
				<button className={styles["Icon-button"]}>
					<FontAwesomeIcon icon={faCog}/>
				</button>
			</div>
			<div className={styles.Body}>
				<div className={styles.Sidebar}>
					<button className={styles["Nav-button"]} onClick={() => { changeDirectory("~"); }}>
						<FontAwesomeIcon icon={faHouse}/>
						Home
					</button>
					<button className={styles["Nav-button"]} onClick={() => { changeDirectory("~/Desktop"); }}>
						<FontAwesomeIcon icon={faDesktop}/>
						Desktop
					</button>
					<button className={styles["Nav-button"]} onClick={() => { changeDirectory("~/Documents"); }}>
						<FontAwesomeIcon icon={faFileLines}/>
						Documents
					</button>
					<button className={styles["Nav-button"]} onClick={() => { changeDirectory("~/Images"); }}>
						<FontAwesomeIcon icon={faImage}/>
						Images
					</button>
				</div>
				<div className={styles.Main}>
					{currentDirectory.files.map((file, index) => 
						<button key={index} className={styles["File-button"]} onClick={(event) => {
							event.preventDefault();
							windowsManager.openFile(file);
						}}>
							<FilePreview file={file}/>
							<p>{file.id}</p>
						</button>
					)}
					{currentDirectory.subFolders.map(({ name }, index) => 
						<button key={index} className={styles["Folder-button"]} onClick={() => {
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
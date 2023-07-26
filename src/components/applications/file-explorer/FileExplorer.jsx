import { useState } from "react";
import { useVirtualRoot } from "../../../hooks/virtual-drive/VirtualRootContext.js";
import styles from "./FileExplorer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faCaretLeft, faCaretRight, faCog, faDesktop, faFileLines, faHouse, faImage, faSearch } from "@fortawesome/free-solid-svg-icons";

export function FileExplorer() {
	const virtualRoot = useVirtualRoot();
	const [currentDirectory, setCurrentDirectory] = useState(virtualRoot.navigate("~"));
	const [path, setPath] = useState(currentDirectory.path);

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
	}

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

				</div>
			</div>
		</div>
	);
}
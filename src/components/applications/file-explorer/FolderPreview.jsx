import { faFolder, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./FolderPreview.module.css";
import { VirtualFolder } from "../../../features/virtual-drive/virtualFolder.js";

/**
 * @param {object} props
 * @param {VirtualFolder} props.folder
 */
export function FolderPreview({ folder }) {
	return (<div>
		<FontAwesomeIcon icon={faFolder}/>
		{folder.linkedPath
			? <div className={styles["Folder-link-icon"]}><FontAwesomeIcon icon={faLink}/></div>
			: null
		}
	</div>);
}
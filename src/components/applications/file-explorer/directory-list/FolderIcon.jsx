import styles from "./DirectoryList.module.css";
import { VirtualFolder } from "../../../../features/virtual-drive/virtualFolder.js";
import { ImagePreview } from "./ImagePreview.jsx";
import AppsManager from "../../../../features/applications/applications.js";
import { APPS } from "../../../../constants/applications.js";

/**
 * @param {object} props
 * @param {VirtualFolder} props.folder
 * @param {string} props.iconUrl
 */
export function FolderIcon({ folder, iconUrl }) {
	let preview = null;

	if (iconUrl) {
		preview = <ImagePreview source={iconUrl}/>;
	} else if (folder.linkedPath) {
		preview = <ImagePreview source={AppsManager.getAppIconUrl(APPS.FILE_EXPLORER, "folder-link")}/>;
	} else {
		preview = <ImagePreview source={AppsManager.getAppIconUrl(APPS.FILE_EXPLORER, "folder")}/>;
	}

	return (<div className={styles["Folder-icon"]}>
		{preview}
	</div>);
}
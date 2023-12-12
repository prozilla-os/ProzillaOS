import styles from "./DirectoryList.module.css";
import { VirtualFile } from "../../../../features/virtual-drive/virtualFile.js";
import { ImagePreview } from "./ImagePreview.jsx";
import AppsManager from "../../../../features/applications/applications.js";
import { APPS } from "../../../../constants/applications.js";

/**
 * @param {object} props
 * @param {VirtualFile} props.file
 * @param {string} props.iconUrl
 */
export function FileIcon({ file, iconUrl }) {
	let preview = null;

	if (iconUrl && file.extension !== "png") {
		preview = <ImagePreview source={iconUrl}/>;
	} else {
		switch (file.extension) {
			case "png":
				preview = <ImagePreview source={file.source}/>;
				break;
			case "txt":
			case "md":
				preview = <ImagePreview source={AppsManager.getAppIconUrl(APPS.FILE_EXPLORER, "file-text")}/>;
				break;
			case "xml":
				preview = <ImagePreview source={AppsManager.getAppIconUrl(APPS.FILE_EXPLORER, "file-code")}/>;
				break;
			default:
				preview = <ImagePreview source={AppsManager.getAppIconUrl(APPS.FILE_EXPLORER, "file")}/>;
				break;
		}
	}

	return (<div className={styles["File-icon"]}>
		{preview}
	</div>);
}
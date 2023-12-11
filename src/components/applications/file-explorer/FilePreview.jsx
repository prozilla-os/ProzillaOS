import { faFile, faFileInvoice, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./FilePreview.module.css";
import { VirtualFile } from "../../../features/virtual-drive/virtualFile.js";

/**
 * @param {object} props
 * @param {VirtualFile} props.file
 */
export function FilePreview({ file }) {
	let preview = null;

	switch (file.extension) {
		case "png":
			preview = (<div className={styles["File-button-preview"]}>
				<img src={file.source} alt={file.id} draggable="false"/>
			</div>);
			break;
		case "txt":
			preview = <FontAwesomeIcon icon={faFileLines}/>;
			break;
		case "md":
			preview = <FontAwesomeIcon icon={faFileInvoice}/>;
			break;
		default:
			preview = <FontAwesomeIcon icon={faFile}/>;
			break;
	}

	return preview;
}
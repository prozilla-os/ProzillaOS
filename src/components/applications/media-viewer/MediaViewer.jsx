// eslint-disable-next-line no-unused-vars
import { VirtualFile } from "../../../features/virtual-drive/virtual-file.js"
import styles from "./MediaViewer.module.css";

/**
 * 
 * @param {Object} props
 * @param {VirtualFile} props.file
 * @returns 
 */
export function MediaViewer({ file }) {
	if (file == null)
		return (<p>No file to render.</p>);

	if (!["png"].includes(file.extension))
		return (<p>Invalid file format.</p>);

	if (file.source == null)
		return (<p>File failed to load.</p>);

	return (
		<div className={styles.Container}>
			<img src={file.source} alt={file.id}/>
		</div>
	);
}
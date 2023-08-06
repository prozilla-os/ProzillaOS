// eslint-disable-next-line no-unused-vars
import { VirtualFile } from "../../../features/virtual-drive/virtual-file.js"
import { useWindowsManager } from "../../../hooks/windows/WindowsManagerContext.js";
import styles from "./MediaViewer.module.css";

/**
 * @param {object} props
 * @param {VirtualFile} props.file
 * @param {Function} props.close
 */
export function MediaViewer({ file, close }) {
	const windowsManager = useWindowsManager();

	if (file == null) {
		setTimeout(() => {
			windowsManager.open("file-explorer", { startPath: "~/Images" });
			close();
		}, 10);
		return;
	}

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
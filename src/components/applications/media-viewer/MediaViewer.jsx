
import { useEffect } from "react";
import { VirtualFile } from "../../../features/virtual-drive/virtualFile.js";
import { useWindowsManager } from "../../../hooks/windows/windowsManagerContext.js";
import styles from "./MediaViewer.module.css";
import { APPS } from "../../../constants/applications.js";

/**
 * @param {object} props
 * @param {VirtualFile} props.file
 * @param {Function} props.close
 * @param {Function} props.setTitle
 */
export function MediaViewer({ file, close, setTitle }) {
	const windowsManager = useWindowsManager();

	useEffect(() => {
		if (file != null)
			setTitle(file.id);
	}, [file, setTitle]);

	if (file == null) {
		setTimeout(() => {
			windowsManager.open(APPS.FILE_EXPLORER, { startPath: "~/Images" });
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
			<img src={file.source} alt={file.id} draggable="false"/>
		</div>
	);
}
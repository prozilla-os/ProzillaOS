
import { useEffect } from "react";
import { useWindowsManager } from "../../../hooks/windows/windowsManagerContext";
import styles from "./MediaViewer.module.css";
import { APPS } from "../../../config/apps.config";
import { IMAGE_FORMATS } from "../../../config/apps/mediaViewer.config";

/**
 * @param {import("../../windows/WindowView.jsx").windowProps} props 
 */
export function MediaViewer({ file, close, setTitle }) {
	const windowsManager = useWindowsManager();

	useEffect(() => {
		if (file != null)
			setTitle(file.id);
	}, [file, setTitle]);

	if (file == null) {
		setTimeout(() => {
			windowsManager.open(APPS.FILE_EXPLORER, { startPath: "~/Pictures" });
			close();
		}, 10);
		return;
	}

	if (!IMAGE_FORMATS.includes(file.extension))
		return (<p>Invalid file format.</p>);

	if (file.source == null)
		return (<p>File failed to load.</p>);

	return (
		<div className={styles.Container}>
			<img src={file.source} alt={file.id} draggable="false"/>
		</div>
	);
}
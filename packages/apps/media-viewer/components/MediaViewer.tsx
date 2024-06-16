
import { useEffect } from "react";
import { useWindowsManager } from "../../../hooks/windows/windowsManagerContext";
import styles from "./MediaViewer.module.css";
import { APPS } from "../../../config/apps.config";
import { IMAGE_FORMATS } from "../../../config/apps/mediaViewer.config";
import { VirtualFile } from "../../../features/virtual-drive/file";
import { WindowProps } from "../../windows/WindowView";

interface MediaViewerProps extends WindowProps {
	file?: VirtualFile;
}

export function MediaViewer({ file, close, setTitle }: MediaViewerProps) {
	const windowsManager = useWindowsManager();

	useEffect(() => {
		if (file != null) setTitle?.(file.id);
	}, [file, setTitle]);

	if (file == null) {
		setTimeout(() => {
			windowsManager?.open(APPS.FILE_EXPLORER, { path: "~/Pictures" });
			close?.();
		}, 10);
		return;
	}

	if (file.extension == null || !IMAGE_FORMATS.includes(file.extension)) return <p>Invalid file format.</p>;

	if (file.source == null) return <p>File failed to load.</p>;

	return <div className={styles.MediaViewer}>
		<img src={file.source} alt={file.id} draggable="false"/>
	</div>;
}
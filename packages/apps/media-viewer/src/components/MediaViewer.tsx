import { useEffect } from "react";
import styles from "./MediaViewer.module.css";
import { AppsConfig, IMAGE_EXTENSIONS, useSystemManager, useWindowsManager, VirtualFile, WindowProps } from "@prozilla-os/core";

export interface MediaViewerProps extends WindowProps {
	file?: VirtualFile;
}

export function MediaViewer({ file, close, setTitle }: MediaViewerProps) {
	const { appsConfig } = useSystemManager();
	const windowsManager = useWindowsManager();

	useEffect(() => {
		if (file != null) setTitle?.(file.id);
	}, [file, setTitle]);

	if (file == null) {
		const fileExplorerApp = appsConfig.getAppByRole(AppsConfig.APP_ROLES.FileExplorer);

		setTimeout(() => {
			if (fileExplorerApp != null)
				windowsManager?.open(fileExplorerApp.id, { path: "~/Pictures" });
			close?.();
		}, 10);
		return;
	}

	if (file.extension == null || !IMAGE_EXTENSIONS.includes(file.extension)) return <p>Invalid file format.</p>;

	if (file.source == null) return <p>File failed to load.</p>;

	return <div className={styles.MediaViewer}>
		<img src={file.source} alt={file.id} draggable="false"/>
	</div>;
}
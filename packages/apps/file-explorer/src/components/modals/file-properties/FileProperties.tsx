import styles from "./FileProperties.module.css";
import { ImagePreview, ModalProps, StorageManager, useSystemManager, utilStyles, VirtualFile, WindowedModal } from "@prozilla-os/core";

interface FilePropetiesProps extends ModalProps {
	file: VirtualFile;
}

export function FileProperties({ modal, params, file, ...props }: FilePropetiesProps) {
	const { appsConfig } = useSystemManager();
	const associatedApp = file.extension != null ? appsConfig.getAppByFileExtension(file.extension) : null;

	return <WindowedModal className={styles.FileProperties} modal={modal} params={params} {...props}>
		<span className={styles.Section}>
			<ImagePreview className={styles.Icon} source={file.getIconUrl()}/>
			<p className={`${styles.Line} ${utilStyles.TextBold}`}>{file.id}</p>
		</span>
		<span className={styles.Section}>
			<p className={styles.Line}>Type: {file.getType()}</p>
			{associatedApp != null &&
				<span className={styles.Line}>
					Opens with: 
					<ImagePreview className={styles.AppIcon} source={associatedApp.iconUrl ?? ""}/>
					{associatedApp.name}
				</span>
			}
		</span>
		<span className={styles.Section}>
			<p className={styles.Line}>Location: {file.path}</p>
			<p className={styles.Line}>Size: {StorageManager.getByteSize(file.source ?? file.content as string | null)} bytes</p>
			<p className={styles.Line}>Size on drive: {StorageManager.getByteSize(file.toString())} bytes</p>
		</span>
		<span className={styles.Section}>
			<p className={styles.Line}>Attributes: {file.isProtected ? "Protected" : "N/A"}</p>
		</span>
	</WindowedModal>;
}
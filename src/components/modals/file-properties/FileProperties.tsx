import { ImagePreview } from "../../apps/file-explorer/directory-list/ImagePreview";
import { WindowedModal } from "../_utils/WindowedModal";
import styles from "./FileProperties.module.css";
import utilStyles from "../../../styles/utils.module.css";
import { StorageManager } from "../../../features/storage/storageManager";
import AppsManager from "../../../features/apps/appsManager";
import { ModalProps } from "../ModalView.js";
import { VirtualFile } from "../../../features/virtual-drive/file/virtualFile";

interface FilePropetiesProps extends ModalProps {
	file: VirtualFile;
}

export function FileProperties({ modal, params, file, ...props }: FilePropetiesProps) {
	const associatedApp = AppsManager.getAppByFileExtension(file.extension);

	return <WindowedModal className={styles.Container} modal={modal} params={params} {...props}>
		<span className={styles["Section"]}>
			<ImagePreview className={styles["Icon"]} source={file.getIconUrl()}/>
			<p className={`${styles["Line"]} ${utilStyles["Text-bold"]}`}>{file.id}</p>
		</span>
		<span className={styles["Section"]}>
			<p className={styles["Line"]}>Type: {file.getType()}</p>
			<span className={styles["Line"]}>
				Opens with: 
				<ImagePreview className={styles["App-icon"]} source={AppsManager.getAppIconUrl(associatedApp.id)}/>
				{associatedApp.name}
			</span>
		</span>
		<span className={styles["Section"]}>
			<p className={styles["Line"]}>Location: {file.path}</p>
			<p className={styles["Line"]}>Size: {StorageManager.getByteSize(file.source ?? file.content)} bytes</p>
			<p className={styles["Line"]}>Size on drive: {StorageManager.getByteSize(file.toString())} bytes</p>
		</span>
		<span className={styles["Section"]}>
			<p className={styles["Line"]}>Attributes: {file.isProtected ? "Protected" : "N/A"}</p>
		</span>
	</WindowedModal>;
}
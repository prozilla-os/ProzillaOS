import { FormEventHandler, ReactElement } from "react";
import styles from "./FileExplorer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { VirtualFile } from "../../../features/virtual-drive/file";
import { VirtualFolder } from "../../../features/virtual-drive/folder";

interface ImportButtonProps {
	directory: VirtualFolder;
}

export default function ImportButton({ directory }: ImportButtonProps): ReactElement {
	const onChange = (event: InputEvent) => {
		const files = (event.target as HTMLInputElement).files;

		Array.from(files).forEach((file: File) => {
			const { name, extension } = VirtualFile.convertId(file.name);

			const reader = new FileReader();
			reader.onload = (event: Event) => {
				const { result } = event.target as FileReader;

				// Create a file with the same name and extension, with a base64 string as a source
				directory.createFile(name, extension, (virtualFile) => {
					virtualFile.setSource(result as string);
				});
			};
			reader.readAsDataURL(file);
		});
	};

	return <label title="Import" tabIndex={0} className={styles.IconButton}>
		<input
			type="file"
			id="import"
			multiple
			style={{ display: "none" }}
			onChange={onChange as unknown as FormEventHandler}
		/>
		<FontAwesomeIcon icon={faDownload}/>
	</label>;
}
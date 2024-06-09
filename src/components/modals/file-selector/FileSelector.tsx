import { useState } from "react";
import { APP_ICONS } from "../../../config/apps.config";
import { SELECTOR_MODE } from "../../../config/apps/fileExplorer.config";
import { Button } from "../../_utils/button/Button";
import { FileExplorer } from "../../apps/file-explorer/FileExplorer";
import { WindowedModal } from "../_utils/WindowedModal";
import styles from "./FileSelector.module.css";
import { VirtualFile } from "../../../features/virtual-drive/file";
import { ModalProps } from "../ModalView";
import { VirtualFolder } from "../../../features/virtual-drive/folder";

interface FileSelectorProps extends ModalProps {
	type: number;
	allowedFormats?: string[];
	onFinish: (result: VirtualFile | VirtualFile[]) => void;
}

export function FileSelector({ modal, params, type, allowedFormats, onFinish, ...props }: FileSelectorProps) {
	const multi = (type === SELECTOR_MODE.MULTIPLE);

	const [selection, setSelection] = useState<string[]>(multi ? [] : null);
	const [directory, setDirectory] = useState<VirtualFolder>(null);

	const finish = (event: Event) => {
		event?.preventDefault();

		if (directory == null || selection == null)
			return;

		const files = selection.map((id) => {
			const { name, extension } = VirtualFile.convertId(id);
			return directory.findFile(name, extension);
		}).filter((file) => {
			if (file == null)
				return false;
			const validFormat = (allowedFormats == null || allowedFormats.includes(file.extension));
			return validFormat;
		});

		if (files.length === 0)
			return;

		modal.close();
		onFinish?.(multi ? files : files[0]);
	};

	return <WindowedModal modal={modal} params={{
		title: multi ? "Select files" : "Select a file",
		iconUrl: APP_ICONS.FILE_EXPLORER,
		...params,
	}} {...props}>
		<FileExplorer
			selectorMode={type}
			Footer={() =>
				<div className={styles.Footer}>
					<span className={styles.Selection}>
						{multi
							? <p>Selected file(s): {selection.join(", ")}</p>
							: <p>Selected file: {selection ?? ""}</p>
						}
					</span>
					<div className={styles.Buttons}>
						<Button className={styles.Button} onClick={finish}>
							Confirm
						</Button>
						<Button className={styles.Button} onClick={() => { modal.close(); }}>
							Cancel
						</Button>
					</div>
				</div>
			}
			onSelectionChange={({ files, directory }) => {
				setSelection(files);
				setDirectory(directory);
			}}
			onSelectionFinish={finish}
		/>
	</WindowedModal>;
}
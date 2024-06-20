import { useState } from "react";
import { Button } from "../../_utils/button/Button";
import { WindowedModal } from "../_utils/WindowedModal";
import styles from "./FileSelector.module.css";
import { ModalProps } from "../ModalView";
import { VirtualFile } from "../../../features/virtual-drive/file";
import { VirtualFolder } from "../../../features/virtual-drive/folder";
// import { FileSelectorMode, fileExplorer } from "@prozilla-os/file-explorer";

interface FileSelectorProps extends ModalProps {
// 	type: FileSelectorMode;
// 	allowedFormats?: string[];
// 	onFinish: (result: VirtualFile | VirtualFile[]) => void;
}

export function FileSelector({ modal, params, type, allowedFormats, onFinish, ...props }: FileSelectorProps) {
	// const multi = (type == FileSelectorMode.Multi);

	// const [selection, setSelection] = useState<string[] | null>(multi ? [] : null);
	// const [directory, setDirectory] = useState<VirtualFolder | null>(null);

	// const finish = (event: Event) => {
	// 	event?.preventDefault();

	// 	if (directory == null || selection == null)
	// 		return;

	// 	const files = selection.map((id) => {
	// 		const { name, extension } = VirtualFile.splitId(id);
	// 		return directory.findFile(name, extension);
	// 	}).filter((file) => {
	// 		if (file == null)
	// 			return false;
	// 		const validFormat = (allowedFormats == null || (file.extension != null && allowedFormats.includes(file.extension)));
	// 		return validFormat;
	// 	}) as VirtualFile[];

	// 	if (files.length === 0)
	// 		return;

	// 	modal?.close();
	// 	onFinish?.(multi ? files : files[0]);
	// };

	// return <WindowedModal modal={modal} params={{
	// 	title: multi ? "Select files" : "Select a file",
	// 	iconUrl: fileExplorer.iconUrl as string | undefined,
	// 	...params,
	// }} {...props}>
	// 	<fileExplorer.WindowContent
	// 		selectorMode={type}
	// 		Footer={() =>
	// 			<div className={styles.Footer}>
	// 				<span className={styles.Selection}>
	// 					{multi
	// 						? <p>Selected file(s): {selection != null ? selection.join(", ") : ""}</p>
	// 						: <p>Selected file: {selection ?? ""}</p>
	// 					}
	// 				</span>
	// 				<div className={styles.Buttons}>
	// 					<Button className={styles.Button} onClick={finish}>
	// 						Confirm
	// 					</Button>
	// 					<Button className={styles.Button} onClick={() => { modal?.close(); }}>
	// 						Cancel
	// 					</Button>
	// 				</div>
	// 			</div>
	// 		}
	// 		onSelectionChange={({ files, directory }) => {
	// 			setSelection(files as string[] | null);
	// 			setDirectory(directory as VirtualFolder);
	// 		}}
	// 		onSelectionFinish={finish}
	// 	/>
	// </WindowedModal>;
}
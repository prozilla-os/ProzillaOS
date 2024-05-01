import { useState } from "react";
import { APP_ICONS } from "../../../config/apps.config.js";
import { SELECTOR_MODE } from "../../../config/apps/fileExplorer.config.js";
import { useModals } from "../../../hooks/modals/modals.js";
import { Button } from "../../_utils/button/Button.jsx";
import { FileExplorer } from "../../apps/file-explorer/FileExplorer.jsx";
import { ModalsView } from "../ModalsView.jsx";
import { WindowedModal } from "../_utils/WindowedModal.jsx";
import styles from "./FileSelector.module.css";
import { VirtualFile } from "../../../features/virtual-drive/file/virtualFile.js";
import Modal from "../../../features/modals/modal.js";

/**
 * @callback onFinish
 * @param {VirtualFile|VirtualFile[]} result
 */

/**
 * @param {object} props 
 * @param {Modal} props.modal 
 * @param {*} props.params
 * @param {number} props.type
 * @param {string[]=} props.allowedFormats
 * @param {onFinish} props.onFinish
 */
export function FileSelector({ modal, params, type, allowedFormats, onFinish, ...props }) {
	const multi = (type === SELECTOR_MODE.MULTIPLE);

	const [modalsManager, modals] = useModals();
	const [selection, setSelection] = useState(multi ? [] : null);
	const [directory, setDirectory] = useState(null);

	const finish = (event) => {
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
		<ModalsView modalsManager={modalsManager} modals={modals}/>
		<FileExplorer
			modalsManager={modalsManager}
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
import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { VirtualFile } from "../../../features/virtual-drive/virtual-file.js";
import styles from "./TextEditor.module.css";
import { HeaderMenu } from "../.common/HeaderMenu.jsx";

/**
 * @param {Object} props
 * @param {VirtualFile} props.file
 */
export function TextEditor({ file }) {
	const [currentFile, setCurrentFile] = useState(file);
	const [content, setContent] = useState(file?.content);

	useEffect(() => {
		setContent(currentFile?.content ?? "");
	}, [currentFile]);

	const newText = () => {
		setCurrentFile(null);
	}

	const saveTextAs = () => {

	}

	const saveText = () => {
		if (currentFile == null)
			return saveTextAs();

		currentFile.content = content;
	}

	const onChange = (event) => {
		const value = event.target.value;
		return setContent(value);
	};

	return (
		<div className={styles.Container}>
			<HeaderMenu
				onNew={newText}
				onSave={saveText}
				onSaveAs={saveTextAs}
			/>
			<textarea
				className={styles.View}
				value={content}
				onChange={onChange}
				spellCheck={false}
				autoComplete="off"
				autoFocus
			/>
		</div>
	);
}
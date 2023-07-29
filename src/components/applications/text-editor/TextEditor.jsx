import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { VirtualFile } from "../../../features/virtual-drive/virtual-file.js";
import styles from "./TextEditor.module.css";
import { HeaderMenu } from "../.common/HeaderMenu.jsx";

/**
 * @param {Object} props
 * @param {VirtualFile} props.file
 */
export function TextEditor({ file, setTitle, close }) {
	const [currentFile, setCurrentFile] = useState(file);
	const [content, setContent] = useState(file?.content);
	const [unsavedChanges, setUnsavedChanges] = useState(false);

	useEffect(() => {
		setContent(currentFile?.content ?? "");
	}, [currentFile]);

	useEffect(() => {
		setTitle(`${currentFile?.id ?? "Untitled"}${unsavedChanges ? "*" : ""} - Text Editor`);
	}, [currentFile, setTitle, unsavedChanges]);

	const newText = () => {
		setCurrentFile(null);
	}

	const saveTextAs = () => {
		setUnsavedChanges(false);
	}

	const saveText = () => {
		if (currentFile == null)
			return saveTextAs();

		currentFile.content = content;
		setUnsavedChanges(false);
	}

	const onChange = (event) => {
		const value = event.target.value;

		if (currentFile != null) {
			setUnsavedChanges(currentFile.content !== value);
		} else {
			setUnsavedChanges(value !== "");
		}

		return setContent(value);
	};

	const onKeyDown = (event) => {
		if (event.key === "s" && event.ctrlKey) {
			event.preventDefault();
			saveText();
		}
	};

	return (
		<div className={styles.Container}>
			<HeaderMenu
				onNew={newText}
				onSave={saveText}
				onSaveAs={saveTextAs}
				onExit={() => { close(); }}
			/>
			<textarea
				className={styles.View}
				value={content}
				onChange={onChange}
				onKeyDown={onKeyDown}
				spellCheck={false}
				autoComplete="off"
				autoFocus
			/>
		</div>
	);
}
import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { VirtualFile } from "../../../features/virtual-drive/virtual-file.js";
import styles from "./TextEditor.module.css";
import { HeaderMenu } from "../.common/HeaderMenu.jsx";
import Markdown from "markdown-to-jsx";

/**
 * @param {Object} props
 * @param {VirtualFile} props.file
 */
export function TextEditor({ file, setTitle, close, mode }) {
	const [currentFile, setCurrentFile] = useState(file);
	const [currentMode, setCurrentMode] = useState(mode);
	const [content, setContent] = useState(file?.content ?? "");
	const [unsavedChanges, setUnsavedChanges] = useState(false);

	useEffect(() => {
		(async () => {
			let newContent = "";

			if (currentFile) {
				if (currentFile.content) {
					newContent = currentFile.content;
				} else if (currentFile.source) {
					await fetch(currentFile.source).then((response) =>
						response.text()
					).then((response) => {
						newContent = response;
					});
				}
			}
	
			setContent(newContent);
		})();
	}, [currentFile]);

	useEffect(() => {
		let label = currentFile?.id ?? "Untitled";

		if (unsavedChanges)
			label += "*";

		if (currentMode === "view")
			label += " (preview)";

		setTitle(`${label} - Text Editor`);
	}, [currentFile, setTitle, unsavedChanges, currentMode]);

	const newText = () => {
		setCurrentFile(null);
		setCurrentMode("edit");
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
			{currentMode === "view"
				? <div className={styles.View}>
					<Markdown options={{ overrides: {
						a: {
							props: {
								target: "_blank"
							}
						}
					} }}>
						{content}
					</Markdown>
				</div>
				: <textarea
					className={styles.View}
					value={content}
					onChange={onChange}
					onKeyDown={onKeyDown}
					spellCheck={false}
					autoComplete="off"
					autoFocus
				/>
			}
		</div>
	);
}
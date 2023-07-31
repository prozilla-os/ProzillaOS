import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { VirtualFile } from "../../../features/virtual-drive/virtual-file.js";
import styles from "./TextEditor.module.css";
import { HeaderMenu } from "../.common/HeaderMenu.jsx";
import Markdown from "markdown-to-jsx";

const defaultZoom = 16;
const zoomSpeed = 4;

/**
 * @param {Object} props
 * @param {VirtualFile} props.file
 */
export function TextEditor({ file, setTitle, close, mode }) {
	const [currentFile, setCurrentFile] = useState(file);
	const [currentMode, setCurrentMode] = useState(mode);
	const [content, setContent] = useState(file?.content ?? "");
	const [unsavedChanges, setUnsavedChanges] = useState(file == null);
	const [zoom, setZoom] = useState(defaultZoom);

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
		setUnsavedChanges(true);
	};

	const saveTextAs = () => {
		onChange({ target: { value: content } });
	};

	const saveText = () => {
		if (currentFile == null)
			return saveTextAs();

		currentFile.content = content;
		onChange({ target: { value: content } });
	};

	const onChange = (event) => {
		const value = event.target.value;

		if (currentFile != null) {
			setUnsavedChanges(currentFile.content !== value);
		} else {
			setUnsavedChanges(true);
		}

		return setContent(value);
	};

	return (
		<div className={styles.Container} style={{ fontSize: zoom }}>
			<HeaderMenu
				options={{
					"File": {
						"New": newText,
						"Save": saveText,
						// "Save As": saveTextAs,
						"Exit": () => {
							close();
						},
					},
					"View": {
						[currentMode === "view" ? "Edit mode" : "Preview mode"]: () => {
							setCurrentMode(currentMode === "view" ? "edit" : "view");
						},
						"Zoom In": () => {
							setZoom(zoom + zoomSpeed);
						},
						"Zoom Out": () => {
							setZoom(zoom - zoomSpeed);
						},
						"Reset Zoom": () => {
							setZoom(defaultZoom);
						}
					}
				}}
				shortcuts={{
					"File": {
						"New": ["Control", "e"],
						"Save": ["Control", "s"],
						"Exit": ["Control", "x"],
					},
					"View": {
						"Zoom In": ["Control", "+"],
						"Zoom Out": ["Control", "-"],
						"Reset Zoom": ["Control", "0"],
					}
				}}
			/>
			{currentMode === "view"
				? <div className={styles.View}>
					{file.extension === "md"
						? <Markdown options={{ overrides: {
							a: {
								props: {
									target: "_blank"
								}
							}
						} }}>
							{content}
						</Markdown>
						: <p>{content}</p>
					}
				</div>
				: <textarea
					className={styles.View}
					value={content}
					onChange={onChange}
					spellCheck={false}
					autoComplete="off"
					autoFocus
				/>
			}
		</div>
	);
}
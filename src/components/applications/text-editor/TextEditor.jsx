import React, { useEffect, useState } from "react";
import { VirtualFile } from "../../../features/virtual-drive/virtualFile.js";
import styles from "./TextEditor.module.css";
import { HeaderMenu } from "../.common/HeaderMenu.jsx";
import Markdown from "markdown-to-jsx";
import Application from "../../../features/applications/application.js";
import { DEFAULT_ZOOM, ZOOM_FACTOR } from "../../../constants/applications/textEditor.js";
import AppsManager from "../../../features/applications/applications.js";

/**
 * @param {object} props
 * @param {VirtualFile} props.file
 * @param {Function} props.setTitle
 * @param {Function} props.close
 * @param {string} props.mode
 * @param {Application} props.app
 * @param {Function} props.setIconUrl
 */
export function TextEditor({ file, setTitle, setIconUrl, close, mode, app }) {
	const [currentFile, setCurrentFile] = useState(file);
	const [currentMode, setCurrentMode] = useState(mode);
	const [content, setContent] = useState(file?.content ?? "");
	const [unsavedChanges, setUnsavedChanges] = useState(file == null);
	const [zoom, setZoom] = useState(DEFAULT_ZOOM);

	useEffect(() => {
		(async () => {
			let newContent = "";

			// Load file
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

				const iconUrl = currentFile.getIconUrl();
				console.log(iconUrl);
				if (iconUrl)
					setIconUrl(iconUrl);
			} else {
				setIconUrl(AppsManager.getAppIconUrl(app.id));
			}
	
			setContent(newContent);
		})();
	}, [app.id, currentFile, setIconUrl]);

	useEffect(() => {
		// Update title
		let label = currentFile?.id ?? "Untitled";

		if (unsavedChanges)
			label += "*";

		if (currentMode === "view")
			label += " (preview)";

		setTitle(`${label} - ${app.name}`);
	}, [currentFile, setTitle, unsavedChanges, currentMode, app.name]);

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

		currentFile.setContent(content);
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
						"Quit": () => {
							close();
						},
					},
					"View": {
						[currentMode === "view" ? "Edit mode" : "Preview mode"]: () => {
							setCurrentMode(currentMode === "view" ? "edit" : "view");
						},
						"Zoom In": () => {
							setZoom(zoom + ZOOM_FACTOR);
						},
						"Zoom Out": () => {
							setZoom(zoom - ZOOM_FACTOR);
						},
						"Reset Zoom": () => {
							setZoom(DEFAULT_ZOOM);
						}
					}
				}}
				shortcuts={{
					"File": {
						"New": ["Control", "e"],
						"Save": ["Control", "s"],
						"Quit": ["Control", "q"],
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
					{file?.extension === "md"
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
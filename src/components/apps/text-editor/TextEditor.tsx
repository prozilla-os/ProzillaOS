import { useEffect, useRef, useState } from "react";
import styles from "./TextEditor.module.css";
import { HeaderMenu } from "../_utils/header-menu/HeaderMenu";
import Markdown from "markdown-to-jsx";
import { CODE_FORMATS, DEFAULT_ZOOM, EXTENSION_TO_LANGUAGE, ZOOM_FACTOR } from "../../../config/apps/textEditor.config";
import AppsManager from "../../../features/apps/appsManager";
import { TITLE_SEPARATOR } from "../../../config/windows.config";
import { MarkdownLink } from "./overrides/MarkdownLink";
import { MarkdownImage } from "./overrides/MarkdownImage";
import { useWindowsManager } from "../../../hooks/windows/windowsManagerContext";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useWindowedModal } from "../../../hooks/modals/windowedModal";
import { DEFAULT_FILE_SELECTOR_SIZE } from "../../../config/modals.config";
import { FileSelector } from "../../modals/file-selector/FileSelector";
import { SELECTOR_MODE } from "../../../config/apps/fileExplorer.config";
import { VirtualFile } from "../../../features/virtual-drive/file/virtualFile";
import { WindowProps } from "../../windows/WindowView";

const OVERRIDES = {
	a: MarkdownLink,
	img: MarkdownImage,
};

interface TextEditorProps extends WindowProps {
	file?: VirtualFile;
}

export function TextEditor({ file, setTitle, setIconUrl, close, mode, app, modalsManager }: TextEditorProps) {
	const ref = useRef();
	const windowsManager = useWindowsManager();
	const [currentFile, setCurrentFile] = useState(file);
	const [currentMode, setCurrentMode] = useState(mode);
	const [content, setContent] = useState(file?.content ?? "");
	const [unsavedChanges, setUnsavedChanges] = useState(file == null);
	const [zoom, setZoom] = useState(DEFAULT_ZOOM);
	const { openWindowedModal } = useWindowedModal();

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
				if (iconUrl)
					setIconUrl(iconUrl);
			} else {
				setIconUrl(AppsManager.getAppIconUrl(app.id));
			}
	
			setContent(newContent);

			if (ref.current) {
				(ref.current as HTMLElement).scrollTo(0, 0);
			}
		})();
	}, [app.id, currentFile, setIconUrl]);

	useEffect(() => {
		// Update title
		let label = currentFile?.id ?? "Untitled";

		if (unsavedChanges)
			label += "*";

		if (currentMode === "view")
			label += " (preview)";

		setTitle(`${label} ${TITLE_SEPARATOR} ${app.name}`);
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

	const overrides = {};
	for (const [key, value] of Object.entries(OVERRIDES)) {
		overrides[key] = {
			component: value,
			props: {
				modalsManager,
				setCurrentFile,
				currentFile,
				app,
				windowsManager
			}
		};
	}

	return (
		<div className={styles.Container} style={{ fontSize: zoom }}>
			<HeaderMenu
				options={{
					"File": {
						"New": newText,
						"Open": () => {
							openWindowedModal({
								size: DEFAULT_FILE_SELECTOR_SIZE,
								Modal: (props) => <FileSelector
									type={SELECTOR_MODE.SINGLE}
									onFinish={(file: VirtualFile) => {
										setCurrentFile(file);
										setUnsavedChanges(false);
									}}
									{...props}
								/>
							});
						},
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
						"Open": ["Control", "o"],
						"Save": ["Control", "s"],
						"Quit": ["Control", "q"],
					},
					"View": {
						"Zoom In": ["Control", "+"],
						"Zoom Out": ["Control", "-"],
						"Reset Zoom": ["Control", "0"],
						"Edit mode": ["Control v"],
						"Preview mode": ["Control v"],
					}
				}}
			/>
			{currentMode === "view"
				? CODE_FORMATS.includes(currentFile?.extension)
					? <SyntaxHighlighter
						language={EXTENSION_TO_LANGUAGE[currentFile?.extension] ?? currentFile?.extension}
						className={styles.Code}
						useInlineStyles={false}
						showLineNumbers={true}
					>{content}</SyntaxHighlighter>
					: <div ref={ref} className={styles.View}>
						{currentFile?.extension === "md"
							? <Markdown options={{ overrides }}>{content}</Markdown>
							: <pre><p>{content}</p></pre>
						}
					</div>
				: <textarea
					ref={ref}
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
import { ReactNode, useEffect, useRef, useState } from "react";
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
import { VirtualFile } from "../../../features/virtual-drive/file";
import { WindowProps } from "../../windows/WindowView";
import { DropdownAction } from "../../actions/actions/DropdownAction";
import { ClickAction } from "../../actions/actions/ClickAction";
import ModalsManager from "../../../features/modals/modalsManager";
import App from "../../../features/apps/app";
import WindowsManager from "../../../features/windows/windowsManager";
import { MarkdownBlockquote } from "./overrides/MarkdownBlockquote";
import { useVirtualRoot } from "../../../hooks/virtual-drive/virtualRootContext";

const OVERRIDES = {
	a: MarkdownLink,
	img: MarkdownImage,
	blockquote: MarkdownBlockquote,
};

export interface MarkdownProps {
	modalsManager: ModalsManager;
	setCurrentFile: Function;
	currentFile: VirtualFile;
	app: App;
	windowsManager: WindowsManager;
	children?: ReactNode;
}

interface TextEditorProps extends WindowProps {
	file?: VirtualFile;
	mode?: "view" | "edit";
	path?: string;
}

export function TextEditor({ file, path, setTitle, setIconUrl, close, mode, app, modalsManager }: TextEditorProps) {
	const ref = useRef();
	const windowsManager = useWindowsManager();
	const virtualRoot = useVirtualRoot();
	const [currentFile, setCurrentFile] = useState(file);
	const [currentMode, setCurrentMode] = useState<TextEditorProps["mode"]>(mode);
	const [content, setContent] = useState(file?.content ?? "");
	const [unsavedChanges, setUnsavedChanges] = useState(file == null);
	const [zoom, setZoom] = useState(DEFAULT_ZOOM);
	const { openWindowedModal } = useWindowedModal();

	useEffect(() => {
		void (async () => {
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

				if (newContent?.trim() === "")
					setCurrentMode("edit");
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

	useEffect(() => {
		if (currentFile == null && path != null) {
			const newFile = virtualRoot.navigate(path);

			if (newFile == null || !newFile.isFile())
				return;

			setCurrentFile(newFile as VirtualFile);
			path = null;
		}
	}, [path, currentFile]);

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

	const onChange = (event: Event | { target: { value: string } }) => {
		const value = (event.target as HTMLInputElement).value;

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
			} as MarkdownProps
		};
	}

	return (
		<div className={styles.TextEditor} style={{ fontSize: zoom }}>
			<HeaderMenu>
				<DropdownAction label="File" showOnHover={false}>
					<ClickAction label="New" onTrigger={() => { newText(); }} shortcut={["Control", "e"]}/>
					<ClickAction label="Open" onTrigger={() => {
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
					}} shortcut={["Control", "o"]}/>
					<ClickAction label="Save" onTrigger={() => { saveText(); }} shortcut={["Control", "s"]}/>
					<ClickAction label="Quit" onTrigger={() => { close(); }} shortcut={["Control", "q"]}/>
				</DropdownAction>
				<DropdownAction label="View" showOnHover={false}>
					<ClickAction label={currentMode === "view" ? "Edit mode" : "Preview mode"} onTrigger={() => {
						setCurrentMode(currentMode === "view" ? "edit" : "view");
					}} shortcut={["Control", "v"]}/>
					<ClickAction label="Zoom in" onTrigger={() => { setZoom(zoom + ZOOM_FACTOR); }} shortcut={["Control", "+"]}/>
					<ClickAction label="Zoom out" onTrigger={() => { setZoom(zoom - ZOOM_FACTOR); }} shortcut={["Control", "-"]}/>
					<ClickAction label="Reset Zoom" onTrigger={() => { setZoom(DEFAULT_ZOOM); }} shortcut={["Control", "0"]}/>
				</DropdownAction>
			</HeaderMenu>
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
import { useEffect, useRef, useState } from "react";
import { VirtualFile } from "../../../../features/virtual-drive/file/virtualFile.js";
import { VirtualFolder } from "../../../../features/virtual-drive/folder/virtualFolder.js";
import { Interactable } from "../../../_utils/interactable/Interactable.jsx";
import styles from "./DirectoryList.module.css";
import { ImagePreview } from "./ImagePreview.jsx";

/**
 * @callback fileEvent
 * @param {object} event
 * @param {VirtualFile} file
 */

/**
 * @callback folderEvent
 * @param {object} event
 * @param {VirtualFolder} folder
 */

/**
 * @param {object} props 
 * @param {VirtualFolder} props.directory
 * @param {boolean} props.showHidden
 * @param {string} props.folderClassName
 * @param {string} props.fileClassName
 * @param {string} props.className
 * @param {fileEvent} props.onContextMenuFile
 * @param {folderEvent} props.onContextMenuFolder
 * @param {fileEvent} props.onClickFile
 * @param {folderEvent} props.onClickFolder
 */
export function DirectoryList({ directory, showHidden = false, folderClassName, fileClassName, className,
	onContextMenuFile, onContextMenuFolder, onClickFile, onClickFolder, ...props }) {
	const [selectedFolders, setSelectedFolders] = useState([]);
	const [selectedFiles, setSelectedFiles] = useState([]);

	const ref = useRef(null);
	const [rectSelectStart, setRectSelectStart] = useState(null);
	const [rectSelectEnd, setRectSelectEnd] = useState(null);
	
	useEffect(() => {
		clearSelection();
	}, [directory]);

	useEffect(() => {
		const onMoveRectSelect = (event) => {
			if (rectSelectStart == null)
				return;
	
			event.preventDefault();
			setRectSelectEnd({ x: event.clientX, y: event.clientY });
		};
		const onStopRectSelect = (event) => {
			if (rectSelectStart == null || rectSelectEnd == null) {
				setRectSelectStart(null);
				setRectSelectEnd(null);
				return;
			}
	
			event.preventDefault();
			setRectSelectStart(null);
			setRectSelectEnd(null);
		};

		document.addEventListener("mousemove", onMoveRectSelect);
		document.addEventListener("mouseup", onStopRectSelect);

		return () => {
			document.removeEventListener("mousemove", onMoveRectSelect);
			document.removeEventListener("mouseup", onStopRectSelect);
		};
	});

	if (!directory)
		return;

	const clearSelection = () => {
		setSelectedFolders([]);
		setSelectedFiles([]);
	};
	const selectFolder = (folder, exclusive = false) => {
		setSelectedFolders(exclusive ? [folder.id] : [...selectedFolders, folder.id]);
		if (exclusive)
			setSelectedFiles([]);
	};
	const selectFile = (file, exclusive = false) => {
		setSelectedFiles(exclusive ? [file.id] : [...selectedFiles, file.id]);
		if (exclusive)
			setSelectedFolders([]);
	};

	const onStartRectSelect = (event) => {
		setRectSelectStart({ x: event.clientX, y: event.clientY });
	};
	const getRectSelectStyle = () => {
		let x, y, width, height = null;
		const containerRect = ref.current?.getBoundingClientRect();

		if (rectSelectStart.x < rectSelectEnd.x) {
			x = rectSelectStart.x;
			width = rectSelectEnd.x - rectSelectStart.x;
		} else {
			x = rectSelectEnd.x;
			width = rectSelectStart.x - rectSelectEnd.x;
		}
		if (rectSelectStart.y < rectSelectEnd.y) {
			y = rectSelectStart.y;
			height = rectSelectEnd.y - rectSelectStart.y;
		} else {
			y = rectSelectEnd.y;
			height = rectSelectStart.y - rectSelectEnd.y;
		}

		if (containerRect) {
			x -= containerRect.x;
			y -= containerRect.y;
		}
		

		return { top: y, left: x, width, height };
	};

	const classNames = [styles.Container];
	const folderClassNames = [styles["Folder-button"]];
	const fileClassNames = [styles["File-button"]];

	if (className)
		classNames.push(className);
	if (folderClassName)
		folderClassNames.push(folderClassName);
	if (fileClassName)
		fileClassNames.push(fileClassName);

	return <div
		ref={ref}
		className={classNames.join(" ")}
		onClick={clearSelection}
		onMouseDown={onStartRectSelect}
		{...props}
	>
		{rectSelectStart != null && rectSelectEnd != null
			? <div className={styles["Selection-rect"]} style={getRectSelectStyle()}/>
			: null
		}
		{directory?.getSubFolders(showHidden)?.map((folder) => 
			<Interactable
				key={folder.id}
				tabIndex={0}
				className={folderClassNames.join(" ")}
				data-selected={selectedFolders.includes(folder.id)}
				onContextMenu={(event) => {
					onContextMenuFolder?.(event, folder);
				}}
				onClick={(event) => {
					selectFolder(folder, !event.ctrlKey);
				}}
				onDoubleClick={(event) => {
					onClickFolder?.(event, folder);
				}}
			>
				<div className={styles["Folder-icon"]}>
					<ImagePreview source={folder.getIconUrl()} onError={() => { folder.setIconUrl(null); }}/>
				</div>
				<p>{folder.name}</p>
			</Interactable>
		)}
		{directory?.getFiles(showHidden)?.map((file) => 
			<Interactable
				key={file.id}
				tabIndex={0}
				className={fileClassNames.join(" ")}
				data-selected={selectedFiles.includes(file.id)}
				onContextMenu={(event) => {
					onContextMenuFile?.(event, file);
				}}
				onClick={(event) => {
					selectFile(file, !event.ctrlKey);
				}}
				onDoubleClick={(event) => {
					onClickFile?.(event, file);
				}}
			>
				<div className={styles["File-icon"]}>
					<ImagePreview source={file.getIconUrl()} onError={() => { file.setIconUrl(null); }}/>
				</div>
				<p>{file.id}</p>
			</Interactable>
		)}
	</div>;
}
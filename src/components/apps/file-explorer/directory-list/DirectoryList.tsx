import { ReactElement, useEffect, useRef, useState } from "react";
import { VirtualFile } from "../../../../features/virtual-drive/file/virtualFile";
import { VirtualFolder } from "../../../../features/virtual-drive/folder/virtualFolder";
import { Interactable } from "../../../_utils/interactable/Interactable";
import styles from "./DirectoryList.module.css";
import { ImagePreview } from "./ImagePreview";

export interface OnSelectionChangeParams {
	files?: string[];
	folders?: string[];
	directory?: VirtualFolder;
};

type FileEventHandler = (event: object, file: VirtualFile) => void;
type FolderEventHandler = (event: object, folder: VirtualFolder) => void;

interface DirectoryListProps {
	directory: VirtualFolder;
	showHidden?: boolean;
	folderClassName?: string;
	fileClassName?: string;
	className?: string;
	onContextMenuFile?: FileEventHandler;
	onContextMenuFolder?: FolderEventHandler;
	onOpenFile?: FileEventHandler;
	onOpenFolder?: FolderEventHandler;
	allowMultiSelect?: boolean;
	onSelectionChange?: (params: OnSelectionChangeParams) => void;
	[key: string]: any;
}

export function DirectoryList({ directory, showHidden = false, folderClassName, fileClassName, className,
	onContextMenuFile, onContextMenuFolder, onOpenFile, onOpenFolder, allowMultiSelect = true, onSelectionChange, ...props }: DirectoryListProps): ReactElement {
	const [selectedFolders, setSelectedFolders] = useState([]);
	const [selectedFiles, setSelectedFiles] = useState([]);

	const ref = useRef(null);
	const [rectSelectStart, setRectSelectStart] = useState(null);
	const [rectSelectEnd, setRectSelectEnd] = useState(null);

	useEffect(() => {
		onSelectionChange?.({ files: selectedFiles, folders: selectedFolders, directory });
	}, [directory, onSelectionChange, selectedFiles, selectedFolders]);
	
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
		if (!allowMultiSelect)
			exclusive = true;
		setSelectedFolders(exclusive ? [folder.id] : [...selectedFolders, folder.id]);
		if (exclusive)
			setSelectedFiles([]);
	};
	const selectFile = (file, exclusive = false) => {
		if (!allowMultiSelect)
			exclusive = true;
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
					onOpenFolder?.(event, folder);
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
					onOpenFile?.(event, file);
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
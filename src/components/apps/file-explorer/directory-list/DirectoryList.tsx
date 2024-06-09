import { MouseEventHandler, ReactElement, useEffect, useRef, useState } from "react";
import { VirtualFile } from "../../../../features/virtual-drive/file";
import { VirtualFolder } from "../../../../features/virtual-drive/folder/virtualFolder";
import { Interactable } from "../../../_utils/interactable/Interactable";
import styles from "./DirectoryList.module.css";
import { ImagePreview } from "./ImagePreview";
import Vector2 from "../../../../features/math/vector2";

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
	[key: string]: unknown;
}

export function DirectoryList({ directory, showHidden = false, folderClassName, fileClassName, className,
	onContextMenuFile, onContextMenuFolder, onOpenFile, onOpenFolder, allowMultiSelect = true, onSelectionChange, ...props }: DirectoryListProps): ReactElement {
	const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
	const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

	const ref = useRef(null);
	const [rectSelectStart, setRectSelectStart] = useState<Vector2>(null);
	const [rectSelectEnd, setRectSelectEnd] = useState<Vector2>(null);

	useEffect(() => {
		onSelectionChange?.({ files: selectedFiles, folders: selectedFolders, directory });
	}, [directory, onSelectionChange, selectedFiles, selectedFolders]);
	
	useEffect(() => {
		clearSelection();
	}, [directory]);

	useEffect(() => {
		const onMoveRectSelect = (event: MouseEvent) => {
			if (rectSelectStart == null)
				return;
	
			event.preventDefault();
			setRectSelectEnd({ x: event.clientX, y: event.clientY } as Vector2);
		};
		const onStopRectSelect = (event: MouseEvent) => {
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
	const selectFolder = (folder: VirtualFolder, exclusive = false) => {
		if (!allowMultiSelect)
			exclusive = true;
		setSelectedFolders(exclusive ? [folder.id] : [...selectedFolders, folder.id]);
		if (exclusive)
			setSelectedFiles([]);
	};
	const selectFile = (file: VirtualFile, exclusive = false) => {
		if (!allowMultiSelect)
			exclusive = true;
		setSelectedFiles(exclusive ? [file.id] : [...selectedFiles, file.id]);
		if (exclusive)
			setSelectedFolders([]);
	};

	const onStartRectSelect = (event: MouseEvent) => {
		setRectSelectStart({ x: event.clientX, y: event.clientY } as Vector2);
	};
	const getRectSelectStyle = () => {
		let x: number, y: number, width: number, height: number = null;
		const containerRect = (ref.current as HTMLElement)?.getBoundingClientRect();

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

	const classNames = [styles.DirectoryList];
	const folderClassNames = [styles.FolderButton];
	const fileClassNames = [styles.FileButton];

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
		onMouseDown={onStartRectSelect as unknown as MouseEventHandler}
		{...props}
	>
		{rectSelectStart != null && rectSelectEnd != null
			? <div className={styles.SelectionRect} style={getRectSelectStyle()}/>
			: null
		}
		{directory?.getSubFolders(showHidden)?.map((folder) => 
			<Interactable
				key={folder.id}
				tabIndex={0}
				className={folderClassNames.join(" ")}
				data-selected={selectedFolders.includes(folder.id)}
				onContextMenu={(event: MouseEvent) => {
					onContextMenuFolder?.(event, folder);
				}}
				onClick={(event: MouseEvent) => {
					selectFolder(folder, !event.ctrlKey);
				}}
				onDoubleClick={(event: MouseEvent) => {
					onOpenFolder?.(event, folder);
				}}
			>
				<div className={styles.FolderIcon}>
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
				onContextMenu={(event: MouseEvent) => {
					onContextMenuFile?.(event, file);
				}}
				onClick={(event: MouseEvent) => {
					selectFile(file, !event.ctrlKey);
				}}
				onDoubleClick={(event: MouseEvent) => {
					onOpenFile?.(event, file);
				}}
			>
				<div className={styles.FileIcon}>
					<ImagePreview source={file.getIconUrl()} onError={() => { file.setIconUrl(null); }}/>
				</div>
				<p>{file.id}</p>
			</Interactable>
		)}
	</div>;
}
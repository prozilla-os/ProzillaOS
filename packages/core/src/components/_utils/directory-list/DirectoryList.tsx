import { MouseEventHandler, ReactElement, useEffect, useRef, useState } from "react";
import styles from "./DirectoryList.module.css";
import { ImagePreview } from "./ImagePreview";
import { VirtualFile } from "../../../features/virtual-drive/file";
import { VirtualFolder } from "../../../features/virtual-drive/folder";
import { Vector2 } from "../../../features";
import { Interactable } from "../interactable/Interactable";
import { useClassNames } from "../../../hooks/_utils/classNames";
import { removeFromArray } from "@prozilla-os/shared";
import { VirtualBase } from "../../../features/virtual-drive/virtualBase";

export interface OnSelectionChangeParams {
	files?: string[];
	folders?: string[];
	directory?: VirtualFolder;
};

export type FileEventHandler = (event: Event, file: VirtualFile) => void;
export type FolderEventHandler = (event: Event, folder: VirtualFolder) => void;

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
	onContextMenuFile, onContextMenuFolder, onOpenFile, onOpenFolder, allowMultiSelect = true, onSelectionChange, ...props }: DirectoryListProps): ReactElement | null {
	const [folders, setFolders] = useState<VirtualFolder[]>([]);
	const [files, setFiles] = useState<VirtualFile[]>([]);
	const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
	const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

	const ref = useRef(null);
	const [rectSelectStart, setRectSelectStart] = useState<Vector2 | null>(null);
	const [rectSelectEnd, setRectSelectEnd] = useState<Vector2 | null>(null);

	useEffect(() => {
		onSelectionChange?.({ files: selectedFiles, folders: selectedFolders, directory });
	}, [directory, onSelectionChange, selectedFiles, selectedFolders]);

	const clearSelection = () => {
		setSelectedFolders([]);
		setSelectedFiles([]);
	};
	
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
	}, []);

	useEffect(() => {
		const onUpdate = () => {
			console.log("Updated");

			setFolders([...directory.getSubFolders(showHidden)]);
			setFiles([...directory.getFiles(showHidden)]);

			setSelectedFolders((folders) => folders.filter((folder) => directory.hasFolder(folder)));
			setSelectedFiles((files) => files.filter((file) => {
				const { name, extension } = VirtualFile.splitId(file);
				return directory.hasFile(name, extension as string | undefined);
			}));
		};

		onUpdate();
		directory.on(VirtualBase.EVENT_NAMES.update, onUpdate);

		return () => {
			directory.off(VirtualBase.EVENT_NAMES.update, onUpdate);
		};
	}, [directory, showHidden]);

	if (!directory)
		return null;

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

	const deselectFolder = (folder: VirtualFolder) => {
		const newFolders = [...selectedFolders];
		removeFromArray(folder.id, newFolders);
		setSelectedFolders(newFolders);
	};

	const deselectFile = (file: VirtualFile) => {
		const newFiles = [...selectedFiles];
		removeFromArray(file.id, newFiles);
		setSelectedFiles(newFiles);
	};

	const onStartRectSelect = (event: MouseEvent) => {
		setRectSelectStart({ x: event.clientX, y: event.clientY } as Vector2);
	};

	const getRectSelectStyle = () => {
		let x: number, y: number, width: number, height: number = 0;

		if (ref.current == null || rectSelectStart == null || rectSelectEnd == null)
			return { top: 0, left: 0, width: 0, height: 0 };

		const containerRect = (ref.current as HTMLElement).getBoundingClientRect();

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

	folderClassName = useClassNames(folderClassNames, "DirectoryList", "Folder");
	fileClassName = useClassNames(fileClassNames, "DirectoryList", "File");

	return <div
		ref={ref}
		className={useClassNames(classNames, "DirectoryList")}
		onClick={clearSelection}
		onMouseDown={onStartRectSelect as unknown as MouseEventHandler}
		{...props}
	>
		{rectSelectStart != null && rectSelectEnd != null
			? <div className={styles.SelectionRect} style={getRectSelectStyle()}/>
			: null
		}
		{folders.map((folder) => 
			<Interactable
				key={folder.id}
				tabIndex={0}
				className={folderClassName}
				data-selected={selectedFolders.includes(folder.id)}
				onContextMenu={(event: MouseEvent) => {
					onContextMenuFolder?.(event, folder);
				}}
				onClick={(event: MouseEvent) => {
					selectFolder(folder, !event.ctrlKey);
				}}
				onDoubleClick={(event: MouseEvent) => {
					onOpenFolder?.(event, folder);
					deselectFolder(folder);
				}}
			>
				<div className={styles.FolderIcon}>
					<ImagePreview source={folder.getIconUrl()} onError={() => { folder.setIconUrl(null); }}/>
				</div>
				<p>{folder.name}</p>
			</Interactable>
		)}
		{files.map((file) => 
			<Interactable
				key={file.id}
				tabIndex={0}
				className={fileClassName}
				data-selected={selectedFiles.includes(file.id)}
				onContextMenu={(event: MouseEvent) => {
					onContextMenuFile?.(event, file);
				}}
				onClick={(event: MouseEvent) => {
					selectFile(file, !event.ctrlKey);
				}}
				onDoubleClick={(event: MouseEvent) => {
					onOpenFile?.(event, file);
					deselectFile(file);
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
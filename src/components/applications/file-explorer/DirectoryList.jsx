import { VirtualFile } from "../../../features/virtual-drive/virtualFile.js";
import { VirtualFolder } from "../../../features/virtual-drive/virtualFolder.js";
import { FilePreview } from "./FilePreview.jsx";
import { FolderPreview } from "./FolderPreview.jsx";
import styles from "./DirectoryList.module.css";

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
 * @param {string} props.folderClassname
 * @param {string} props.fileClassname
 * @param {fileEvent} props.onContextMenuFile
 * @param {folderEvent} props.onContextMenuFolder
 * @param {fileEvent} props.onClickFile
 * @param {folderEvent} props.onClickFolder
 */
export function DirectoryList({ directory, showHidden = false, folderClassname, fileClassname,
	onContextMenuFile, onContextMenuFolder, onClickFile, onClickFolder }) {
	if (!directory)
		return null;

	// const folders = directory.getSubFolders(showHidden);
	// const files = directory.getFiles(showHidden);

	return <>
		{directory?.getSubFolders(showHidden)?.map((folder) => 
			<button
				key={folder.id}
				tabIndex={0}
				className={`${styles["Folder-button"]} ${folderClassname}`}
				onContextMenu={(event) => {
					onContextMenuFolder(event, folder);
				}}
				onClick={(event) => {
					onClickFolder(event, folder);
				}}
			>
				<FolderPreview folder={folder}/>
				<p>{folder.name}</p>
			</button>
		)}
		{directory?.getFiles(showHidden)?.map((file) => 
			<button
				key={file.id}
				tabIndex={0}
				className={`${styles["File-button"]} ${fileClassname}`}
				onContextMenu={(event) => {
					onContextMenuFile(event, file);
				}}
				onClick={(event) => {
					onClickFile(event, file);
				}}
			>
				<FilePreview file={file}/>
				<p>{file.id}</p>
			</button>
		)}
	</>;
}
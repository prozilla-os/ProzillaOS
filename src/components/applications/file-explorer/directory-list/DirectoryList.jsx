import { VirtualFile } from "../../../../features/virtual-drive/virtualFile.js";
import { VirtualFolder } from "../../../../features/virtual-drive/virtualFolder.js";
import { FileIcon } from "./FileIcon.jsx";
import { FolderIcon } from "./FolderIcon.jsx";
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

	const folderClassNames = [styles["Folder-button"]];
	const fileClassNames = [styles["File-button"]];

	if (folderClassname)
		folderClassNames.push(folderClassname);
	if (fileClassname)
		fileClassNames.push(fileClassname);

	return <>
		{directory?.getSubFolders(showHidden)?.map((folder) => 
			<button
				key={folder.id}
				tabIndex={0}
				className={folderClassNames.join(" ")}
				onContextMenu={(event) => {
					onContextMenuFolder?.(event, folder);
				}}
				onClick={(event) => {
					onClickFolder?.(event, folder);
				}}
			>
				<FolderIcon folder={folder} iconUrl={folder.getIconUrl()}/>
				<p>{folder.name}</p>
			</button>
		)}
		{directory?.getFiles(showHidden)?.map((file) => 
			<button
				key={file.id}
				tabIndex={0}
				className={fileClassNames.join(" ")}
				onContextMenu={(event) => {
					onContextMenuFile?.(event, file);
				}}
				onClick={(event) => {
					onClickFile?.(event, file);
				}}
			>
				<FileIcon file={file} iconUrl={file.getIconUrl()}/>
				<p>{file.id}</p>
			</button>
		)}
	</>;
}
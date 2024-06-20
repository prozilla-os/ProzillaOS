import { OptionalInterface } from "../../../types/utils";

export interface VirtualDriveConfigOptions {
	fileIcon: string;
	infoFileIcon: string;
	textFileIcon: string;
	codeFileIcon: string;

	folderIcon: string;
	imagesFolderIcon: string;
	textFolderIcon: string;
	folderLinkIcon: string;
}

export class VirtualDriveConfig {
	fileIcon: VirtualDriveConfigOptions["fileIcon"];
	infoFileIcon: VirtualDriveConfigOptions["infoFileIcon"];
	textFileIcon: VirtualDriveConfigOptions["textFileIcon"];
	codeFileIcon: VirtualDriveConfigOptions["codeFileIcon"];

	folderIcon: VirtualDriveConfigOptions["folderIcon"];
	imagesFolderIcon: VirtualDriveConfigOptions["imagesFolderIcon"];
	textFolderIcon: VirtualDriveConfigOptions["textFolderIcon"];
	folderLinkIcon: VirtualDriveConfigOptions["folderLinkIcon"];

	constructor(options: OptionalInterface<VirtualDriveConfigOptions> = {}) {
		const { fileIcon, infoFileIcon, textFileIcon, codeFileIcon, folderIcon, imagesFolderIcon, textFolderIcon, folderLinkIcon } = options as VirtualDriveConfigOptions;
		
		this.fileIcon = fileIcon ?? "https://os.prozilla.dev/assets/apps/file-explorer/icons/file.svg";
		this.infoFileIcon = infoFileIcon ?? "https://os.prozilla.dev/assets/apps/file-explorer/icons/file-info.svg";
		this.textFileIcon = textFileIcon ?? "https://os.prozilla.dev/assets/apps/file-explorer/icons/file-text.svg";
		this.codeFileIcon = codeFileIcon ?? "https://os.prozilla.dev/assets/apps/file-explorer/icons/file-code.svg";

		this.folderIcon = folderIcon ?? "https://os.prozilla.dev/assets/apps/file-explorer/icons/folder.svg";
		this.imagesFolderIcon = imagesFolderIcon ?? "https://os.prozilla.dev/assets/apps/file-explorer/icons/folder-images.svg";
		this.textFolderIcon = textFolderIcon ?? "https://os.prozilla.dev/assets/apps/file-explorer/icons/folder-text.svg";
		this.folderLinkIcon = folderLinkIcon ?? "https://os.prozilla.dev/assets/apps/file-explorer/icons/folder-link.svg";
	}
}
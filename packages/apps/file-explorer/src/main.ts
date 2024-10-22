import { App, AppsConfig } from "@prozilla-os/core";
import { FileExplorer, FileExplorerProps } from "./components/FileExplorer";

const fileExplorer = new App<FileExplorerProps>("File Explorer", "file-explorer", FileExplorer)
	.setIconUrl("https://os.prozilla.dev/assets/apps/icons/file-explorer.svg")
	.setRole(AppsConfig.APP_ROLES.fileExplorer)
	.setCategory("Utilities & tools");

export { fileExplorer };
export { FileSelectorMode } from "./types/utils";
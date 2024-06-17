import { App } from "@prozilla-os/core";
import { FileExplorer } from "./components/FileExplorer";
import { VirtualBase } from "@prozilla-os/core/src/features/virtual-drive/virtualBase";

const fileExplorer = new App("File Explorer", "file-explorer", FileExplorer)
	.setIconUrl("https://os.prozilla.dev/assets/apps/icons/file-explorer.svg");

export { fileExplorer };
export { FileSelectorMode } from "./types/index.d";
VirtualBase;
import { App } from "@prozilla-os/core";
import { FileExplorer } from "./components/FileExplorer";

const fileExplorer = new App("File Explorer", "file-explorer", FileExplorer)
	.setIconUrl("https://os.prozilla.dev/assets/apps/icons/file-explorer.svg");

export { fileExplorer };
export { FileSelectorMode } from "./types/index.d";
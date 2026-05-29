import { App, AppsConfig } from "@prozilla-os/core";
import { FileExplorer, type FileExplorerProps } from "./components/FileExplorer";
import { Skin, MacOsSkin, Windows95Skin, MinimalSkin, PixelSkin } from "@prozilla-os/skins";

const fileExplorer = new App<FileExplorerProps>("File Explorer", "file-explorer", FileExplorer)
	.setIconUrl("https://os.prozilla.dev/assets/apps/icons/file-explorer.svg")
	.setRole(AppsConfig.APP_ROLES.fileExplorer)
	.setCategory("Utilities & tools")
	.setSkinOverride(MacOsSkin, { 
		name: "Finder", 
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/mac/apps/icons/file-explorer.svg`,
	})
	.setSkinOverride(Windows95Skin, { 
		name: "Windows Explorer", 
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/windows95/apps/icons/file-explorer.svg`,
	})
	.setSkinOverride(MinimalSkin, { 
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/minimal/apps/icons/file-explorer.svg`,
	})
	.setSkinOverride(PixelSkin, { 
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/pixel/apps/icons/file-explorer.png`,
	});

export { fileExplorer, FileExplorerProps };
export { FileSelectorMode } from "./types/utils";
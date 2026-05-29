import { App, AppsConfig, MEDIA_EXTENSIONS } from "@prozilla-os/core";
import { MediaViewer, type MediaViewerProps } from "./components/MediaViewer";
import { Skin, MacOsSkin, Windows95Skin, MinimalSkin, PixelSkin } from "@prozilla-os/skins";

const mediaViewer = new App<MediaViewerProps>("Media Viewer", "media-viewer", MediaViewer)
	.setIconUrl("https://os.prozilla.dev/assets/apps/icons/media-viewer.svg")
	.setRole(AppsConfig.APP_ROLES.mediaViewer)
	.setAssociatedExtensions(MEDIA_EXTENSIONS)
	.setCategory("Photo & video")
	.setSkinOverride(MacOsSkin, { 
		name: "Photos", 
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/mac/apps/icons/media-viewer.svg`,
	})
	.setSkinOverride(Windows95Skin, { 
		name: "Imaging", 
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/windows95/apps/icons/media-viewer.svg`,
	})
	.setSkinOverride(MinimalSkin, { 
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/minimal/apps/icons/media-viewer.svg`,
	})
	.setSkinOverride(PixelSkin, { 
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/pixel/apps/icons/media-viewer.png`,
	});

export { mediaViewer, MediaViewerProps };
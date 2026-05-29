import { Skin, SkinOptions } from "../skin";

export class PixelSkin extends Skin {
	public static override DEFAULTS: SkinOptions = {
		...super.DEFAULTS,
		wallpapers: [
			`{${super.TEMPLATE_KEYS.baseUrl}}/assets/skins/pixel/wallpapers/vibrant-wallpaper-blue-purple-red.png`,
			`{${super.TEMPLATE_KEYS.baseUrl}}/assets/skins/pixel/wallpapers/abstract-mesh-gradient-orange-red-purple.png`,
			`{${super.TEMPLATE_KEYS.baseUrl}}/assets/skins/pixel/wallpapers/vibrant-wallpaper-purple-yellow.png`,
			`{${super.TEMPLATE_KEYS.baseUrl}}/assets/skins/pixel/wallpapers/abstract-wallpaper-mesh-gradient-cyan.png`,
			`{${super.TEMPLATE_KEYS.baseUrl}}/assets/skins/pixel/wallpapers/colorful-abstract-wallpaper-blue-red-green.png`,
			`{${super.TEMPLATE_KEYS.baseUrl}}/assets/skins/pixel/wallpapers/mesh-gradient-wallpaper-red-purple.png`,
			`{${super.TEMPLATE_KEYS.baseUrl}}/assets/skins/pixel/wallpapers/colorful-mesh-gradient-red-green.png`,
			`{${super.TEMPLATE_KEYS.baseUrl}}/assets/skins/pixel/wallpapers/flame-abstract-wallpaper-orange.png`,
			`{${super.TEMPLATE_KEYS.baseUrl}}/assets/skins/pixel/wallpapers/wave-abstract-wallpaper-teal.png`,
		],
		defaultWallpaper: `{${super.TEMPLATE_KEYS.baseUrl}}/assets/skins/pixel/wallpapers/vibrant-wallpaper-blue-purple-red.png`,
		fileIcons: {
			generic: `{${super.TEMPLATE_KEYS.baseUrl}}/assets/skins/pixel/apps/file-explorer/file.png`,
		},
		folderIcons: {
			generic: `{${super.TEMPLATE_KEYS.baseUrl}}/assets/skins/pixel/apps/file-explorer/folder.png`,
		},
		loadStyleSheet: () => {
			void import("../../styles/skins/pixel.css");
		},
	};
}

export const pixelSkin = new PixelSkin();
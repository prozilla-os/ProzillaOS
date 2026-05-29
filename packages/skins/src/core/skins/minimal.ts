import { Skin, SkinOptions } from "../skin";

/**
 * A minimalistic skin with monochrome icons.
 */
export class MinimalSkin extends Skin {
	public static override DEFAULTS: SkinOptions = {
		...super.DEFAULTS,
		defaultWallpaper: `{${super.TEMPLATE_KEYS.baseUrl}}/assets/wallpapers/abstract-wallpaper-mesh-gradient-cyan.png`,
		fileIcons: {
			generic: `{${super.TEMPLATE_KEYS.baseUrl}}/assets/skins/minimal/apps/file-explorer/file.svg`,
		},
		folderIcons: {
			generic: `{${super.TEMPLATE_KEYS.baseUrl}}/assets/skins/minimal/apps/file-explorer/folder.svg`,
		},
		loadStyleSheet: () => {
			void import("../../styles/skins/minimal.css");
		},
	};
}

export const minimalSkin = new MinimalSkin();
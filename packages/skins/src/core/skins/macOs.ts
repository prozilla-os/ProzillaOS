import { Skin, SkinOptions } from "../skin";

/**
 * A skin inspired by the MacOS interface.
 */
export class MacOsSkin extends Skin {
	public static override DEFAULTS: SkinOptions = {
		...super.DEFAULTS,
		wallpapers: [
			`{${super.TEMPLATE_KEYS.baseUrl}}/assets/skins/mac/wallpapers/macos-monterey.jpg`,
			`{${super.TEMPLATE_KEYS.baseUrl}}/assets/skins/mac/wallpapers/macos-big-sur.jpg`,
			`{${super.TEMPLATE_KEYS.baseUrl}}/assets/skins/mac/wallpapers/macos-sequoia.jpg`,
			`{${super.TEMPLATE_KEYS.baseUrl}}/assets/skins/mac/wallpapers/macos-sonoma.jpg`,
			`{${super.TEMPLATE_KEYS.baseUrl}}/assets/skins/mac/wallpapers/macos-ventura.jpg`,
		],
		defaultWallpaper: `{${super.TEMPLATE_KEYS.baseUrl}}/assets/skins/mac/wallpapers/macos-monterey.jpg`,
		fileIcons: {
			generic: `{${super.TEMPLATE_KEYS.baseUrl}}/assets/skins/mac/apps/file-explorer/file.svg`,
		},
		folderIcons: {
			generic: `{${super.TEMPLATE_KEYS.baseUrl}}/assets/skins/mac/apps/file-explorer/folder.svg`,
		},
		loadStyleSheet: () => {
			void import("../../styles/skins/macOs.css");
		},
	};
}

export const macOsSkin = new MacOsSkin();
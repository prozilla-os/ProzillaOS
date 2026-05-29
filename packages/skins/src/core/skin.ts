import { BASE_URL, fillTemplate, resolveUrl } from "@prozilla-os/shared";
import { Theme } from "../types";

export interface SkinOptions {
	/**
	 * The base URL for all assets.
	 * @default
	 * "https://os.prozilla.dev/"
	 */
	baseUrl: string;

	/**
	 * SVG icon for the system.
	 * @default
	 * "{base}/icon.svg"
	 */
	systemIcon: string;

	/**
	 * Replacements for app icons based on app id.
	 */
	appIcons?: { [key: string]: string };

	/**
	 * Replacements for app names based on app id.
	 */
	appNames?: { [key: string]: string };

	/**
	 * Array of URLs of wallpaper images.
	 */
	wallpapers: string[];

	/**
	 * URL of default wallpaper image.
	 * @default
	 * "{base}/assets/wallpapers/vibrant-wallpaper-blue-purple-red.png"
	 */
	defaultWallpaper: string;

	/**
	 * URLs of icons for types of files.
	 */
	fileIcons: {
		generic: string;
		info?: string;
		text?: string;
		code?: string;
		external?: string;
		video?: string;
		audio?: string;
	};

	/**
	 * URLs of icons for types of folders.
	 */
	folderIcons: {
		generic: string;
		images?: string;
		text?: string;
		link?: string;
		video?: string;
		audio?: string;
	};

	/**
	 * Function that dynamically imports style sheet.
	 */
	loadStyleSheet?: () => void;

	/**
	 * Default theme.
	 */
	defaultTheme?: Theme;
}

export class Skin {
	baseUrl: SkinOptions["baseUrl"];
	systemIcon: SkinOptions["systemIcon"];
	appIcons: SkinOptions["appIcons"];
	appNames: SkinOptions["appNames"];
	wallpapers: SkinOptions["wallpapers"];
	defaultWallpaper: SkinOptions["defaultWallpaper"];
	fileIcons: SkinOptions["fileIcons"];
	folderIcons: SkinOptions["folderIcons"];
	loadStyleSheet: SkinOptions["loadStyleSheet"];
	defaultTheme: SkinOptions["defaultTheme"];

	public static readonly TEMPLATE_KEYS = {
		baseUrl: "base",
	};
	/**
	 * The default options for this skin.
	 */
	public static DEFAULTS: SkinOptions = {
		baseUrl: BASE_URL,
		systemIcon: `{${this.TEMPLATE_KEYS.baseUrl}}/icon.svg`,
		wallpapers: [
			`{${this.TEMPLATE_KEYS.baseUrl}}/assets/wallpapers/vibrant-wallpaper-blue-purple-red.png`,
			`{${this.TEMPLATE_KEYS.baseUrl}}/assets/wallpapers/abstract-mesh-gradient-orange-red-purple.png`,
			`{${this.TEMPLATE_KEYS.baseUrl}}/assets/wallpapers/vibrant-wallpaper-purple-yellow.png`,
			`{${this.TEMPLATE_KEYS.baseUrl}}/assets/wallpapers/abstract-wallpaper-mesh-gradient-cyan.png`,
			`{${this.TEMPLATE_KEYS.baseUrl}}/assets/wallpapers/colorful-abstract-wallpaper-blue-red-green.png`,
			`{${this.TEMPLATE_KEYS.baseUrl}}/assets/wallpapers/mesh-gradient-wallpaper-red-purple.png`,
			`{${this.TEMPLATE_KEYS.baseUrl}}/assets/wallpapers/colorful-mesh-gradient-red-green.png`,
			`{${this.TEMPLATE_KEYS.baseUrl}}/assets/wallpapers/flame-abstract-wallpaper-orange.png`,
			`{${this.TEMPLATE_KEYS.baseUrl}}/assets/wallpapers/wave-abstract-wallpaper-teal.png`,
			`{${this.TEMPLATE_KEYS.baseUrl}}/assets/wallpapers/abstract-wallpaper-gradient-blue-dark.png`,
			`{${this.TEMPLATE_KEYS.baseUrl}}/assets/wallpapers/abstract-wallpaper-gradient-red.png`,
		],
		defaultWallpaper: `{${this.TEMPLATE_KEYS.baseUrl}}/assets/wallpapers/vibrant-wallpaper-blue-purple-red.png`,
		fileIcons: {
			generic: `{${this.TEMPLATE_KEYS.baseUrl}}/assets/apps/file-explorer/icons/file.svg`,
			text: `{${this.TEMPLATE_KEYS.baseUrl}}/assets/apps/file-explorer/icons/file-text.svg`,
			info: `{${this.TEMPLATE_KEYS.baseUrl}}/assets/apps/file-explorer/icons/file-info.svg`,
			code: `{${this.TEMPLATE_KEYS.baseUrl}}/assets/apps/file-explorer/icons/file-code.svg`,
			external: `{${this.TEMPLATE_KEYS.baseUrl}}/assets/apps/file-explorer/icons/file-external.svg`,
			video: `{${this.TEMPLATE_KEYS.baseUrl}}/assets/apps/file-explorer/icons/file-video.svg`,
			audio: `{${this.TEMPLATE_KEYS.baseUrl}}/assets/apps/file-explorer/icons/file-audio.svg`,
		},
		folderIcons: {
			generic: `{${this.TEMPLATE_KEYS.baseUrl}}/assets/apps/file-explorer/icons/folder.svg`,
			images: `{${this.TEMPLATE_KEYS.baseUrl}}/assets/apps/file-explorer/icons/folder-images.svg`,
			text: `{${this.TEMPLATE_KEYS.baseUrl}}/assets/apps/file-explorer/icons/folder-text.svg`,
			link: `{${this.TEMPLATE_KEYS.baseUrl}}/assets/apps/file-explorer/icons/folder-link.svg`,
			video: `{${this.TEMPLATE_KEYS.baseUrl}}/assets/apps/file-explorer/icons/folder-video.svg`,
			audio: `{${this.TEMPLATE_KEYS.baseUrl}}/assets/apps/file-explorer/icons/folder-audio.svg`,
		},
	};

	constructor(options: Partial<SkinOptions> = {}) {
		const { DEFAULTS } = this.constructor as typeof Skin;
		this.baseUrl = options.baseUrl ?? DEFAULTS.baseUrl;

		this.systemIcon = this.resolveAssetUrl(options.systemIcon ?? DEFAULTS.systemIcon);
		const appIcons = options.appIcons ?? DEFAULTS.appIcons;
		if (appIcons)
			this.appIcons = this.resolveAssetUrls(appIcons);
		this.appNames = options.appNames ?? DEFAULTS.appNames;
		this.wallpapers = this.resolveAssetUrls(options.wallpapers ?? DEFAULTS.wallpapers);
		this.defaultWallpaper = this.resolveAssetUrl(options.defaultWallpaper ?? DEFAULTS.defaultWallpaper);
		this.fileIcons = this.resolveAssetUrls(options.fileIcons ?? DEFAULTS.fileIcons);
		this.folderIcons = this.resolveAssetUrls(options.folderIcons ?? DEFAULTS.folderIcons);
		this.loadStyleSheet = options.loadStyleSheet ?? DEFAULTS.loadStyleSheet;
		this.defaultTheme = options.defaultTheme ?? DEFAULTS.defaultTheme;
	}

	public resolveAssetUrls<Assets extends Record<string, string>>(assets: Assets): Assets
	public resolveAssetUrls(assets: string[]): string[]
	public resolveAssetUrls(assets: string[] | Record<string, string>) {
		if (Array.isArray(assets)) {
			return assets.map(this.resolveAssetUrl.bind(this));
		}
		const resolvedAssets: Record<string, string> = {};
		for (const [key, value] of Object.entries(assets)) {
			resolvedAssets[key] = this.resolveAssetUrl(value);
		}
		return resolvedAssets;
	}

	public resolveAssetUrl(assetUrl: string) {
		const segments = fillTemplate(assetUrl, { [Skin.TEMPLATE_KEYS.baseUrl]: this.baseUrl }, { join: false });
		return  resolveUrl(...segments);
	}
}
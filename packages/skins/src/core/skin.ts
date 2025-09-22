import { Theme } from "../types";

interface SkinOptions {
	/**
	 * SVG icon for the system
	 * @default
	 * "https://os.prozilla.dev/icon.svg"
	 */
	systemIcon: string;

	/**
	 * Replacements for app icons based on app id
	 */
	appIcons?: { [key: string]: string };

	/**
	 * Replacements for app names based on app id
	 */
	appNames?: { [key: string]: string };

	/**
	 * Array of URLs of wallpaper images
	 */
	wallpapers: string[];

	/**
	 * URL of default wallpaper image
	 * @default
	 * "https://os.prozilla.dev/assets/wallpapers/vibrant-wallpaper-blue-purple-red.png"
	 */
	defaultWallpaper: string;

	/**
	 * URLs of icons for types of files
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
	 * URLs of icons for types of folders
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
	 * Function that dynamically imports style sheet
	 */
	loadStyleSheet?: () => void;

	/**
	 * Default theme
	 */
	defaultTheme?: Theme;
}

export class Skin {
	systemIcon: SkinOptions["systemIcon"];
	appIcons: SkinOptions["appIcons"];
	appNames: SkinOptions["appNames"];
	wallpapers: SkinOptions["wallpapers"];
	defaultWallpaper: SkinOptions["defaultWallpaper"];
	fileIcons: SkinOptions["fileIcons"];
	folderIcons: SkinOptions["folderIcons"];
	loadStyleSheet: SkinOptions["loadStyleSheet"];
	defaultTheme: SkinOptions["defaultTheme"];

	constructor(options: Partial<SkinOptions> = {}) {
		this.systemIcon = options.systemIcon ?? "https://os.prozilla.dev/icon.svg";

		this.appIcons = options.appIcons;
		this.appNames = options.appNames;

		this.wallpapers = options.wallpapers ?? [
			"https://os.prozilla.dev/assets/wallpapers/vibrant-wallpaper-blue-purple-red.png",
			"https://os.prozilla.dev/assets/wallpapers/abstract-mesh-gradient-orange-red-purple.png",
			"https://os.prozilla.dev/assets/wallpapers/vibrant-wallpaper-purple-yellow.png",
			"https://os.prozilla.dev/assets/wallpapers/abstract-wallpaper-mesh-gradient-cyan.png",
			"https://os.prozilla.dev/assets/wallpapers/colorful-abstract-wallpaper-blue-red-green.png",
			"https://os.prozilla.dev/assets/wallpapers/mesh-gradient-wallpaper-red-purple.png",
			"https://os.prozilla.dev/assets/wallpapers/colorful-mesh-gradient-red-green.png",
			"https://os.prozilla.dev/assets/wallpapers/flame-abstract-wallpaper-orange.png",
			"https://os.prozilla.dev/assets/wallpapers/wave-abstract-wallpaper-teal.png",
			"https://os.prozilla.dev/assets/wallpapers/abstract-wallpaper-gradient-blue-dark.png",
			"https://os.prozilla.dev/assets/wallpapers/abstract-wallpaper-gradient-red.png",
		];
		this.defaultWallpaper = options.defaultWallpaper ?? "https://os.prozilla.dev/assets/wallpapers/vibrant-wallpaper-blue-purple-red.png";

		this.fileIcons = options.fileIcons ?? {
			generic: "https://os.prozilla.dev/assets/apps/file-explorer/icons/file.svg",
			text: "https://os.prozilla.dev/assets/apps/file-explorer/icons/file-text.svg",
			info: "https://os.prozilla.dev/assets/apps/file-explorer/icons/file-info.svg",
			code: "https://os.prozilla.dev/assets/apps/file-explorer/icons/file-code.svg",
			external: "https://os.prozilla.dev/assets/apps/file-explorer/icons/file-external.svg",
			video: "https://os.prozilla.dev/assets/apps/file-explorer/icons/file-video.svg",
			audio: "https://os.prozilla.dev/assets/apps/file-explorer/icons/file-audio.svg",
		};
		this.folderIcons = options.folderIcons ?? {
			generic: "https://os.prozilla.dev/assets/apps/file-explorer/icons/folder.svg",
			images: "https://os.prozilla.dev/assets/apps/file-explorer/icons/folder-images.svg",
			text: "https://os.prozilla.dev/assets/apps/file-explorer/icons/folder-text.svg",
			link: "https://os.prozilla.dev/assets/apps/file-explorer/icons/folder-link.svg",
			video: "https://os.prozilla.dev/assets/apps/file-explorer/icons/folder-video.svg",
			audio: "https://os.prozilla.dev/assets/apps/file-explorer/icons/folder-audio.svg",
		};

		this.loadStyleSheet = options.loadStyleSheet;

		this.defaultTheme = options.defaultTheme;
	}
}
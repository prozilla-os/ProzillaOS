import { OptionalInterface } from "../types/utils";

interface SkinOptions {
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
	};

	/**
	 * URLs of icons for types of folders
	 */
	folderIcons: {
		generic: string;
		images?: string;
		text?: string;
		link?: string;
	};

	/**
	 * Function that dynamically imports style sheet
	 */
	loadStyleSheet?: () => void;
}

export class Skin {
	appIcons: SkinOptions["appIcons"];
	appNames: SkinOptions["appNames"];
	wallpapers: SkinOptions["wallpapers"];
	defaultWallpaper: SkinOptions["defaultWallpaper"];
	fileIcons: SkinOptions["fileIcons"];
	folderIcons: SkinOptions["folderIcons"];
	loadStyleSheet: SkinOptions["loadStyleSheet"];

	constructor(options: OptionalInterface<SkinOptions> = {}) {
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
		];
		this.defaultWallpaper = options.defaultWallpaper ?? "https://os.prozilla.dev/assets/wallpapers/vibrant-wallpaper-blue-purple-red.png";

		this.fileIcons = options.fileIcons ?? {
			generic: "https://os.prozilla.dev/assets/apps/file-explorer/icons/file.svg",
			text: "https://os.prozilla.dev/assets/apps/file-explorer/icons/file-text.svg",
			info: "https://os.prozilla.dev/assets/apps/file-explorer/icons/file-info.svg",
			code: "https://os.prozilla.dev/assets/apps/file-explorer/icons/file-code.svg"
		};
		this.folderIcons = options.folderIcons ?? {
			generic: "https://os.prozilla.dev/assets/apps/file-explorer/icons/folder.svg",
			images: "https://os.prozilla.dev/assets/apps/file-explorer/icons/folder-images.svg",
			text: "https://os.prozilla.dev/assets/apps/file-explorer/icons/folder-text.svg",
			link: "https://os.prozilla.dev/assets/apps/file-explorer/icons/folder-link.svg"
		};

		this.loadStyleSheet = options.loadStyleSheet;
	}
}
import { OptionalInterface } from "../../../types/util";

export interface DesktopConfigOptions {
	/** Array of URLs of wallpaper images */
	wallpapers: string[];

	/** URL of default wallpaper image */
	defaultWallpaper: string;

	/**
	 * @default 1
	 */
	defaultIconSize: 0 | 1 | 2;

	/**
	 * 0: vertical, 1: horizontal
	 * @default 0
	 * */
	defaultIconDirection: 0 | 1; 
}

export class DesktopConfig {
	wallpapers: DesktopConfigOptions["wallpapers"];
	defaultWallpaper: DesktopConfigOptions["defaultWallpaper"];
	defaultIconSize: DesktopConfigOptions["defaultIconSize"];
	defaultIconDirection: DesktopConfigOptions["defaultIconDirection"];

	constructor(options: OptionalInterface<DesktopConfigOptions> = {}) {
		const { wallpapers, defaultWallpaper, defaultIconSize, defaultIconDirection } = options as DesktopConfigOptions;

		this.wallpapers = wallpapers ?? [
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
		this.defaultWallpaper = defaultWallpaper ?? "https://os.prozilla.dev/assets/wallpapers/vibrant-wallpaper-blue-purple-red.png";
		this.defaultIconSize = defaultIconSize ?? 1;
		this.defaultIconDirection = defaultIconDirection ?? 0;
	}
}
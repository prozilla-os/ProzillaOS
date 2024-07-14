interface SkinOptions {
	appIcons?: { [key: string]: string };

	wallpapers?: string[];
	defaultWallpaper?: string;

	fileIcons?: {
		generic: string;
		info?: string;
		text?: string;
		code?: string;
	};

	folderIcons?: {
		generic: string;
		images?: string;
		text?: string;
		link?: string;
	};

	loadStyleSheet?: () => void;
}

export class Skin {
	appIcons: SkinOptions["appIcons"];
	wallpapers: SkinOptions["wallpapers"];
	defaultWallpaper: SkinOptions["defaultWallpaper"];
	fileIcons: SkinOptions["fileIcons"];
	folderIcons: SkinOptions["folderIcons"];
	loadStyleSheet: SkinOptions["loadStyleSheet"];

	constructor(options: SkinOptions) {
		this.appIcons = options.appIcons;
		this.wallpapers = options.wallpapers;
		this.defaultWallpaper = options.defaultWallpaper;
		this.fileIcons = options.fileIcons;
		this.folderIcons = options.folderIcons;
		this.loadStyleSheet = options.loadStyleSheet;
	}
}
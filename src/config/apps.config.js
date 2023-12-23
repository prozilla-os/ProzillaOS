export const APPS = {
	TERMINAL: "terminal",
	SETTINGS: "settings",
	MEDIA_VIEWER: "media-viewer",
	TEXT_EDITOR: "text-editor",
	FILE_EXPLORER: "file-explorer"
};

export const APP_NAMES = {
	TERMINAL: "Commands",
	SETTINGS: "Settings",
	MEDIA_VIEWER: "Photos",
	TEXT_EDITOR: "Notes",
	FILE_EXPLORER: "Files"
};

export const APP_ICONS = {
	TERMINAL: `${process.env.PUBLIC_URL}/assets/apps/icons/${APPS.TERMINAL}.svg`,
	SETTINGS: `${process.env.PUBLIC_URL}/assets/apps/icons/${APPS.SETTINGS}.svg`,
	MEDIA_VIEWER: `${process.env.PUBLIC_URL}/assets/apps/icons/${APPS.MEDIA_VIEWER}.svg`,
	TEXT_EDITOR: `${process.env.PUBLIC_URL}/assets/apps/icons/${APPS.TEXT_EDITOR}.svg`,
	FILE_EXPLORER: `${process.env.PUBLIC_URL}/assets/apps/icons/${APPS.FILE_EXPLORER}.svg`,
};
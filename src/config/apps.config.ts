import { NAME } from "./branding.config";

export const APPS = {
	TERMINAL: "terminal",
	SETTINGS: "settings",
	MEDIA_VIEWER: "media-viewer",
	TEXT_EDITOR: "text-editor",
	FILE_EXPLORER: "file-explorer",
	CALCULATOR: "calculator",
	BROWSER: "browser",
	LOGIC_SIM: "logic-sim",
};

export type AppKey = keyof typeof APPS;

export const APP_NAMES: Record<AppKey, string> = {
	TERMINAL: "Commands",
	SETTINGS: "Settings",
	MEDIA_VIEWER: "Photos",
	TEXT_EDITOR: "Notes",
	FILE_EXPLORER: "Files",
	CALCULATOR: "Maths",
	BROWSER: "Browser",
	LOGIC_SIM: "Logic Sim (WIP)"
};

export const APP_DESCRIPTIONS: Record<AppKey, string | null> = {
	TERMINAL: "A command line tool inspired by the Unix shell that runs entirely in your browser and uses a virtual file system.",
	SETTINGS: `Configure ${NAME}'s settings and customize your experience.`,
	TEXT_EDITOR: "Simple text editor for reading and writing text documents.",
	FILE_EXPLORER: "Browse and manage your virtual files.",
	CALCULATOR: "Simple calculator app.",
	BROWSER: "Browse the internet.",
	LOGIC_SIM: "Create digital logic circuits using the online simulator.",
	MEDIA_VIEWER: null,
};

export const APP_ICONS = {
	TERMINAL: `/assets/apps/icons/${APPS.TERMINAL}.svg`,
	SETTINGS: `/assets/apps/icons/${APPS.SETTINGS}.svg`,
	MEDIA_VIEWER: `/assets/apps/icons/${APPS.MEDIA_VIEWER}.svg`,
	TEXT_EDITOR: `/assets/apps/icons/${APPS.TEXT_EDITOR}.svg`,
	FILE_EXPLORER: `/assets/apps/icons/${APPS.FILE_EXPLORER}.svg`,
	CALCULATOR: `/assets/apps/icons/${APPS.CALCULATOR}.svg`,
};
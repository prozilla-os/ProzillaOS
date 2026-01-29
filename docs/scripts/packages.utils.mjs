import { Ansi } from "@prozilla-os/shared";

// @ts-check
export const PACKAGES_DIR = "../packages/";
export const PACKAGE_PATHS = [
	"shared",
	"skins",
	"core",
	"dev-tools",
	"apps/app-center",
	"apps/browser",
	"apps/calculator",
	"apps/file-explorer",
	"apps/logic-sim",
	"apps/media-viewer",
	"apps/settings",
	"apps/terminal",
	"apps/text-editor",
];
export const ORG = "@prozilla-os";
export const PACKAGE_PREFIX = ORG + "/";
export const OUT_DIR = "./src/reference/";
export const PACKAGE_NAMES = PACKAGE_PATHS.map(packagePathToName);

/**
 * @param {string} path 
 */
export function formatPackageName(path) {
	return Ansi.cyan(packagePathToName(path));
}

/**
 * @param {string} path 
 */
export function packagePathToName(path) {
	if (!PACKAGE_PATHS.includes(path))
		return path;
	path = path.replace(/^.*\//, "");
	if (path === "prozilla-os") {
		return path;
	}
	return ORG + "/" + path;
}
import { App } from "./app";
import { isValidUrl } from "../_utils";
import { WindowProps } from "../../components";

export interface LoadAppOptions {
	/**
	 * The name of the export that contains the App instance.
	 * If not specified, checks `app` first, then `default`.
	 */
	exportName?: string;
}

const SHARED_DEPS = ["@prozilla-os/core", "@prozilla-os/shared", "react", "react/jsx-runtime", "react-dom"];

function npmToUrl(packageName: string) {
	const external = SHARED_DEPS.map(encodeURIComponent).join(",");
	return `https://esm.sh/${packageName}?external=${external}`;
}

function extractApp(module: Record<string, unknown>, exportName?: string): App<WindowProps> | null {
	if (exportName != null) {
		const value = module[exportName];
		if (value instanceof App)
			return value;
		return null;
	}

	const appValue = module["app"];
	if (appValue instanceof App)
		return appValue;

	const defaultVal = module["default"];
	if (defaultVal instanceof App)
		return defaultVal;

	return null;
}

/**
 * Load an app from a URL using dynamic import.
 */
async function loadAppFromUrl(url: string, options?: LoadAppOptions) {
	try {
		const module = await import(/* @vite-ignore */ url) as Record<string, unknown>;
		const app = extractApp(module, options?.exportName);

		if (app != null)
			return app;

		const names = options?.exportName != null
			? `\`export { ${options.exportName} }\``
			: "`export { app }` or `export default`";

		throw new Error(`Module does not export a valid App instance. Expected ${names}.`);
	} catch (error) {
		throw new Error(`Failed to load app from URL: ${error instanceof Error ? error.message : String(error)}`);
	}
}

/**
 * Load an app from either a URL or an npm package name (auto-detected).
 */
export async function loadApp(appNameOrUrl: string, options?: LoadAppOptions) {
	const url = isValidUrl(appNameOrUrl) ? appNameOrUrl : npmToUrl(appNameOrUrl);
	return loadAppFromUrl(url, options);
}

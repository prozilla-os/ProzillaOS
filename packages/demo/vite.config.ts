import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import { BUILD_DIR } from "./src/config/deploy.config";
import { resolve } from "path";

/**
 * Loads packages from their local path instead of node_modules 
 * You must run `pnpm link <pkg>` to make this work correctly
 */
const ENABLE_ALIASES = true;

/**
 * Enables importing local packages from their dist (build) directory instead of their src directory
 * Useful for testing builds before publishing
 */
const USE_PACKAGE_BUILDS = false;

function generateAliases() {
	if (!ENABLE_ALIASES) return {};

	const entryFile = USE_PACKAGE_BUILDS ? "dist/main.js" : "src/main.ts";

	const localPackages = [
		{ name: "prozilla-os", path: resolve(__dirname, "../prozilla-os/" + entryFile) },
		{ name: "@prozilla-os/core", path: resolve(__dirname, "../core/" + entryFile) },
		{ name: "@prozilla-os/shared", path: resolve(__dirname, "../shared/" + entryFile) },
		{ name: "@prozilla-os/skins", path: resolve(__dirname, "../skins/" + entryFile) }
	];

	const localApps = [
		"browser",
		"calculator",
		"file-explorer",
		"logic-sim",
		"media-viewer",
		"settings",
		"terminal",
		"text-editor"
	];

	localApps.forEach((id) => {
		const name = `@prozilla-os/${id}`;
		const path = resolve(__dirname, `../apps/${id}/${entryFile}`);
		localPackages.push({ name, path });
	});

	return localPackages.reduce((aliases, localPackage) => {
		aliases[localPackage.name] = localPackage.path;
		return aliases;
	}, {} as Record<string, string>);
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
	const devMode = command == "serve";
	const aliases = generateAliases();

	return {
		base: "/",
		plugins: [
			react(),
			checker({
				typescript: true,
			}),
		],
		build: {
			outDir: BUILD_DIR
		},
		resolve: {
			alias: devMode ? aliases : {},
		},
		server: {
			port: 3000,
		},
		optimizeDeps: {
			exclude: devMode ? Object.keys(aliases) : []
		}
	};
});
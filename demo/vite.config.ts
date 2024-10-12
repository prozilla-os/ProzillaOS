import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import checker from "vite-plugin-checker";
import { BUILD_DIR, DOMAIN } from "./src/config/deploy.config";
import { resolve } from "path";
import { stageSitePlugin } from "@prozilla-os/dev-tools";
import { appsConfig } from "./src/config/apps.config";
import { NAME, TAG_LINE } from "./src/config/branding.config";

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
		{ name: "prozilla-os", path: resolve(__dirname, "../packages/prozilla-os/" + entryFile) },
		{ name: "@prozilla-os/core", path: resolve(__dirname, "../packages/core/" + entryFile) },
		{ name: "@prozilla-os/shared", path: resolve(__dirname, "../packages/shared/" + entryFile) },
		{ name: "@prozilla-os/skins", path: resolve(__dirname, "../packages/skins/" + entryFile) }
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
		const path = resolve(__dirname, `../packages/apps/${id}/${entryFile}`);
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
			})
		],
		build: {
			outDir: BUILD_DIR,
			rollupOptions: {
				external: ["vite", "path", /vite-plugin-/g, /@vitejs\/plugin-/g, "rollup"],
				plugins: [
					stageSitePlugin({
						appsConfig,
						siteName: NAME,
						siteTagLine: TAG_LINE,
						domain: DOMAIN
					})
				],
				output: {
					assetFileNames: "assets/[name][extname]",
					chunkFileNames: "chunks/[name]-[hash].js",
					entryFileNames: "[name].js",
				}
			},
		},
		resolve: {
			alias: devMode ? aliases : {},
		},
		server: {
			port: 3000,
		},
		optimizeDeps: {
			exclude: devMode ? Object.keys(aliases) : [],
		}
	} as UserConfig;
});
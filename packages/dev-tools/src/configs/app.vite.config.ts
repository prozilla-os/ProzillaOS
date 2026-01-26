import { UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import cssInjectedByJs from "vite-plugin-css-injected-by-js";
import { posix, resolve, sep } from "path";
import { appMetadataPlugin } from "../plugins";
import { Print } from "@prozilla-os/shared";

/**
 * Helper function for creating Vite configurations for ProzillaOS apps
 * @param basePath - Path of base directory
 * @param entryPath - Path of library entry
 * @returns Vite configuration
 * @see https://vitejs.dev/config/
 */
export const appViteConfig = (basePath: string, entryPath: string): UserConfig => {
	let entryFile = resolve(basePath, entryPath);

	// Normalize paths for Windows compatibility
	if (sep === "\\")
		entryFile = entryFile.split(sep).join(posix.sep);

	Print.text("Using Vite config for app");
	Print.parameter("Entry", entryFile);

	return {
		plugins: [
			appMetadataPlugin({
				entryPath,
			}),
			react(),
			cssInjectedByJs(),
			dts({
				outDir: "dist",
				rollupTypes: true,
				strictOutput: true,
				pathsToAliases: false,
				tsconfigPath: "tsconfig.build.json",
			}),
		],
		build: {
			lib: {
				entry: entryFile,
				formats: ["es"],
			},
			rollupOptions: {
				external: ["react", "react/jsx-runtime", "@prozilla-os/core", "@prozilla-os/shared", "@prozilla-os/skins", /@fortawesome\/*/g],
				output: {
					assetFileNames: "assets/[name][extname]",
					chunkFileNames: "chunks/[name]-[hash].js",
					entryFileNames: "[name].js",
				},
			},
			sourcemap: true,
		},
	};
};
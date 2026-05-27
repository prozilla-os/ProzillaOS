import { resolve } from "node:path";
import { PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import cssInjectedByJs from "vite-plugin-css-injected-by-js";
import { appMetadataPlugin } from "./appMetadata";
import { DEFAULT_SHARED_PACKAGES, type SharedPackage } from "../shared/sharedPackages";

export interface AppPluginOptions {
	/** Path to the app's entry file, relative to the project root. */
	entryPath: string;
	/** CSS class name for the app's root element. */
	appClass?: string;
	/** Path to the TypeScript config for the build. Defaults to `"tsconfig.build.json"`. */
	tsconfigPath?: string;
	/** Shared packages to mark as external. Defaults to {@link DEFAULT_SHARED_PACKAGES}. */
	sharedPackages?: SharedPackage[];
	/** Additional external patterns (strings or RegExps) beyond the shared package specifiers. */
	externalPatterns?: (string | RegExp)[];
}

/**
 * Vite plugin for building ProzillaOS apps.
 * @example
 * ```ts
 * import { defineConfig } from "vite";
 * import { appPlugin } from "@prozilla-os/dev-tools";
 *
 * export default defineConfig({
 *     plugins: [appPlugin({ entryPath: "src/main.ts" })],
 * });
 * ```
 */
export function appPlugin(options: AppPluginOptions): PluginOption[] {
	const {
		entryPath,
		appClass,
		tsconfigPath = "tsconfig.build.json",
		sharedPackages = DEFAULT_SHARED_PACKAGES,
		externalPatterns = [],
	} = options;

	return [
		appMetadataPlugin({ entryPath, appClass }),
		react(),
		cssInjectedByJs(),
		dts({
			outDir: "dist",
			rollupTypes: true,
			strictOutput: true,
			pathsToAliases: false,
			tsconfigPath,
		}),
		{
			name: "prozilla-os-app",
			config(config) {
				const root = config.root || process.cwd();
				const entryFile = resolve(root, entryPath);

				return {
					build: {
						lib: {
							entry: entryFile,
							formats: ["es"],
						},
						rollupOptions: {
							external: [
								...sharedPackages.map((sharedPackage) => sharedPackage.specifier),
								...externalPatterns,
							],
							output: {
								assetFileNames: "assets/[name][extname]",
								chunkFileNames: "chunks/[name]-[hash].js",
								entryFileNames: "[name].js",
							},
						},
						sourcemap: true,
					},
				};
			},
		},
	];
}

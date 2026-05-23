import { PluginOption } from "vite";
import { importMapPlugin, type ImportMapPluginOptions } from "./importMap";
import { stageSitePlugin, StageOptions } from "./stageSite";
import react from "@vitejs/plugin-react-swc";

export type SitePluginOptions = StageOptions & ImportMapPluginOptions;

/**
 * Vite plugin that combines `@vitejs/plugin-react-swc`, {@link importMapPlugin} and {@link stageSitePlugin}.
 * 
 * This plugin can be used to build a website with ProzillaOS.
 */
export function sitePlugin(options: SitePluginOptions): PluginOption[] {
	const { sharedPackages, devImports, ...stageOptions } = options;

	return [
		react(),
		importMapPlugin({ sharedPackages, devImports }),
		stageSitePlugin(stageOptions),
	];
}

import { defineConfig } from "vite";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		dts({
			include: ["src"],
			outDir: "dist",
			rollupTypes: true,
			strictOutput: true,
			pathsToAliases: false,
			tsconfigPath: "tsconfig.build.json",
		}),
		externalizeDeps(),
	],
	build: {
		lib: {
			entry: {
				main: resolve(__dirname, "src/main.ts"),
				cli: resolve(__dirname, "src/cli.ts"),
			},
			formats: ["es"],
		},
		rollupOptions: {
			output: {
				assetFileNames: "assets/[name][extname]",
				chunkFileNames: "chunks/[name]-[hash].js",
				entryFileNames: "[name].js",
			},
		},
		sourcemap: true,
	},
});
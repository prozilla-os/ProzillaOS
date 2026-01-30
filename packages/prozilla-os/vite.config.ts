import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react-swc";
import dts from "unplugin-dts/vite";
import cssInjectedByJs from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		cssInjectedByJs(),
		dts({
			include: ["src"],
			outDirs: "./dist",
			bundleTypes: {
				bundledPackages: ["@prozilla-os/*"],
			},
			strictOutput: true,
			pathsToAliases: false,
			tsconfigPath: "tsconfig.build.json",
		}),
	],
	build: {
		lib: {
			entry: resolve(__dirname, "src/main.ts"),
			formats: ["es"],
		},
		rollupOptions: {
			external: ["react", "react/jsx-runtime", /@prozilla-os/g],
			output: {
				assetFileNames: "assets/[name][extname]",
				chunkFileNames: "chunks/[name]-[hash].js",
				entryFileNames: "[name].js",
			},
		},
		sourcemap: true,
	},
});
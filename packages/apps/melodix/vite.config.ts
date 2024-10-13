import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		// libInjectCss(),
		cssInjectedByJsPlugin(),
		dts({
			include: ["src"],
			outDir: "dist",
			rollupTypes: true,
			strictOutput: true,
			pathsToAliases: false,
			tsconfigPath: "tsconfig.json",
		})
	],
	build: {
		lib: {
			entry: resolve(__dirname, "src/main.ts"),
			formats: ["es"],
		},
		rollupOptions: {
			external: ["react", "react/jsx-runtime", "@prozilla-os/core"],
			output: {
				assetFileNames: "assets/[name][extname]",
				entryFileNames: "[name].js",
			}
		},
		sourcemap: true
	},
	server: {
		port: 3000
	},
})

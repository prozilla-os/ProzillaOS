import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		libInjectCss(),
		dts({
			include: ["src"],
			outDir: "dist",
			rollupTypes: true,
			strictOutput: true,
			pathsToAliases: false,
			bundledPackages: ["@prozilla-os/*"],
			tsconfigPath: "tsconfig-build.json"
		})
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
				entryFileNames: "[name].js",
			}
		},
		sourcemap: true
	},
});
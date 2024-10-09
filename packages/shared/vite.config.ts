import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		dts({
			include: ["src"],
			outDir: "dist",
			rollupTypes: true,
			strictOutput: true
		})
	],
	build: {
		lib: {
			entry: resolve(__dirname, "src/main.ts"),
			formats: ["es"],
		},
		rollupOptions: {
			external: ["vite", "path", /vite-plugin-/g, /@vitejs\/plugin-/g, "rollup"],
			output: {
				assetFileNames: "chunks/[name][extname]",
				entryFileNames: "[name].js",
			}
		},
		sourcemap: true
	}
});
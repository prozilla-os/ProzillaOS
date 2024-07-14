import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		dts({
			include: ["src"],
			outDir: "./dist",
			rollupTypes: true,
			strictOutput: true
		}),
		libInjectCss(),
	],
	build: {
		lib: {
			entry: resolve(__dirname, "src/main.ts"),
			formats: ["es"],
		},
		rollupOptions: {
			external: ["react", "react/jsx-runtime"],
			output: {
				assetFileNames: "assets/[name][extname]",
				entryFileNames: "[name].js",
				chunkFileNames: "[name]-[hash].js",
				manualChunks: undefined
			},
			plugins: [{
				name: "test",
				resolveId (source) {
					if (source.endsWith(".css")) {
						return source;
					}
					return null;
				},
				renderDynamicImport(options) {
					const { targetModuleId } = options;
					if (targetModuleId?.endsWith(".css")) {
						const matches = targetModuleId.match(/(?<=\/)[a-zA-Z-]+(?=\.css$)/);

						if (matches == null)
							return;

						const name = matches[0];
						return {
							left: "import(/*",
							right: `*/"./assets/${name}.css")`
						};
					}
					return null;
				},
			}]
		},
		sourcemap: true,
	},
});
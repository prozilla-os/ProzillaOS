import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/examples/portfolio/",
	plugins: [react()],
	build: {
		rollupOptions: {
			external: ["vite", "path", /vite-plugin-/g, /@vitejs\/plugin-/g, "rollup"],
			output: {
				assetFileNames: "assets/[name][extname]",
				chunkFileNames: "chunks/[name]-[hash].js",
				entryFileNames: "[name].js",
			},
		},
	},
	server: {
		port: 3000,
	},
	preview: {
		port: 8080,
	},
});

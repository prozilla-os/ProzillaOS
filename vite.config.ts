import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { BUILD_DIR } from "./src/config/deploy.config";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/",
	plugins: [react()],
	build: {
		outDir: BUILD_DIR
	},
	server: {
		port: 3000,
		host: true
	}
});
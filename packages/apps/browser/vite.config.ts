import { defineConfig } from "vite";
import { appViteConfig } from "@prozilla-os/dev-tools";

export default defineConfig({
	...appViteConfig(__dirname, "src/main.ts")
});
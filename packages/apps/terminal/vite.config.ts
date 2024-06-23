import { defineConfig } from "vite";
import { appViteConfig } from "@prozilla-os/shared";

export default defineConfig({
	...appViteConfig(__dirname, "src/main.ts")
});
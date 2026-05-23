import { defineConfig } from "vite";
import { appPlugin } from "@prozilla-os/dev-tools";

export default defineConfig({
	plugins: [appPlugin({ entryPath: "src/main.ts", appClass: "TerminalApp" })],
});
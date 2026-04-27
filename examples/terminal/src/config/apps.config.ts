import { AppsConfig, terminal } from "prozilla-os";

export const appsConfig = new AppsConfig({
	apps: [
		terminal.setName("Terminal"),
	],
});

import { AppsConfig } from "@prozilla-os/core";
import { fileExplorer } from "@prozilla-os/file-explorer";

export const appsConfig = new AppsConfig({
	apps: [
		fileExplorer.setName("Files"),
	],
});
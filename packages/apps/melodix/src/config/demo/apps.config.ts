import { AppsConfig } from "@prozilla-os/core";
import { Melodix } from "../../main";

export const appsConfig = new AppsConfig({
	apps: [
		Melodix.setPinnedByDefault(true)
			.setLaunchAtStartup(true)
	]
});
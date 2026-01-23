import { faFlagCheckered, faList } from "@fortawesome/free-solid-svg-icons";
import { SettingsNavPage } from "../SettingsNavPage";
import { InstalledAppsSettings } from "./InstalledAppsSettings";
import { StartupAppsSettings } from "./StartupAppsSettings";

export function AppsSettings() {
	return <SettingsNavPage
		title="Apps"
		pages={{
			installedApps: {
				title: "Installed apps",
				description: "Manage installed apps",
				icon: faList,
				Content: InstalledAppsSettings,
			},
			startupApps: {
				title: "Startup apps",
				description: "Apps that start automatically",
				icon: faFlagCheckered,
				Content: StartupAppsSettings,
			},
		}}
	></SettingsNavPage>;
}
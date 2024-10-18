import { App, AppsConfig } from "@prozilla-os/core";
import { Settings, SettingsProps } from "./components/Settings";

const settings = new App<SettingsProps>("Settings", "settings", Settings)
	.setIconUrl("https://os.prozilla.dev/assets/apps/icons/settings.svg")
	.setRole(AppsConfig.APP_ROLES.Settings)
	.setCategory("Personalization");

export { settings };
import { App, AppsConfig } from "@prozilla-os/core";
import { Settings, type SettingsProps } from "./components/Settings";
import { Skin, MacOsSkin, Windows95Skin, MinimalSkin, PixelSkin } from "@prozilla-os/skins";

const settings = new App<SettingsProps>("Settings", "settings", Settings)
	.setIconUrl("https://os.prozilla.dev/assets/apps/icons/settings.svg")
	.setRole(AppsConfig.APP_ROLES.settings)
	.setCategory("Personalization")
	.setSkinOverride(MacOsSkin, { 
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/mac/apps/icons/settings.svg`,
	})
	.setSkinOverride(Windows95Skin, { 
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/windows95/apps/icons/settings.svg`,
	})
	.setSkinOverride(MinimalSkin, { 
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/minimal/apps/icons/settings.svg`,
	})
	.setSkinOverride(PixelSkin, { 
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/pixel/apps/icons/settings.png`,
	});

export { settings, SettingsProps };
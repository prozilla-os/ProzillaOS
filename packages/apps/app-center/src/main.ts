import { App } from "@prozilla-os/core";
import { AppCenter, type AppCenterProps, type AppCenterTab, type CategoryType } from "./components/AppCenter";
import { Skin, MacOsSkin } from "@prozilla-os/skins";

const appCenter = new App<AppCenterProps>("AppCenter", "app-center", AppCenter)
	.setIconUrl("https://os.prozilla.dev/assets/apps/icons/app-center.svg")
	.setPinnedByDefault(true)
	.setCategory("Utilities & tools")
	.setSkinOverride(MacOsSkin, { 
		name: "App Store",
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/mac/apps/icons/app-center.svg`,
	});

export { appCenter, AppCenterProps, AppCenterTab, CategoryType };
export * from "./core";
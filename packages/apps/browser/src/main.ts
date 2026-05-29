import { App, AppsConfig } from "@prozilla-os/core";
import { Browser, type BrowserProps } from "./components/Browser";
import { Vector2 } from "@prozilla-os/shared";
import { Skin, MacOsSkin, Windows95Skin, MinimalSkin, PixelSkin } from "@prozilla-os/skins";

const browser = new App<BrowserProps>("Browser", "browser", Browser, { size: new Vector2(700, 500) })
	.setIconUrl("https://os.prozilla.dev/assets/apps/icons/browser.svg")
	.setRole(AppsConfig.APP_ROLES.browser)
	.setCategory("Utilities & tools")
	.setSkinOverride(MacOsSkin, { 
		name: "Safari", 
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/mac/apps/icons/browser.svg`,
	})
	.setSkinOverride(Windows95Skin, { 
		name: "Internet Explorer", 
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/windows95/apps/icons/browser.svg`,
	})
	.setSkinOverride(MinimalSkin, { 
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/minimal/apps/icons/browser.svg`,
	})
	.setSkinOverride(PixelSkin, { 
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/pixel/apps/icons/browser.png`,
	});

export { browser, BrowserProps };
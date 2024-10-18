import { App, AppsConfig, Vector2 } from "@prozilla-os/core";
import { Browser, BrowserProps } from "./components/Browser";

const browser = new App<BrowserProps>("Browser", "browser", Browser, { size: new Vector2(700, 500) })
	.setIconUrl("https://os.prozilla.dev/assets/apps/icons/browser.svg")
	.setRole(AppsConfig.APP_ROLES.Browser)
	.setCategory("Utilities & tools");

export { browser };
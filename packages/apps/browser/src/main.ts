import { App, AppsConfig } from "@prozilla-os/core";
import { Browser, BrowserProps } from "./components/Browser";

const browser = new App<BrowserProps>("Browser", "browser", Browser)
	.setIconUrl("https://os.prozilla.dev/assets/apps/icons/browser.svg")
	.setRole(AppsConfig.APP_ROLES.Browser);

export { browser };
import { App } from "@prozilla-os/core";
import { AppCenter, type AppCenterProps, type AppCenterTab, type CategoryType } from "./components/AppCenter";

const appCenter = new App<AppCenterProps>("AppCenter", "app-center", AppCenter)
	.setIconUrl("https://os.prozilla.dev/assets/apps/icons/app-center.svg")
	.setPinnedByDefault(true)
	.setCategory("Utilities & tools");

export { appCenter, AppCenterProps, AppCenterTab, CategoryType };
export * from "./core";
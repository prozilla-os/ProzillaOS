import { App } from "@prozilla-os/core";
import { AppCenter } from "./components/AppCenter";

const appCenter = new App("AppCenter", "app-center", AppCenter)
	.setIconUrl("https://os.prozilla.dev/assets/apps/icons/app-center.svg")
	.setPinnedByDefault(true)
	.setCategory("Utilities & tools");

export { appCenter };
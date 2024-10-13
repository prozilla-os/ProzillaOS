import { App } from "@prozilla-os/core";
import { melodix } from "./components/Melodix";

const Melodix = new App("Melodix", "Melodix", melodix)
	.setIconUrl("https://us-east-1.tixte.net/uploads/tay.needs.rest/MelodiXLogo.png")
	.setPinnedByDefault(false);

export { Melodix };
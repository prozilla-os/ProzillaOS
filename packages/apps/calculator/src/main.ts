import { App, Vector2 } from "@prozilla-os/core";
import { Calculator } from "./components/Calculator";

const calculator = new App("Calculator", "calculator", Calculator, { size: new Vector2(400, 600) })
	.setIconUrl("https://os.prozilla.dev/assets/apps/icons/calculator.svg")
	.setPinnedByDefault(false)
	.setCategory("Utilities & tools");

export { calculator };
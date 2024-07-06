import { App } from "@prozilla-os/core";
import { LogicSim } from "./components/LogicSim";

const logicSim = new App("Logic Sim", "logic-sim", LogicSim)
	.setIconUrl("https://os.prozilla.dev/assets/apps/icons/logic-sim.svg")
	.setPinnedByDefault(false);

export { logicSim };
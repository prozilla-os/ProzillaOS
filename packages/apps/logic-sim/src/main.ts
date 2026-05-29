import { App } from "@prozilla-os/core";
import { LogicSim } from "./components/LogicSim";
import { Skin, MinimalSkin, PixelSkin } from "@prozilla-os/skins";

const logicSim = new App("Logic Sim", "logic-sim", LogicSim)
	.setIconUrl("https://os.prozilla.dev/assets/apps/icons/logic-sim.svg")
	.setPinnedByDefault(false)
	.setCategory("Education")
	.setSkinOverride(MinimalSkin, { 
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/minimal/apps/icons/logic-sim.svg`,
	})
	.setSkinOverride(PixelSkin, { 
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/pixel/apps/icons/logic-sim.png`,
	});

export { logicSim };
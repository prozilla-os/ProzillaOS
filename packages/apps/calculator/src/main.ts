import { App } from "@prozilla-os/core";
import { Calculator } from "./components/Calculator";
import { Vector2 } from "@prozilla-os/shared";
import { Skin, MacOsSkin, Windows95Skin, MinimalSkin, PixelSkin } from "@prozilla-os/skins";

const calculator = new App("Calculator", "calculator", Calculator, { size: new Vector2(400, 600) })
	.setIconUrl("https://os.prozilla.dev/assets/apps/icons/calculator.svg")
	.setPinnedByDefault(false)
	.setCategory("Utilities & tools")
	.setSkinOverride(MacOsSkin, { 
		name: "Calculator", 
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/mac/apps/icons/calculator.svg`,
	})
	.setSkinOverride(Windows95Skin, { 
		name: "Calculator", 
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/windows95/apps/icons/calculator.svg`,
	})
	.setSkinOverride(MinimalSkin, { 
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/minimal/apps/icons/calculator.svg`,
	})
	.setSkinOverride(PixelSkin, { 
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/pixel/apps/icons/calculator.png`,
	});

export { calculator };
import { Skin } from "@prozilla-os/skins";

const defaultSkin = new Skin({
	baseUrl: "/",
	defaultWallpaper: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/wallpapers/abstract-mesh-gradient-orange-red-purple.png`,
});

export { defaultSkin };
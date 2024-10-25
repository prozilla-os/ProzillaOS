import { Skin } from "@prozilla-os/skins";
import { removeBaseUrl } from "prozilla-os";

const defaultSkin = new Skin({
	defaultWallpaper: "/assets/wallpapers/abstract-mesh-gradient-orange-red-purple.png",
});

function cleanUrls(skin: Skin) {
	skin.systemIcon = removeBaseUrl(skin.systemIcon);
	skin.wallpapers = skin.wallpapers.map((url) => removeBaseUrl(url));
	skin.defaultWallpaper = removeBaseUrl(skin.defaultWallpaper);

	for (const [key, value] of Object.entries(skin.fileIcons)) {
		skin.fileIcons[key as keyof Skin["fileIcons"]] = removeBaseUrl(value);
	}

	for (const [key, value] of Object.entries(skin.folderIcons)) {
		skin.folderIcons[key as keyof Skin["folderIcons"]] = removeBaseUrl(value);
	}
}

cleanUrls(defaultSkin);

export { defaultSkin };
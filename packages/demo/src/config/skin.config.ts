import { Skin } from "@prozilla-os/skins";

export const skin = new Skin({
	wallpapers: [
		"/assets/wallpapers/vibrant-wallpaper-blue-purple-red.png",
		"/assets/wallpapers/abstract-mesh-gradient-orange-red-purple.png",
		"/assets/wallpapers/vibrant-wallpaper-purple-yellow.png",
		"/assets/wallpapers/abstract-wallpaper-mesh-gradient-cyan.png",
		"/assets/wallpapers/colorful-abstract-wallpaper-blue-red-green.png",
		"/assets/wallpapers/mesh-gradient-wallpaper-red-purple.png",
		"/assets/wallpapers/colorful-mesh-gradient-red-green.png",
		"/assets/wallpapers/flame-abstract-wallpaper-orange.png",
		"/assets/wallpapers/wave-abstract-wallpaper-teal.png",
	],
	defaultWallpaper: "/assets/wallpapers/abstract-mesh-gradient-orange-red-purple.png",
	fileIcons: {
		generic: "/assets/apps/file-explorer/icons/file.svg",
		info: "/assets/apps/file-explorer/icons/file-info.svg",
		text: "/assets/apps/file-explorer/icons/file-text.svg",
		code: "/assets/apps/file-explorer/icons/file-code.svg",
	},
	folderIcons: {
		generic: "/assets/apps/file-explorer/icons/folder.svg",
		images: "/assets/apps/file-explorer/icons/folder-images.svg",
		text: "/assets/apps/file-explorer/icons/folder-text.svg",
		link: "/assets/apps/file-explorer/icons/folder-link.svg",
	}
});
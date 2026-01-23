import { SettingsNavPage } from "../SettingsNavPage";
import { ThemeSettings } from "./ThemeSettings";
import { faDesktop, faImage, faPalette } from "@fortawesome/free-solid-svg-icons";
import { WallpaperSettings } from "./WallpaperSettings";
import { DesktopSettings } from "./DesktopSettings";

export function AppearanceSettings() {
	return <SettingsNavPage
		title="Appearance"
		pages={{
			theme: {
				title: "Theme",
				description: "Choose a color palette",
				icon: faPalette,
				Content: ThemeSettings,
			},
			wallpaper: {
				title: "Wallpaper",
				description: "Choose a background image",
				icon: faImage,
				Content: WallpaperSettings,
			},
			desktop: {
				title: "Desktop",
				icon: faDesktop,
				Content: DesktopSettings,
			},
		}}
	></SettingsNavPage>;
}
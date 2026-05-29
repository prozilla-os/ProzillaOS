import { App, AppsConfig } from "@prozilla-os/core";
import { TextEditor, type TextEditorProps } from "./components/TextEditor";
import { Skin, MacOsSkin, Windows95Skin, MinimalSkin, PixelSkin } from "@prozilla-os/skins";

const textEditor = new App<TextEditorProps>("Text Editor", "text-editor", TextEditor)
	.setIconUrl("https://os.prozilla.dev/assets/apps/icons/text-editor.svg")
	.setRole(AppsConfig.APP_ROLES.textEditor)
	.setCategory("Utilities & tools")
	.setSkinOverride(MacOsSkin, { 
		name: "Notes", 
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/mac/apps/icons/text-editor.svg`,
	})
	.setSkinOverride(Windows95Skin, { 
		name: "Notepad", 
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/windows95/apps/icons/text-editor.svg`,
	})
	.setSkinOverride(MinimalSkin, { 
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/minimal/apps/icons/text-editor.svg`,
	})
	.setSkinOverride(PixelSkin, { 
		iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/pixel/apps/icons/text-editor.png`,
	});

export { textEditor, TextEditorProps };
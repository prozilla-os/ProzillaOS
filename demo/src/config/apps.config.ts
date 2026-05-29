import { AppsConfig, browser, calculator, fileExplorer, mediaViewer, settings, terminal, textEditor, appCenter } from "prozilla-os";
import { NAME } from "./branding.config";
import { wordle } from "@prozilla-os/wordle";
import { ballMaze } from "@prozilla-os/ball-maze";
import { minesweeper } from "@prozilla-os/minesweeper";
import { logicSim } from "@prozilla-os/logic-sim";
import { Skin, MacOsSkin, Windows95Skin, MinimalSkin, PixelSkin } from "@prozilla-os/skins";

export const appsConfig = new AppsConfig({
	apps: [
		fileExplorer.setName("Files")
			.setDescription("Browse and manage your virtual files on ProzillaOS.")
			.setIconUrl("/assets/apps/icons/file-explorer.svg")
			.setShowDesktopIcon(true),
		terminal.setName("Commands")
			.setDescription("A command line tool inspired by the Unix shell that runs entirely in your browser using ProzillaOS. Allows you to interact and manipulate the virtual drive and run silly commands.")
			.setIconUrl("/assets/apps/icons/terminal.svg")
			.setShowDesktopIcon(true),
		textEditor.setName("Notes")
			.setDescription("Text editor for reading and writing text documents in a virtual file system using ProzillaOS.")
			.setIconUrl("/assets/apps/icons/text-editor.svg"),
		settings.setName("Settings")
			.setDescription(`Configure ${NAME}'s settings and customize your experience.`)
			.setIconUrl("/assets/apps/icons/settings.svg"),
		mediaViewer.setName("Photos")
			.setIconUrl("/assets/apps/icons/media-viewer.svg"),
		browser.setName("Browser")
			.setDescription("Browse the internet.")
			.setIconUrl("/assets/apps/icons/browser.svg")
			.setShowDesktopIcon(true),
		calculator.setName("Maths")
			.setDescription("Simple calculator app.")
			.setIconUrl("/assets/apps/icons/calculator.svg")
			.setPinnedByDefault(true),
		appCenter.setName("Apps")
			.setDescription(`Browse and install ${NAME} apps.`)
			.setPinnedByDefault(false),
		wordle.setIconUrl("/assets/apps/icons/wordle.svg")
			.setSkinOverride(MacOsSkin, {
				iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/mac/apps/icons/wordle.svg`,
			})
			.setSkinOverride(MinimalSkin, {
				iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/minimal/apps/icons/wordle.svg`,
			})
			.setSkinOverride(PixelSkin, {
				iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/pixel/apps/icons/wordle.png`,
			})
			.setPinnedByDefault(false)
			.setShowDesktopIcon(true),
		ballMaze.setIconUrl("/assets/apps/icons/ball-maze.svg")
			.setSkinOverride(MacOsSkin, {
				iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/mac/apps/icons/ball-maze.svg`,
			})
			.setSkinOverride(MinimalSkin, {
				iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/minimal/apps/icons/ball-maze.svg`,
			})
			.setSkinOverride(PixelSkin, {
				iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/pixel/apps/icons/ball-maze.png`,
			})
			.setPinnedByDefault(false)
			.setShowDesktopIcon(true),
		minesweeper.setIconUrl("/assets/apps/icons/minesweeper.svg")
			.setSkinOverride(MacOsSkin, {
				iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/mac/apps/icons/minesweeper.svg`,
			})
			.setSkinOverride(Windows95Skin, {
				iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/windows95/apps/icons/minesweeper.svg`,
			})
			.setSkinOverride(MinimalSkin, {
				iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/minimal/apps/icons/minesweeper.svg`,
			})
			.setSkinOverride(PixelSkin, {
				iconUrl: `{${Skin.TEMPLATE_KEYS.baseUrl}}/assets/skins/pixel/apps/icons/minesweeper.png`,
			})
			.setPinnedByDefault(false)
			.setShowDesktopIcon(true),
		logicSim.setName("Logic Sim")
			.setDescription("Create digital logic circuits using the online simulator.")
			.setIconUrl("/assets/apps/icons/logic-sim.svg"),
	],
});
import { AppsConfig, browser, calculator, fileExplorer, mediaViewer, settings, terminal, textEditor, appCenter } from "prozilla-os";
import { NAME } from "./branding.config";
import { wordle } from "@prozilla-os/wordle";
import { ballMaze } from "@prozilla-os/ball-maze";
import { minesweeper } from "@prozilla-os/minesweeper";
import { logicSim } from "@prozilla-os/logic-sim";
import { blissRadio } from "@prozilla-os/bliss-radio";
import { Melodix as melodix } from "@taygotfound/melodix";

export const appsConfig = new AppsConfig({
	apps: [
		fileExplorer.setName("Files")
			.setDescription("Browse and manage your virtual files on ProzillaOS.")
			.setIconUrl("/assets/apps/icons/file-explorer.svg"),
		terminal.setName("Commands")
			.setDescription("A command line tool inspired by the Unix shell that runs entirely in your browser using ProzillaOS. Allows you to interact and manipulate the virtual drive and run silly commands.")
			.setIconUrl("/assets/apps/icons/terminal.svg"),
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
			.setIconUrl("/assets/apps/icons/browser.svg"),
		calculator.setName("Maths")
			.setDescription("Simple calculator app.")
			.setIconUrl("/assets/apps/icons/calculator.svg")
			.setPinnedByDefault(true),
		appCenter.setName("Apps")
			.setDescription(`Browse and install ${NAME} apps.`),
		wordle.setIconUrl("/assets/apps/icons/wordle.svg")
			.setPinnedByDefault(false),
		ballMaze.setIconUrl("/assets/apps/icons/ball-maze.svg")
			.setPinnedByDefault(false),
		minesweeper.setIconUrl("/assets/apps/icons/minesweeper.svg")
			.setPinnedByDefault(false),
		logicSim.setName("Logic Sim (WIP)")
			.setDescription("Create digital logic circuits using the online simulator.")
			.setIconUrl("/assets/apps/icons/logic-sim.svg"),
		blissRadio.setName("Bliss Radio")
			.setDescription(`Listen to Bliss Radio on ${NAME}.`),
		melodix.setName("Melodix")
			.setDescription("Listen to music on Melodix."),
	],
});
import { ANSI } from "@prozilla-os/shared";
import { ANSI_ASCII_LOGO, ANSI_LOGO_COLOR } from "../../../constants/shell.const";
import { Command } from "../command";
import { Theme } from "@prozilla-os/skins";
import { Settings } from "../../settings/settings";
import { Shell } from "../shell";

export const neofetch = new Command()
	.setManual({
		purpose: "Fetch system information",
	})
	.setExecute(async function(_arguments, { username, hostname, app, systemManager, settingsManager, stdout }) {
		const leftColumn = ANSI_ASCII_LOGO.split("\n");
		const rightColumnWidth = username.length + hostname.length + 1;

		const themeSetting = await settingsManager.getSettings(Settings.THEME).get("theme");
		const themeIndex = themeSetting.value;
		
		let theme = Theme[Theme.Dark];
		if (themeIndex != null && !isNaN(parseInt(themeIndex))) {
			theme = Theme[parseInt(themeIndex)];
		}

		const userAgent = navigator.userAgent;

		// Check for the browser name using regular expressions
		let browserName;
		if (userAgent.match(/Firefox\//)) {
			browserName = "Mozilla Firefox";
		} else if (userAgent.match(/Edg\//)) {
			browserName = "Microsoft Edge";
		} else if (userAgent.match(/Chrome\//)) {
			browserName = "Google Chrome";
		} else if (userAgent.match(/Safari\//)) {
			browserName = "Apple Safari";
		} else {
			browserName = "Unknown";
		}

		const formatLine = (label: string, text: string) => ANSI.fg.cyan + label.toUpperCase() + ANSI.reset + ": " + text;

		const rightColumn = [
			`${ANSI.fg.cyan + username + ANSI.reset}@${ANSI.fg.cyan + hostname + ANSI.reset}`,
			"-".repeat(rightColumnWidth),
			formatLine("os", systemManager.systemName),
			formatLine("uptime", systemManager.getUptime(2)),
			formatLine("resolution", window.innerWidth + "x" + window.innerHeight),
			formatLine("theme", theme),
			formatLine("icons", "Font Awesome"),
			formatLine("terminal", app?.name ?? "Unknown"),
			formatLine("browser", browserName),
			formatLine("platform", navigator.platform),
			formatLine("language", navigator.language),
			"",
			Object.values(ANSI.fg).map((colorCode) => colorCode + "███").join("") + ANSI.reset,
		];

		const leftHeight = leftColumn.length;
		const rightHeight = rightColumn.length;
		const maxHeight = Math.max(leftHeight, rightHeight);

		const leftOffset = Math.floor((maxHeight - leftHeight) / 2);
		const rightOffset = Math.floor((maxHeight - rightHeight) / 2);

		const logoWidth = Math.max(...leftColumn.map((line) => line.length));

		const combined = [];
		for (let i = 0; i < maxHeight; i++) {
			let line = "";

			const leftIndex = i - leftOffset;
			if (leftIndex >= 0 && leftIndex < leftHeight) {
				const logoLine = leftColumn[leftIndex];
				line += `${ANSI_LOGO_COLOR + logoLine + ANSI.reset}${" ".repeat(logoWidth - logoLine.length + 2)}`;
			} else {
				line += " ".repeat(logoWidth + 2);
			}

			const rightIndex = i - rightOffset;
			if (rightIndex >= 0 && rightIndex < rightHeight) {
				line += rightColumn[rightIndex];
			}

			combined.push(line);
		}

		await Shell.printLn(stdout, combined.join("\n"));
	});
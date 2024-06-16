import { APPS } from "../../../../config/apps.config";
import { ANSI } from "../../../../config/apps/terminal.config";
import { ANSI_ASCII_LOGO, ANSI_LOGO_COLOR, NAME } from "../../../../config/branding.config";
import { THEMES } from "../../../../config/themes.config";
import { TimeManager } from "../../../_utils/time.utils";
import { SettingsManager } from "../../../settings/settingsManager";
import { AppsManager } from "../../appsManager";
import { Command, ExecuteParams } from "../command";

export const neofetch = new Command()
	.setManual({
		purpose: "Fetch system information"
	})
	.setExecute(async function(args, params) {
		const { username, hostname, settingsManager } = params as ExecuteParams;
		const leftColumn = ANSI_ASCII_LOGO.split("\n");
		const rightColumnWidth = (username?.length ?? 0) + (hostname?.length ?? 0) + 1;

		const themeIndex = await settingsManager.getSettings(SettingsManager.VIRTUAL_PATHS.theme).get("theme");
		let theme = THEMES[0] as string;
		if (themeIndex != null && parseInt(themeIndex)) {
			theme = THEMES[(themeIndex as unknown as number) ?? 0] as string ?? THEMES[0];
		}

		const userAgent = navigator.userAgent;

		// Check for the browser name using regular expressions
		let browserName: string;
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
			formatLine("os", NAME),
			formatLine("uptime", TimeManager.getUptime(2)),
			formatLine("resolution", window.innerWidth + "x" + window.innerHeight),
			formatLine("theme", theme),
			formatLine("icons", "Font Awesome"),
			formatLine("terminal", AppsManager.getAppById(APPS.TERMINAL)?.name ?? "Unknown"),
			formatLine("browser", browserName),
			formatLine("platform", navigator.platform),
			formatLine("language", navigator.language),
			"",
			Object.values(ANSI.fg).map((colorCode) => colorCode + "███").join("") + ANSI.reset,
		];

		const combined = [];
		for (let i = 1; i < leftColumn.length; i++) {
			let line = `${ANSI_LOGO_COLOR + leftColumn[i] + ANSI.reset}  `;

			if (i <= rightColumn.length) {
				line += rightColumn[i - 1];
			} else {
				// This fixes a weird display bug on Safari mobile
				line += " ".repeat(rightColumnWidth);
			}

			combined.push(line);
		}

		return combined.join("\n");
	});
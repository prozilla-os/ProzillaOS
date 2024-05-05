import { APPS } from "../../../../config/apps.config.js";
import { ANSI } from "../../../../config/apps/terminal.config.js";
import { ANSI_ASCII_LOGO, ANSI_LOGO_COLOR, NAME } from "../../../../config/branding.config.js";
import { START_DATE } from "../../../../index";
import { formatRelativeTime } from "../../../_utils/date.utils.js";
import AppsManager from "../../appsManager.js";
import Command from "../command";

export const neofetch = new Command()
	.setManual({
		purpose: "Fetch system information"
	})
	.setExecute(function(args, { username, hostname }) {
		const leftColumn = ANSI_ASCII_LOGO.split("\n");
		const rightColumnWidth = username.length + hostname.length + 1;

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

		const formatLine = (label, text) => ANSI.fg.green + label.toUpperCase() + ANSI.reset + ": " + text;

		const rightColumn = [
			`${ANSI.fg.green + username + ANSI.reset}@${ANSI.fg.green + hostname + ANSI.reset}`,
			"-".repeat(rightColumnWidth),
			formatLine("os", NAME),
			formatLine("uptime", formatRelativeTime(START_DATE, 2, false)),
			formatLine("resolution", window.innerWidth + "x" + window.innerHeight),
			formatLine("theme", "default"),
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
import { APPS } from "../../../../constants/applications.js";
import { ASCII_LOGO, NAME } from "../../../../constants/branding.js";
import { START_DATE } from "../../../../index.js";
import { formatRelativeTime } from "../../../utils/date.js";
import AppsManager from "../../applications.js";
import Command from "../command.js";

export const neofetch = new Command("neofetch", (args, { username, hostname }) => {
	const leftColumn = ASCII_LOGO.split("\n");
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

	const rightColumn = [
		`${username}@${hostname}`,
		"-".repeat(rightColumnWidth),
		`OS: ${NAME}`,
		`UPTIME: ${formatRelativeTime(START_DATE, 2, false)}`,
		`RESOLUTION: ${window.innerWidth}x${window.innerHeight}`,
		"THEME: default",
		"ICONS: Font Awesome",
		`TERMINAL: ${AppsManager.getApp(APPS.TERMINAL)?.name ?? "Unknown"}`,
		`BROWSER: ${browserName}`,
		`PLATFORM: ${navigator.platform}`,
		`LANGUAGE: ${navigator.language}`,
	];

	const combined = [];
	for (let i = 1; i < leftColumn.length; i++) {
		let line = `${leftColumn[i]}  `;

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
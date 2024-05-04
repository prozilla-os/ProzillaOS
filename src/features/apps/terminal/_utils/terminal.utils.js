import { ANSI } from "../../../../config/apps/terminal.config.js";

/**
 * @param {string} commandName 
 * @param {string} error 
 * @returns {string}
 */
export function formatError(commandName, error) {
	return `${ANSI.fg.red}${commandName}: ${error}${ANSI.reset}`;
}

/**
 * @param {string} string 
 * @returns {string}
 */
export function removeAnsi(string) {
	// eslint-disable-next-line no-control-regex
	return string.replace(/\u001b\[([0-9]+)m/gm, "");
}
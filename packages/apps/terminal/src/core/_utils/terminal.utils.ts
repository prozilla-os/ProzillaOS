import { ANSI } from "@prozilla-os/core";

export function formatError(commandName: string, error: string): string {
	return `${ANSI.fg.red}${commandName}: ${error}${ANSI.reset}`;
}

export function removeAnsi(string: string): string {
	// eslint-disable-next-line no-control-regex
	return string.replace(/\u001b\[([0-9]+)m/gm, "");
}
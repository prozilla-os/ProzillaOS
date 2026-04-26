// Reference: https://gist.github.com/ConnerWill/d4b6c776b509add763e17f9f113fd25b
/**
 * ANSI escape codes.
 * 
 * @see [ANSI escape code - Wikipedia](https://en.wikipedia.org/wiki/ANSI_escape_code).
 */
export const ANSI = {
	/**
	 * Foreground colors.
	 */
	fg: {
		black: "\u001b[30m",
		red: "\u001b[31m",
		green: "\u001b[32m",
		yellow: "\u001b[33m",
		blue: "\u001b[34m",
		magenta: "\u001b[35m",
		cyan: "\u001b[36m",
		white: "\u001b[37m",
	},
	/**
	 * Background colors.
	 */
	bg: {
		black: "\u001b[40m",
		red: "\u001b[41m",
		green: "\u001b[42m",
		yellow: "\u001b[43m",
		blue: "\u001b[44m",
		magenta: "\u001b[45m",
		cyan: "\u001b[46m",
		white: "\u001b[47m",
	},
	/**
	 * Screen buffer and clearing controls.
	 */
	screen: {
		enterAltBuffer: "\u001b[?1049h",
		exitAltBuffer: "\u001b[?1049l",
		clear: "\u001b[2J",
		clearLine: "\u001b[2K",
		home: "\u001b[H",
	},
	/**
	 * Cursor controls.
	 */
	cursor: {
		/** Changes the position of the cursor. */
		position: (row: number, column: number) => `\x1b[${row};${column}H`,
		hide: "\u001b[?25l",
		show: "\u001b[?25h",
		save: "\u001b[s",
		restore: "\u001b[u",
	},
	/**
	 * Terminal input.
	 */
	input: {
		/** Move cursor up. */
		arrowUp: "\u001b[A",
		/** Move cursor down. */
		arrowDown: "\u001b[B",
		/** Move cursor right. */
		arrowRight: "\u001b[C",
		/** Move cursor left. */
		arrowLeft: "\u001b[D",
		horizontalTab: "\t",
		lineFeed: "\n",
		verticalTab: "\v",
		formFeed: "\f",
		carriageReturn: "\r",
		backspace: "\b",
		delete: "\x7f",
		escape: "\u001b",
		pageUp: "\u001b[5~",
		pageDown: "\u001b[6~",
		ctrlA: "\u0001",
		ctrlB: "\u0002",
		ctrlC: "\u0003",
		ctrlD: "\u0004",
		ctrlE: "\u0005",
		ctrlF: "\u0006",
		ctrlG: "\u0007",
		ctrlH: "\u0008",
		ctrlI: "\u0009",
		ctrlJ: "\u000a",
		ctrlK: "\u000b",
		ctrlL: "\u000c",
		ctrlM: "\u000d",
		ctrlN: "\u000e",
		ctrlO: "\u000f",
		ctrlP: "\u0010",
		ctrlQ: "\u0011",
		ctrlR: "\u0012",
		ctrlS: "\u0013",
		ctrlT: "\u0014",
		ctrlU: "\u0015",
		ctrlV: "\u0016",
		ctrlW: "\u0017",
		ctrlX: "\u0018",
		ctrlY: "\u0019",
		ctrlZ: "\u001a",
	},
	/**
	 * Decorations.
	 */
	decoration: {
		dim: "\u001b[2m",
		bold: "\u001b[1m",
		italic: "\u001b[3m",
		underline: "\u001b[4m",
		blink: "\u001b[5m",
		invert: "\u001b[7m",
		strike: "\u001b[9m",
	},
	reset: "\u001b[0m",
} as const;
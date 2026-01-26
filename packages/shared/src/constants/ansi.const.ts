/**
 * ANSI escape codes
 * 
 * @see [ANSI escape code - Wikipedia](https://en.wikipedia.org/wiki/ANSI_escape_code)
 */
export const ANSI = {
	/**
	 * Foreground colors
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
	 * Background colors
	 */
	bg: {

	},
	/**
	 * Decorations
	 */
	decoration: {
		dim: "\u001b[2m",
		bold: "\u001b[1m",
	},
	reset: "\u001b[0m",
};
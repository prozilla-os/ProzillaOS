export const USERNAME = "user";
export const HOSTNAME = "prozilla-os";
export const MAX_WIDTH = 50;

export const ANSI = {
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
	bg: {

	},
	decoration: {
		dim: "\u001b[2m",
	},
	reset: "\u001b[0m",
};

export const WELCOME_MESSAGE = `${ANSI.fg.cyan + ANSI.decoration.dim}$APP_NAME - Made by Prozilla${ANSI.reset}`
	+ `\n${ANSI.decoration.dim}Type 'help' for a list of commands.${ANSI.reset}\n`;

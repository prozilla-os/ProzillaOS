import { ANSI } from "../../constants";

/**
 * Provides utility functions for wrapping text in ANSI escape codes.
 * 
 * @see {@link ANSI}
 * @hideconstructor
 */
export class Ansi {

	/**
	 * Makes text black using {@link ANSI.fg.black}.
	 */
	static black(text: string) {
		return this.#apply(text, ANSI.fg.black);
	}

	/**
	 * Makes text red using {@link ANSI.fg.red}.
	 */
	static red(text: string) {
		return this.#apply(text, ANSI.fg.red);
	}

	/**
	 * Makes text green using {@link ANSI.fg.green}.
	 */
	static green(text: string) {
		return this.#apply(text, ANSI.fg.green);
	}

	/**
	 * Makes text yellow using {@link ANSI.fg.yellow}.
	 */
	static yellow(text: string) {
		return this.#apply(text, ANSI.fg.yellow);
	}

	/**
	 * Makes text blue using {@link ANSI.fg.blue}.
	 */
	static blue(text: string) {
		return this.#apply(text, ANSI.fg.blue);
	}

	/**
	 * Makes text magenta using {@link ANSI.fg.magenta}.
	 */
	static magenta(text: string) {
		return this.#apply(text, ANSI.fg.magenta);
	}

	/**
	 * Makes text cyan using {@link ANSI.fg.cyan}.
	 */
	static cyan(text: string) {
		return this.#apply(text, ANSI.fg.cyan);
	}

	/**
	 * Makes text white using {@link ANSI.fg.white}.
	 */
	static white(text: string) {
		return this.#apply(text, ANSI.fg.white);
	}

	/**
	 * Sets background to black using {@link ANSI.bg.black}.
	 */
	static blackBackground(text: string) {
		return this.#apply(text, ANSI.bg.black);
	}

	/**
	 * Sets background to red using {@link ANSI.bg.red}.
	 */
	static redBackground(text: string) {
		return this.#apply(text, ANSI.bg.red);
	}

	/**
	 * Sets background to green using {@link ANSI.bg.green}.
	 */
	static greenBackground(text: string) {
		return this.#apply(text, ANSI.bg.green);
	}

	/**
	 * Sets background to yellow using {@link ANSI.bg.yellow}.
	 */
	static yellowBackground(text: string) {
		return this.#apply(text, ANSI.bg.yellow);
	}

	/**
	 * Sets background to blue using {@link ANSI.bg.blue}.
	 */
	static blueBackground(text: string) {
		return this.#apply(text, ANSI.bg.blue);
	}

	/**
	 * Sets background to magenta using {@link ANSI.bg.magenta}.
	 */
	static magentaBackground(text: string) {
		return this.#apply(text, ANSI.bg.magenta);
	}

	/**
	 * Sets background to cyan using {@link ANSI.bg.cyan}.
	 */
	static cyanBackground(text: string) {
		return this.#apply(text, ANSI.bg.cyan);
	}

	/**
	 * Sets background to white using {@link ANSI.bg.white}.
	 */
	static whiteBackground(text: string) {
		return this.#apply(text, ANSI.bg.white);
	}

	/**
	 * Makes text bold using {@link ANSI.decoration.bold}.
	 */
	static bold(text: string) {
		return this.#apply(text, ANSI.decoration.bold);
	}

	/**
	 * Makes text dim using {@link ANSI.decoration.dim}.
	 */
	static dim(text: string) {
		return this.#apply(text, ANSI.decoration.dim);
	}

	/**
	 * Makes text italic using {@link ANSI.decoration.italic}.
	 */
	static italic(text: string) {
		return this.#apply(text, ANSI.decoration.italic);
	}

	/**
	 * Underlines text using {@link ANSI.decoration.underline}.
	 */
	static underline(text: string) {
		return this.#apply(text, ANSI.decoration.underline);
	}

	/**
	 * Inverts foreground and background colors using {@link ANSI.decoration.invert}.
	 */
	static invert(text: string) {
		return this.#apply(text, ANSI.decoration.invert);
	}

	/**
	 * Makes text strike through using {@link ANSI.decoration.strike}.
	 */
	static strike(text: string) {
		return this.#apply(text, ANSI.decoration.strike);
	}

	static #apply(text: string, code: string) {
		text = text.replaceAll(ANSI.reset, ANSI.reset + code);
		return code + text + ANSI.reset;
	}

	/**
	 * Removes all ANSI escape sequences.
	 */
	static strip(text: string) {
		// eslint-disable-next-line no-control-regex
		return text.replace(/\u001b\[[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "");
	}

	/**
	 * Removes ANSI escape sequences for colors and background colors (SGR).
	 */
	static stripColors(text: string) {
		// eslint-disable-next-line no-control-regex
		return text.replace(/\u001b\[[0-9;]*m/g, "");
	}
}
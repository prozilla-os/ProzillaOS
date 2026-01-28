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
		return Ansi.#apply(text, ANSI.fg.black);
	}

	/**
	 * Makes text red using {@link ANSI.fg.red}.
	 */
	static red(text: string) {
		return Ansi.#apply(text, ANSI.fg.red);
	}

	/**
	 * Makes text green using {@link ANSI.fg.green}.
	 */
	static green(text: string) {
		return Ansi.#apply(text, ANSI.fg.green);
	}

	/**
	 * Makes text yellow using {@link ANSI.fg.yellow}.
	 */
	static yellow(text: string) {
		return Ansi.#apply(text, ANSI.fg.yellow);
	}

	/**
	 * Makes text blue using {@link ANSI.fg.blue}.
	 */
	static blue(text: string) {
		return Ansi.#apply(text, ANSI.fg.blue);
	}

	/**
	 * Makes text magenta using {@link ANSI.fg.magenta}.
	 */
	static magenta(text: string) {
		return Ansi.#apply(text, ANSI.fg.magenta);
	}

	/**
	 * Makes text cyan using {@link ANSI.fg.cyan}.
	 */
	static cyan(text: string) {
		return Ansi.#apply(text, ANSI.fg.cyan);
	}

	/**
	 * Makes text white using {@link ANSI.fg.white}.
	 */
	static white(text: string) {
		return Ansi.#apply(text, ANSI.fg.white);
	}

	/**
	 * Makes text bold using {@link ANSI.decoration.bold}.
	 */
	static bold(text: string) {
		return Ansi.#apply(text, ANSI.decoration.bold);
	}

	/**
	 * Makes text dim using {@link ANSI.decoration.dim}.
	 */
	static dim(text: string) {
		return Ansi.#apply(text, ANSI.decoration.dim);
	}

	static #apply(text: string, code: string) {
		return code + text + ANSI.reset;
	}

}
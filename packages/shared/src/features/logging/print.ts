import { Ansi } from "./ansi";

/**
 * @param text The text to format
 * @returns The formatted text
 */
export type Formatter = (text: string) => string;

/**
 * Provides utility functions for printing formatted text to the console
 * @hideconstructor
 */
export class Print {

	/**
	 * The current level of indentation
	 * @default 0
	 */
	static indent: number;

	/**
	 * The function to use when highlighting text
	 * @default Ansi.cyan
	 * @see {@link Ansi.cyan}
	 */
	static highlight: Formatter;

	/**
	 * The function to use when emphasizing text
	 * @default Ansi.bold
	 * @see {@link Ansi.bold}
	 */
	static emphasize: Formatter;

	/**
	 * The prefix to prepend to all printed lines
	 */
	static prefix?: string;

	/**
	 * The prefix to prepend to status messages
	 */
	static statusPrefix?: string;

	/**
	 * The prefix to prepend to error messages
	 * @default Ansi.red("[error]")
	 * @see {@link Ansi.red}
	 */
	static errorPrefix?: string;

	/**
	 * The prefix to prepend to warning messages
	 * @default Ansi.yellow("[warning]")
	 * @see {@link Ansi.yellow}
	 */
	static warningPrefix?: string;

	/**
	 * The prefix to prepend to info messages
	 * @default Ansi.cyan("[info]")
	 * @see {@link Ansi.cyan}
	 */
	static infoPrefix?: string;

	/**
	 * The prefix to prepend to success messages
	 * @default Ansi.green("[success]")
	 * @see {@link Ansi.green}
	 */
	static successPrefix?: string;

	static {
		this.reset();
	}

	// ===== Modifying printer state =====

	/**
	 * Resets all printer properties to their default values
	 */
	static reset() {
		this.indent = 0;

		this.highlight = Ansi.cyan;
		this.emphasize = Ansi.bold;
		
		this.errorPrefix = Ansi.red("[error]");
		this.warningPrefix = Ansi.yellow("[warning]");
		this.infoPrefix = Ansi.cyan("[info]");
		this.successPrefix = Ansi.green("[success]");
		return this;
	}

	/**
	 * Calls a function while the level of indentation is increased
	 * 
	 * Increases the level of indentation, then calls the function and finally restores the indentation.
	 * @param callback The function to call
	 * @param indentation The amount of indentation to use
	 */
	static indented(callback: () => void, indentation?: number): typeof Print
	/**
	 * Prints every line while the level of indentation is increased
	 * 
	 * Increases the level of indentation, then prints every line and finally restores the indentation.
	 * @param lines The lines to print
	 * @param indentation The amount of indentation to use
	 */
	static indented(lines: unknown[], indentation?: number): typeof Print
	/**
	 * Prints a message while the level of indentation is increased
	 * 
	 * Increases the level of indentation, then prints the message and finally restores the indentation.
	 * @param message The message to print
	 * @param indentation The amount of indentation to use
	 */
	static indented(message: unknown, indentation?: number): typeof Print
	static indented(callbackOrMessage: unknown, indentation = 1): typeof Print {
		// Avoid side effects of negative indentation 
		if (this.indent + indentation < 0)
			indentation = -this.indent;

		this.tab(indentation);
		if (typeof callbackOrMessage === "function") {
			callbackOrMessage();
		} else if (Array.isArray(callbackOrMessage)) {
			this.lines(callbackOrMessage);
		} else {
			this.text(String(callbackOrMessage));
		}
		this.shiftTab(indentation);
		return this;
	}

	/**
	 * Increases the level of indentation
	 * @param amount The amount to increase the level of indentation with
	 */
	static tab(amount = 1) {
		this.indent += amount;
		if (this.indent < 0) this.indent = 0;
		return this;
	}

	/**
	 * Decreases the level of indentation
	 * @param amount The amount to decrease the level of indentation with
	 */
	static shiftTab(amount = 1) {
		this.indent -= amount;
		if (this.indent < 0) this.indent = 0;
		return this;
	}

	/**
	 * Sets the prefixes to prepend to printed lines
	 * @param prefixes The prefixes to use
	 */
	static setPrefixes(prefixes: {
		/** {@inheritDoc Print.prefix} */
		prefix?: typeof Print["prefix"],
		/** {@inheritDoc Print.statusPrefix} */
		statusPrefix?: typeof Print["statusPrefix"],
		/** {@inheritDoc Print.errorPrefix} */
		errorPrefix?: typeof Print["errorPrefix"],
		/** {@inheritDoc Print.infoPrefix} */
		infoPrefix?: typeof Print["infoPrefix"],
		/** {@inheritDoc Print.successPrefix} */
		successPrefix?: typeof Print["successPrefix"],
	}) {
		this.prefix = prefixes.prefix;
		this.statusPrefix = prefixes.statusPrefix;
		this.errorPrefix = prefixes.errorPrefix;
		this.infoPrefix = prefixes.infoPrefix;
		this.successPrefix = prefixes.successPrefix;
		return this;
	}

	// ===== Printing status messages =====

	/**
	 * Prints a status message about a URL being fetched
	 * @param url The URL being fetched
	 */
	static fetching(url: string) {
		return this.pending(`Fetching: ${this.highlight(url)}`);
	}

	/**
	 * Prints a status message that implies a pending state
	 * @param message The status message
	 */
	static pending(message: string) {
		return this.text(Ansi.yellow(message));
	}

	/**
	 * Prints an error message
	 * @param message The error message or reason
	 * @param details The details of the error message
	 */
	static error(message: unknown, ...details: unknown[]) {
		if (typeof message === "string") {
			console.error(Print.#format(Print.#applyPrefix(this.errorPrefix, message)));
		} else {
			console.error(message);
		}

		if (details.length) {
			this.indented(() => {
				for (const detail of details) {
					console.error(Print.#format(String(detail)));
				}
			});
		}

		return this;
	}

	/**
	 * Prints a warning message
	 * @param message The warning message
	 * @param details The details of the warning message
	 */
	static warning(message: string, ...details: unknown[]) {
		return Print.#statusMessage(message, details, this.warningPrefix);
	}

	/**
	 * Prints a success message
	 * @param message The success message
	 * @param details The details of the success message
	 */
	static success(message: string, ...details: unknown[]) {
		return Print.#statusMessage(message, details, this.successPrefix);
	}

	/**
	 * Prints an info message
	 * @param message The info message
	 * @param details The details of the info message
	 */
	static info(message: string, ...details: unknown[]) {
		return Print.#statusMessage(message, details, this.infoPrefix);
	}

	static #statusMessage(message: string, details: unknown[], prefix?: string) {
		this.text(Print.#applyPrefix(prefix, message));
		if (details.length) {
			this.indented(details);
		}
		return this;
	}

	// ===== Printing text =====

	/**
	 * Prints a labeled parameter
	 * 
	 * The value is emphasized using {@link emphasize}.
	 * @param label The label of the parameter
	 * @param value The value of the parameter
	 */
	static parameter(label: string, value: unknown) {
		return this.text(`${label}: ${this.emphasize(String(value))}`);
	}

	/**
	 * Prints properties as a list of key-value pairs
	 * @param properties The properties to print
	 * @see {@link value()}
	 */
	static properties(properties: Record<string, unknown>) {
		for (const [key, value] of Object.entries(properties)) {
			this.value(`- ${key}`, value);
		}
	}

	/**
	 * Prints a labeled value
	 * 
	 * The value is highlighted using {@link highlight}.
	 * @param label The label of the value
	 * @param value The value
	 */
	static value(label: string, value: unknown) {
		return this.text(`${label}: ${this.highlight(String(value))}`);
	}

	/**
	 * Prints emphasized text
	 * @param text The text to print
	 */
	static emphasized(text: string) {
		return this.text(this.emphasize(text));
	}

	/**
	 * Prints highlighted text
	 * @param text The text to print
	 */
	static highlighted(text: string) {
		return this.text(this.highlight(text));
	}

	/**
	 * Prints each item on a new line
	 * @param lines The lines to print
	 */
	static lines(lines: unknown[]) {
		lines.map(String).forEach(this.text);
		return this;
	}

	/**
	 * Prints text using the printer's format
	 * @param text The text to print
	 */
	static text(text: string) {
		console.log(Print.#format(text));
		return this;
	}

	/**
	 * Prints an newline character
	 */
	static newLine() {
		console.log("\n");
		return this;
	}

	// ===== Formatting strings =====

	/**
	 * Formats text based on the current printer state so that it is ready to be printed
	 */
	static #format(text: string) {
		return Print.#applyPrefix(this.prefix, "\t".repeat(this.indent) + text);
	}

	/**
	 * Prepends a prefix to text
	 */
	static #applyPrefix(prefix: string | undefined, text: string) {
		return prefix ? `${prefix} ${text}` : text;
	}

}
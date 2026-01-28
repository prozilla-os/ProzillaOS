import { Ansi } from "./ansi";

/**
 * Applies a format to a string.
 * @param text - The text to format.
 * @returns The formatted text.
 */
export type Formatter = (text: string) => string;

export enum LogLevel {
	Debug,
	Info,
	Success,
	Warning,
	Error
};

/**
 * A simple wrapper for {@link console} that logs formatted text and supports log levels.
 */
export class Logger {

	/**
	 * The minimum log level or an array of log levels to enable.
	 * 
	 * `undefined` enables all log levels. An array enables all log levels in that array. A single level enables that log level and the ones above.
	 * @default LogLevel.Debug
	 */
	level?: LogLevel | LogLevel[];

	/**
	 * The current level of indentation.
	 * @default 0
	 */
	indent: number = 0;

	/**
	 * The string to use for indentation.
	 * @default "\t"
	 */
	indentString?: string;

	/**
	 * The function to use when highlighting text.
	 * @default Ansi.cyan
	 * @see {@link Ansi.cyan}
	 */
	highlight: Formatter = Ansi.cyan;

	/**
	 * The function to use when emphasizing text.
	 * @default Ansi.bold
	 * @see {@link Ansi.bold}
	 */
	emphasize: Formatter = Ansi.bold;

	/**
	 * The prefixes to prepend to logs.
	 * @default {
	[LogLevel.Info]: Ansi.cyan("[info]"),
	[LogLevel.Success]: Ansi.green("[success]"),
	[LogLevel.Warning]: Ansi.yellow("[warning]"),
	[LogLevel.Error]: Ansi.red("[error]"),
}
	 */
	prefix: {
		[key in LogLevel | "global"]?: string
	} = {};

	constructor(options?: {
		/** {@inheritDoc Logger.level}. */
		level?: Logger["level"],
		/** 
		 * The prefix(es) to prepend to logs.
		 * 
		 * Does not override default prefixes unless specified.
		*/
		prefix?: Logger["prefix"] | string
	})
	/**
	 * @param level - The minimum log level.
	 */
	constructor(level: LogLevel)
	/**
	 * @param levels - The log levels to enable.
	 */
	constructor(levels: LogLevel[])
	constructor(options?: LogLevel | LogLevel[] | { level?: Logger["level"], prefix?: Logger["prefix"] | string }) {
		this.reset();

		if (options === undefined)
			return;

		if (Array.isArray(options) || typeof options === "number") {
			this.level = options;
		} else {
			if (options.level !== undefined)
				this.level = options.level;
			if (options.prefix) {
				if (typeof options.prefix === "string") {
					this.prefix.global = options.prefix;
				} else {
					this.prefix = {
						...this.prefix,
						...options.prefix,
					};
				}
			}
		}
	}

	// ===== Modifying state =====

	/**
	 * Resets all properties to their default values.
	 */
	reset(): this {
		this.level = LogLevel.Debug;

		this.indent = 0;
		this.indentString = "\t";

		this.highlight = Ansi.cyan;
		this.emphasize = Ansi.bold;

		this.prefix = {
			[LogLevel.Info]: Ansi.cyan("[info]"),
			[LogLevel.Success]: Ansi.green("[success]"),
			[LogLevel.Warning]: Ansi.yellow("[warning]"),
			[LogLevel.Error]: Ansi.red("[error]"),
		};

		return this;
	}

	/**
	 * Calls a function while the level of indentation is increased.
	 * 
	 * Increases the level of indentation, then calls the function and finally restores the indentation.
	 * @param callback - The function to call.
	 * @param indentation - The amount of indentation to use.
	 */
	indented(callback: () => void, indentation?: number): this
	/**
	 * Logs every line while the level of indentation is increased.
	 * 
	 * Increases the level of indentation, then logs every line and finally restores the indentation.
	 * @param lines - The lines to log.
	 * @param indentation - The amount of indentation to use.
	 * @param level - The log level.
	 */
	indented(lines: unknown[], indentation?: number, level?: LogLevel): this
	/**
	 * Logs a message while the level of indentation is increased.
	 * 
	 * Increases the level of indentation, then logs the message and finally restores the indentation.
	 * @param message - The message to log.
	 * @param indentation - The amount of indentation to use.
	 * @param level - The log level.
	 */
	indented(message: unknown, indentation?: number, level?: LogLevel): this
	indented(callbackOrMessage: unknown, indentation = 1, level?: LogLevel): this {
		if (level !== undefined && !this.isLevelEnabled(level))
			return this;

		// Avoid side effects of negative indentation 
		if (this.indent + indentation < 0)
			indentation = -this.indent;

		this.tab(indentation);
		if (typeof callbackOrMessage === "function") {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			callbackOrMessage();
		} else if (Array.isArray(callbackOrMessage)) {
			this.lines(callbackOrMessage, level);
		} else {
			this.log(callbackOrMessage, level);
		}
		this.shiftTab(indentation);
		return this;
	}

	/**
	 * Increases the level of indentation.
	 * @param amount - The amount to increase the level of indentation with.
	 */
	tab(amount = 1): this {
		this.indent += amount;
		if (this.indent < 0) this.indent = 0;
		return this;
	}

	/**
	 * Decreases the level of indentation.
	 * @param amount - The amount to decrease the level of indentation with.
	 */
	shiftTab(amount = 1): this {
		this.indent -= amount;
		if (this.indent < 0) this.indent = 0;
		return this;
	}

	/**
	 * Sets the prefix to prepend to all logs.
	 * @param prefix - The prefix to use.
	 */
	setPrefix(prefix: string): this
	/**
	 * Sets the prefixes to prepend to logs.
	 * 
	 * Will override any existing prefixes.
	 * @param prefixes - The prefixes to use.
	 */
	setPrefix(prefixes: Logger["prefix"]): this
	/**
	 * Sets the prefix to prepend to logs at a given log level.
	 * @param level - The log level.
	 * @param prefix - The prefix to use.
	 */
	setPrefix(level: LogLevel, prefix: string): this
	setPrefix(prefixOrLevel: Logger["prefix"] | string | LogLevel, prefix?: string): this {
		if (typeof prefixOrLevel === "string") {
			this.prefix = {
				global: prefixOrLevel,
			};
		} else if (typeof prefixOrLevel === "object") {
			this.prefix = prefixOrLevel;			
		} else {
			this.prefix[prefixOrLevel] = prefix;
		}
		return this;
	}

	// ===== Logging status messages =====

	/**
	 * Logs an info message about a URL being fetched.
	 * @param url - The URL being fetched.
	 */
	fetching(url: string): this {
		return this.pending(`Fetching: ${this.highlight(url)}`);
	}

	/**
	 * Logs an info message that implies a pending state.
	 * @param message - The status message.
	 */
	pending(message: string): this {
		return this.info(Ansi.yellow(message));
	}

	/**
	 * Logs an error message.
	 * @param message - The error message or reason.
	 * @param details - The details of the error message.
	 */
	error(message: unknown, ...details: unknown[]): this {
		if (!this.isLevelEnabled(LogLevel.Error))
			return this;

		if (typeof message === "string") {
			this.statusMessage(Ansi.red(message), details, LogLevel.Error);
		} else {
			console.error(message, ...details);
		}

		return this;
	}

	/**
	 * Logs a warning message.
	 * @param message - The warning message.
	 * @param details - The details of the warning message.
	 */
	warn(message: string, ...details: unknown[]): this {
		return this.statusMessage(Ansi.yellow(message), details, LogLevel.Warning);
	}

	/**
	 * Logs a success message.
	 * @param message - The success message.
	 * @param details - The details of the success message.
	 */
	success(message: string, ...details: unknown[]): this {
		return this.statusMessage(Ansi.green(message), details, LogLevel.Success);
	}

	/**
	 * Logs an info message.
	 * @param message - The info message.
	 * @param details - The details of the info message.
	 */
	info(message: string, ...details: unknown[]): this {
		return this.statusMessage(message, details, LogLevel.Info);
	}

	/**
	 * Logs a status message.
	 * @param message - The status message.
	 * @param details - The details of the status message.
	 * @param level - The log level.
	 */
	statusMessage(message: string, details: unknown[], level?: LogLevel): this {
		let text = message;

		// Append details on new indented lines below message
		if (details.length) {
			const detailsPrefix = this.indentString ? this.indentString.repeat(this.indent + 1) : "\t";
			text += "\n" + details.map((detail) => detailsPrefix + String(detail)).join("\n");
		}

		return this.text(text, level);
	}

	// ===== Logging text =====

	/**
	 * Logs a labeled parameter.
	 * 
	 * The value is emphasized using {@link emphasize}.
	 * @param label - The label of the parameter.
	 * @param value - The value of the parameter.
	 * @param level - The log level.
	 */
	parameter(label: string, value: unknown, level?: LogLevel): this {
		return this.text(`${label}: ${this.emphasize(String(value))}`, level);
	}

	/**
	 * Logs properties as a list of key-value pairs.
	 * @param properties - The properties to log.
	 * @param level - The log level.
	 * @see {@link value()}
	 */
	properties(properties: Record<string, unknown>, level?: LogLevel): this {
		for (const [key, value] of Object.entries(properties)) {
			this.value(`- ${key}`, value, level);
		}
		return this;
	}

	/**
	 * Logs a labeled value.
	 * 
	 * The value is highlighted using {@link highlight}.
	 * @param label - The label of the value.
	 * @param value - The value.
	 * @param level - The log level.
	 */
	value(label: string, value: unknown, level?: LogLevel): this {
		return this.text(`${label}: ${this.highlight(String(value))}`, level);
	}

	/**
	 * Logs emphasized text.
	 * @param text - The text to log.
	 * @param level - The log level.
	 */
	emphasized(text: string, level?: LogLevel): this {
		return this.text(this.emphasize(text), level);
	}

	/**
	 * Logs highlighted text.
	 * @param text - The text to log.
	 * @param level - The log level.
	 */
	highlighted(text: string, level?: LogLevel): this {
		return this.text(this.highlight(text), level);
	}

	/**
	 * Logs each item on a new line.
	 * @param lines - The items to log.
	 * @param level - The log level.
	 */
	lines(lines: unknown[], level?: LogLevel): this {
		lines.map(String).forEach((line) => this.text(line, level));
		return this;
	}

	/**
	 * Logs a message.
	 * @param message - The message to log.
	 * @param level - The log level.
	 */
	log(message: unknown, level?: LogLevel): this {
		return this.text(String(message), level);
	}

	/**
	 * Logs text using this logger's format.
	 * @param text - The text to log.
	 * @param level - The log level.
	 */
	text(text: string, level: LogLevel = LogLevel.Debug): this {
		if (!this.isLevelEnabled(level))
			return this;

		const message = this.format(this.applyPrefix(text, level));
		switch (level) {
			case LogLevel.Info:
				console.info(message);
				break;
			case LogLevel.Warning:
				console.warn(message);
				break;
			case LogLevel.Error:
				console.error(message);
				break;
			default:
				console.log(message);
				break;
		}
		return this;
	}

	/**
	 * Logs an newline character.
	 */
	newLine(): this {
		console.log("\n");
		return this;
	}

	/**
	 * Checks if the given log level is enabled.
	 * @param level - The log level to check.
	 */
	isLevelEnabled(level: LogLevel) {
		if (this.level === undefined)
			return true;

		return Array.isArray(this.level)
			? this.level.includes(level)
			: this.level <= level;
	}

	// ===== Formatting strings =====

	/**
	 * Formats text using this logger's formatting properties.
	 * @param text - The text to format.
	 */
	format(text: string) {
		if (this.indentString) {
			return this.applyPrefix(this.indentString.repeat(this.indent) + text);
		} else {
			return this.applyPrefix(text);
		}
	}

	/**
	 * Prepends a prefix to text.
	 * @param text - The text to apply the prefix to.
	 * @param level - The log level.
	 */
	applyPrefix(text: string, level?: LogLevel) {
		const prefix = level ? this.prefix[level] : this.prefix.global;
		return prefix ? `${prefix} ${text}` : text;
	}

}
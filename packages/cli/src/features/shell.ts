import { AppsConfig, DesktopConfig, EXIT_CODE, HistoryFlags, MiscConfig, ModalsConfig, SettingsManager, Shell, Stream, SystemManager, SystemManagerParams, TaskbarConfig, TrackingConfig, Vector2, VirtualDriveConfig, VirtualRoot, WindowsConfig } from "@prozilla-os/core";
import { ANSI, BASE_URL } from "@prozilla-os/shared";
import { emitKeypressEvents, Key } from "node:readline";
import { subscribe } from "valtio/vanilla";
import { DOMParser, XMLSerializer } from "@xmldom/xmldom";

const CLEAR_ROW = ANSI.input.carriageReturn + ANSI.screen.clearLine;
const CLEAR_SCREEN = ANSI.screen.clear + ANSI.screen.home;

const KEY_MAP: Partial<Record<string, string>> = {
	return: "Enter",
	tab: "Tab",
	backspace: "Backspace",
	delete: "Delete",
	up: "ArrowUp",
	down: "ArrowDown",
	left: "ArrowLeft",
	right: "ArrowRight",
	escape: "Escape",
};

class HeadlessSystemManager extends SystemManager {

	constructor(params: Partial<SystemManagerParams> = {}) {
		super({
			systemName: params.systemName ?? null,
			tagLine: params.tagLine ?? null,
			appsConfig: params.appsConfig ?? new AppsConfig(),
			desktopConfig: params.desktopConfig ?? new DesktopConfig(),
			miscConfig: params.miscConfig ?? new MiscConfig(),
			modalsConfig: params.modalsConfig ?? new ModalsConfig(),
			taskbarConfig: params.taskbarConfig ?? new TaskbarConfig(),
			trackingConfig: params.trackingConfig ?? new TrackingConfig(),
			windowsConfig: params.windowsConfig ?? new WindowsConfig(),
			virtualDriveConfig: params.virtualDriveConfig ?? new VirtualDriveConfig({
				defaultData: {
					includeAppsFolder: true,
					includeDesktopFolder: true,
					includeDocumentsFolder: true,
					includePicturesFolder: true,
					includeSourceTree: false,
				},
				saveData: false,
			}),
		});
	}

}

class HeadlessVirtualRoot extends VirtualRoot {

	constructor(systemManager: SystemManager) {
		super(systemManager);
		this.init();
	}

	override readSource(source: string): Promise<string | null> {
		if (source.startsWith("/")) {
			source = BASE_URL + source.slice(1);
		}
		return super.readSource(source);
	}

}

function getTerminalSize() {
	return new Vector2(process.stdout.columns || 0, process.stdout.rows || 0);
}

/**
 * A headless Posh shell.
 * @example
 * const shell = new HeadlessShell();
 * const input = process.argv.slice(2).map(Shell.quote).join(" ");
 *
 * const exitCode = await shell.start(input);
 * process.exit(exitCode);
 */
export class HeadlessShell extends Shell {

	#isInteractive = false;
	#isCursorVisible = true;
	#onExit = () => {};

	constructor() {
		Object.assign(globalThis, { DOMParser, XMLSerializer });
		
		const systemManager = new HeadlessSystemManager();
		const virtualRoot = new HeadlessVirtualRoot(systemManager);
		const settingsManager = new SettingsManager(virtualRoot, false);
		
		super({
			virtualRoot,
			systemManager,
			settingsManager,
			exit: () => {
				if (this.state.isUsingAltScreen)
					process.stdout.write(ANSI.screen.exitAltBuffer);
				this.setTTYRawMode(false);
				if (this.isInteractive)
					process.stdout.write(CLEAR_ROW);
				this.#onExit();
			},
			sizeRef: {
				current: getTerminalSize(),
			},
		});

		process.on("exit", () => {
			if (!this.isCursorVisible)
				process.stdout.write(ANSI.cursor.show);
		});
		
		process.stdout.on("resize", () => {
			const size = getTerminalSize();
			this.config.sizeRef.current.set(size.x, size.y);
		});
	}

	/**
	 * Executes the given command string or starts interactive mode if the command string is empty.
	 * @param input - The input string.
	 * @returns The exit code.
	 */
	public async start(input?: string): Promise<number> {
		return input !== undefined && input.length !== 0 ? await this.startCommand(input) : await this.startInteractiveMode();
	}

	/**
	 * Executes the given command string.
	 * @param input - The input string.
	 * @returns The exit code.
	 */
	public async startCommand(input: string): Promise<number> {
		this.#onExit = () => {};
		this.#isInteractive = false;

		const stdin = new Stream();
		const stdout = new Stream();
		const stderr = new Stream();

		stdout.on(Stream.DATA_EVENT, (data: string) => {
			if (data.includes(ANSI.screen.enterAltBuffer))
				this.setCursorVisible(false);

			process.stdout.write(data);

			if (data.includes(ANSI.screen.exitAltBuffer))
				this.setCursorVisible(true);
		});
	
		stderr.on(Stream.DATA_EVENT, (data: string) => {
			process.stderr.write(data);
		});

		const isTTY = process.stdin.isTTY;
		this.setTTYRawMode(true);

		const handleInput = (chunk: Buffer) => {
			const text = chunk.toString();

			if (isTTY && text === ANSI.input.ctrlC) {
				this.interrupt();
			} else if (isTTY && text === ANSI.input.ctrlD) {
				stdin.end();
			} else {
				void stdin.write(text);
			}
		};

		const handleEnd = () => stdin.end();

		process.stdin.on("data", handleInput);
		process.stdin.on("end", handleEnd);

		const exitCode = await this.interpreter.execute(input, {
			stdin,
			stdout,
			stderr,
		});

		this.setTTYRawMode(false);
		process.stdin.pause();

		return new Promise((resolve) => {
			// Clean up and exit
			process.stdout.write("", () => {
				process.stdin.off("data", handleInput);
				process.stdin.off("end", handleEnd);
				resolve(exitCode);
			});
		});
	}

	/**
	 * Starts interactive mode.
	 * @returns The exit code.
	 */
	public async startInteractiveMode(): Promise<number> {
		this.#onExit = () => {};
		this.#isInteractive = true;

		if (!process.stdin.isTTY) {
			process.stderr.write("Interactive mode requires an interactive terminal.\n");
			return EXIT_CODE.generalError;
		}

		emitKeypressEvents(process.stdin);
		process.stdin.setRawMode(true);

		let writtenEntries = 0;
		let wasUsingAltScreen = false;

		const render = () => {
			const { history, isUsingAltScreen, isRawMode, cursorPosition, stream, ttyBuffer, prompt, line } = this.state;

			const showCursor = isRawMode || !isUsingAltScreen && stream == null;

			if (!showCursor)
				this.setCursorVisible(false);

			if (isUsingAltScreen !== wasUsingAltScreen) {
				process.stdout.write(isUsingAltScreen ? ANSI.screen.enterAltBuffer : ANSI.screen.exitAltBuffer);
				wasUsingAltScreen = isUsingAltScreen;
			}

			if (isUsingAltScreen) {
				process.stdout.write(CLEAR_SCREEN + (ttyBuffer ?? ""));

				if (isRawMode)
					process.stdout.write(ANSI.cursor.position(cursorPosition.y + 1, cursorPosition.x + 1));
			} else {
				const newEntries = history.slice(writtenEntries);
				writtenEntries += newEntries.length;

				process.stdout.write(CLEAR_ROW);

				for (const entry of newEntries) {
					if (entry.flags & HistoryFlags.Clear) {
						process.stdout.write(CLEAR_SCREEN);
					} else if (entry.displayText != null) {
						process.stdout.write(entry.displayText + "\n");
					}
				}

				const inputLine = stream != null ? "" : prompt + line;
				process.stdout.write((ttyBuffer ?? "") + inputLine);
			}

			if (showCursor)
				this.setCursorVisible(true);
		};

		const handleExit = () => {
			this.commitLine();
			render();
			this.kill();
		};
		const handleKeypress = (input: string | undefined, keypress: Key) => {
			this.handleKeypress(input, keypress, handleExit);
		};
		process.stdin.on("keypress", handleKeypress);

		const unsubscribe = subscribe(this.state, render);
		render();

		return new Promise((resolve) => {
			this.#onExit = () => {
				unsubscribe();
				process.stdin.off("keypress", handleKeypress);
				process.stdin.pause();
				resolve(EXIT_CODE.success);
			};
		});
	}

	private handleKeypress(input: string | undefined, keypress: Key, onExit: () => void) {
		const { name, ctrl = false, meta = false, shift = false } = keypress;
		const isControlPressed = ctrl || meta;
	
		const key = isControlPressed
			? name ?? ""
			: KEY_MAP[name ?? ""] ?? input ?? "";
	
		if (!key.length)
			return;
	
		if (this.state.stream == null) {
			if (isControlPressed) {
				if ((key === "c" || key === "d") && !shift) {
					return onExit();
				}
			} else {
				if (name === "backspace") {
					this.setLine((line) => line.slice(0, -1));
					return;
				}
		
				if (input?.length === 1 && key === input) {
					this.setLine((line) => line + input);
					return;
				}
			}
		}
	
		void this.handleKeyDown({
			key,
			ctrlKey: ctrl,
			metaKey: meta,
			shiftKey: shift,
			preventDefault: () => {},
		});
	}

	/**
	 * Checks if this shell is running in interactive mode.
	 * @returns `true` if this shell is running in interactive mode.
	 */
	public get isInteractive() {
		return this.#isInteractive;
	}

	/**
	 * Checks if the cursor is currently visible.
	 * @returns `true` if the cursor is currently visible.
	 */
	public get isCursorVisible() {
		return this.#isCursorVisible;
	}

	/**
	 * Sets the visible state of the cursor.
	 * @param visible - The state to set.
	 */
	public setCursorVisible(visible: boolean) {
		if (!process.stdout.isTTY || visible === this.isCursorVisible)
			return;

		process.stdout.write(visible ? ANSI.cursor.show : ANSI.cursor.hide);
		this.#isCursorVisible = visible;
	}

	private setTTYRawMode(rawMode: boolean) {
		if (process.stdin.isTTY)
			process.stdin.setRawMode(rawMode);
	}
}
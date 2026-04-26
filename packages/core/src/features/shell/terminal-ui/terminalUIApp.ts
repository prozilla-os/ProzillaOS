import { ANSI, Vector2, EventEmitter } from "@prozilla-os/shared";
import { Stream } from "../streams/stream";
import { Shell, ShellContext } from "../shell";
import { EXIT_CODE } from "../../../constants";

export interface TerminalUIEvents<M> {
	modeChange: [{ from: M, to: M }];
	exit: [];
	render: [];
	input: [string];
}

export interface TerminalUIAppOptions {
	useAltBuffer?: boolean;
}

/**
 * Represents a text-based user interface.
 * @template M The type for application modes.
 */
export class TerminalUIApp<M> extends EventEmitter<TerminalUIEvents<M>> {
	readonly context: ShellContext;
	readonly shell: Shell;
	readonly stdin: Stream;
	readonly stdout: Stream;
	readonly size: Vector2;

	protected mode: M;
	protected isRunning = false;
	protected useAltBuffer;

	static readonly MODE_CHANGE_EVENT = "modeChange";
	static readonly EXIT_EVENT = "exit";
	static readonly RENDER_EVENT = "render";
	static readonly INPUT_EVENT = "input";

	constructor(context: ShellContext, initialMode: M, { useAltBuffer = true }: TerminalUIAppOptions = {}) {
		super();
		this.context = context;
		this.shell = context.shell;
		this.stdin = context.stdin;
		this.stdout = context.stdout;
		this.size = context.size;
		this.mode = initialMode;
		this.useAltBuffer = useAltBuffer;
	}

	/**
	 * Starts the application and manages the lifecycle of the alternate buffer and input loop.
	 */
	public async run() {
		this.isRunning = true;

		try {
			if (this.useAltBuffer)
				await this.stdout.write(ANSI.screen.enterAltBuffer);

			await this.stdout.write(ANSI.screen.clear + ANSI.screen.home);
			await this.emitAsync(TerminalUIApp.RENDER_EVENT);

			await this.shell.readRawInput(this.stdin, async (data: string) => {
				if (!this.isRunning)
					return;

				await this.emitAsync(TerminalUIApp.INPUT_EVENT, data);
			});
		} catch (error) {
			console.error(error);
			return EXIT_CODE.generalError;
		} finally {
			await this.cleanUp();
		}
		
		return EXIT_CODE.success;
	}

	/**
	 * Transitions the application to a new mode and triggers a re-render.
	 */
	public async setMode(newMode: M) {
		if (this.mode === newMode)
			return;

		const previousMode = this.mode;
		this.mode = newMode;

		await this.emitAsync(TerminalUIApp.MODE_CHANGE_EVENT, { from: previousMode, to: newMode });
		await this.emitAsync(TerminalUIApp.RENDER_EVENT);
	}

	/**
	 * Signals the application to stop and closes the input stream.
	 */
	public exit() {
		this.isRunning = false;
		this.stdin.end();
	}

	/**
	 * Restores terminal state and signals completion.
	 */
	private async cleanUp() {
		if (this.useAltBuffer)
			await this.stdout.write(ANSI.screen.exitAltBuffer);

		await this.emitAsync(TerminalUIApp.EXIT_EVENT);
	}

	public getMode(): M {
		return this.mode;
	}
}
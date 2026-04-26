import { EventEmitter } from "@prozilla-os/shared";
import { ANSI, Vector2 } from "@prozilla-os/shared";
import { Stream } from "../streams/stream";
import { Shell, ShellContext } from "../shell";
import { EXIT_CODE } from "../../../constants";

export interface TUIAppEvents<M> {
	modeChange: [M, M];
	resize: [Vector2];
	exit: [];
	render: [];
	input: [string];
}

/**
 * Represents a text-based user interface.
 * @template M The type for application modes (typically an enum).
 */
export class TUIApp<M> extends EventEmitter<TUIAppEvents<M>> {
	protected readonly context: ShellContext;
	protected readonly shell: Shell;
	protected readonly stdin: Stream;
	protected readonly stdout: Stream;

	protected mode: M;
	protected size: Vector2;
	protected isRunning = false;
	protected useAltBuffer = true;

	static readonly MODE_CHANGE_EVENT = "modeChange";
	static readonly RESIZE_EVENT = "resize";
	static readonly EXIT_EVENT = "exit";
	static readonly RENDER_EVENT = "render";
	static readonly INPUT_EVENT = "input";

	constructor(context: ShellContext, initialMode: M, useAltBuffer = true) {
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

		if (this.useAltBuffer)
			await this.stdout.write(ANSI.screen.enterAltBuffer);

		await this.stdout.write(ANSI.screen.clear + ANSI.screen.home);
		await this.emitAsync(TUIApp.RENDER_EVENT);

		await this.shell.readRawInput(this.stdin, async (data: string) => {
			if (!this.isRunning)
				return;

			await this.emitAsync(TUIApp.INPUT_EVENT, data);
		});

		await this.cleanup();
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

		await this.emitAsync(TUIApp.MODE_CHANGE_EVENT, newMode, previousMode);
		await this.emitAsync(TUIApp.RENDER_EVENT);
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
	private async cleanup() {
		if (this.useAltBuffer)
			await this.stdout.write(ANSI.screen.exitAltBuffer);

		await this.emitAsync(TUIApp.EXIT_EVENT);
	}

	public getMode(): M {
		return this.mode;
	}
}
import { Command } from "../command";
import { ANSI } from "@prozilla-os/shared";
import { TerminalUIApp } from "../terminal-ui/terminalUIApp";
import { Shell, ShellContext } from "../shell";

enum LessMode {
	Viewer
}

class LessApp extends TerminalUIApp<LessMode> {
	private lines: string[] = [];
	private scrollIndex = 0;
	private fileName: string;

	constructor(context: ShellContext, args: string[]) {
		super(context, LessMode.Viewer);
		this.fileName = args[0] ?? "stdin";

		this.on(TerminalUIApp.RENDER_EVENT, async () => {
			await this.render();
		});
		this.on(TerminalUIApp.INPUT_EVENT, async (data) => {
			await this.handleInput(data);
		});
	}

	/**
	 * Reads the file or stream content.
	 */
	public async init(args: string[]): Promise<string | null> {
		if (!args.length)
			return "No file specified";

		const targetFile = this.context.workingDirectory.navigate(this.fileName);
		if (!targetFile)
			return `${this.fileName}: ${Shell.INVALID_PATH_ERROR}`;

		if (targetFile.isFolder())
			return `${this.fileName}: Is a directory`;

		const content = await targetFile.read();
		this.lines = content?.split("\n") ?? [""];
		
		return null;
	}

	private async render(): Promise<void> {
		const terminalHeight = this.size.y;
		const mainViewHeight = terminalHeight - 1;
		let view = ANSI.screen.home + ANSI.screen.clear;

		// Content Area
		const visibleLines = this.lines.slice(
			this.scrollIndex, 
			this.scrollIndex + mainViewHeight
		);

		view += visibleLines.join("\n") + "\n";
		if (visibleLines.length < mainViewHeight) {
			for (let i = 0; i < mainViewHeight - visibleLines.length; i++) {
				view += "~\n";
			}
		}

		const statusRow = terminalHeight;
		const progress = Math.round((this.scrollIndex + mainViewHeight) / this.lines.length * 100);
		const clampedProgress = Math.min(100, progress);
		
		view += ANSI.cursor.position(statusRow, 1) + ANSI.decoration.invert;
		view += ` ${this.fileName} (line ${this.scrollIndex + 1}/${this.lines.length}) ${clampedProgress}% `;
		view += ANSI.reset;

		await this.stdout.write(view + ANSI.cursor.hide);
	}

	private async handleInput(data: string): Promise<void> {
		const mainViewHeight = this.size.y - 1;

		switch (data) {
			case "q":
			case ANSI.input.ctrlC:
			case ANSI.input.escape:
				await this.stdout.write(ANSI.cursor.show);
				this.exit();
				return;
			case "j":
			case ANSI.input.arrowDown:
				if (this.scrollIndex + mainViewHeight < this.lines.length) {
					this.scrollIndex++;
				}
				break;
			case "k":
			case ANSI.input.arrowUp:
				if (this.scrollIndex > 0) {
					this.scrollIndex--;
				}
				break;
			case " ":
			case ANSI.input.pageDown:
				this.scrollIndex = Math.min(
					this.lines.length - mainViewHeight, 
					this.scrollIndex + mainViewHeight
				);
				if (this.scrollIndex < 0) this.scrollIndex = 0;
				break;
			case "b":
			case ANSI.input.pageUp:
				this.scrollIndex = Math.max(0, this.scrollIndex - mainViewHeight);
				break;
			case "g":
				this.scrollIndex = 0;
				break;
			case "G":
				this.scrollIndex = Math.max(0, this.lines.length - mainViewHeight);
				break;
		}

		await this.emitAsync(TerminalUIApp.RENDER_EVENT);
	}
}

export const less = new Command()
	.setManual({
		purpose: "Display the contents of a file in a terminal",
		usage: "less [FILE]",
		description: "Less is a program similar to more, but it has many more features.",
	})
	.setExecute(async function(this: Command, args, context) {
		const app = new LessApp(context, args);
		
		const error = await app.init(args);
		if (error)
			return await Shell.writeError(context.stderr, this.name, error);

		return await app.run();
	});
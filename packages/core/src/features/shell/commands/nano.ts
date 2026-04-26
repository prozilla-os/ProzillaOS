import { Command } from "../command";
import { Ansi, ANSI } from "@prozilla-os/shared";
import { TerminalUIApp } from "../terminal-ui/terminalUIApp";
import { Shell, ShellContext } from "../shell";
import { TextEditorApp } from "../terminal-ui/textEditorApp";

enum NanoMode {
	Editor
}

class NanoApp extends TextEditorApp<NanoMode> {
	constructor(context: ShellContext, args: string[]) {
		super(context, NanoMode.Editor, { args });
	}

	protected override async render() {
		const terminalHeight = this.size.y;
		const mainViewHeight = terminalHeight - 4;
		let view = ANSI.screen.home + ANSI.screen.clear;

		// Title Bar
		view += ANSI.cursor.position(1, 1) + Ansi.invert(` GNU nano 2.0.6             File: ${this.fileName} `) + "\n";

		// Content Area
		for (let index = 0; index < mainViewHeight; index++) {
			if (index < this.lines.length) {
				view += this.lines[index] + "\n";
			} else {
				view += "\n";
			}
		}

		// Status Message
		const statusRow = terminalHeight - 2;
		view += ANSI.cursor.position(statusRow, 1) + (this.statusMessage.length ? this.statusMessage : "");

		// Shortcut Legend
		const shortcutRow = terminalHeight - 1;
		view += ANSI.cursor.position(shortcutRow, 1) 
			+ Ansi.invert("^G") + " Get Help  " + Ansi.invert("^O") + " Write Out " + Ansi.invert("^R") + " Read File " + Ansi.invert("^Y") + " Prev Pg"
			+ ANSI.cursor.position(shortcutRow + 1, 1)
			+ Ansi.invert("^X") + " Exit      " + Ansi.invert("^J") + " Justify   " + Ansi.invert("^W") + " Where Is  " + Ansi.invert("^V") + " Next Pg";

		const cursorPosition = ANSI.cursor.position(this.rowIndex + 2, this.columnIndex + 1);
		await this.stdout.write(view + cursorPosition);
	}

	protected override async handleInput(data: string) {
		this.statusMessage = "";
		const currentLine = this.lines[this.rowIndex];

		switch (data) {
			case ANSI.input.ctrlO:
				this.saveFile();
				break;
			case ANSI.input.ctrlX:
				this.exit();
				return;
			case ANSI.input.carriageReturn:
			case ANSI.input.lineFeed:
				this.lines[this.rowIndex] = currentLine.slice(0, this.columnIndex);
				this.lines.splice(this.rowIndex + 1, 0, currentLine.slice(this.columnIndex));
				this.rowIndex++;
				this.columnIndex = 0;
				break;
			case ANSI.input.backspace:
			case ANSI.input.delete:
				this.deleteCharacter(currentLine);
				break;
			case ANSI.input.arrowUp:
				this.rowIndex = Math.max(0, this.rowIndex - 1);
				this.columnIndex = Math.min(this.columnIndex, this.lines[this.rowIndex].length);
				break;
			case ANSI.input.arrowDown:
				this.rowIndex = Math.min(this.lines.length - 1, this.rowIndex + 1);
				this.columnIndex = Math.min(this.columnIndex, this.lines[this.rowIndex].length);
				break;
			case ANSI.input.arrowLeft:
				this.columnIndex = Math.max(0, this.columnIndex - 1);
				break;
			case ANSI.input.arrowRight:
				this.columnIndex = Math.min(this.lines[this.rowIndex].length, this.columnIndex + 1);
				break;
			default:
				if (data.length === 1 && data.charCodeAt(0) >= 32) {
					this.lines[this.rowIndex] = currentLine.slice(0, this.columnIndex) + data + currentLine.slice(this.columnIndex);
					this.columnIndex++;
				}
				break;
		}

		await this.emitAsync(TerminalUIApp.RENDER_EVENT);
	}

	protected override saveFile() {
		if (!this.args.length) {
			this.statusMessage = "File Name to Write: " + this.fileName;
			return false;
		}

		const saved = super.saveFile();
		if (saved)
			this.statusMessage = `[ Wrote ${this.lines.length} lines ]`;

		return saved;
	}
}

export const nano = new Command()
	.setManual({
		purpose: "Nano's ANOther editor, an enhanced free Pico clone",
		usage: "nano [FILE]",
		description: "nano is a small, free and friendly editor which aims to replace Pico, the default editor included in the non-free Pine package. Rather than just copying Pico's look and feel, nano also implements some missing (or disabled by default) features in Pico, such as \"search and replace\" and \"go to line and column number\"",
	})
	.setExecute(async function(this: Command, args, context) {
		const app = new NanoApp(context, args);
		
		const result = await app.init();
		if (result.isError())
			return await Shell.writeError(context.stderr, this.name, result.error);

		return await app.run();
	});
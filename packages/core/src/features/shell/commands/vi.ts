import { Command } from "../command";
import { Ansi, ANSI } from "@prozilla-os/shared";
import { Shell, ShellContext } from "../shell";
import { TerminalUIApp } from "../terminal-ui/terminalUIApp";
import { TextEditorApp } from "../terminal-ui/textEditorApp";

enum ViMode {
	Command,
	Insert,
	CommandLine
}

class ViApp extends TextEditorApp<ViMode> {
	private commandBuffer = "";

	constructor(context: ShellContext, args: string[]) {
		super(context, ViMode.Command, { args, defaultFileName: "[No Name]" });
	}

	protected override async render() {
		const terminalHeight = this.size.y;
		const mainViewHeight = terminalHeight - 1;
		let view = ANSI.screen.home + ANSI.screen.clear;

		for (let index = 0; index < mainViewHeight; index++) {
			if (index < this.lines.length) {
				view += this.lines[index] + "\n";
			} else {
				view += Ansi.blue("~") + "\n";
			}
		}

		const statusBarRow = terminalHeight;
		view += ANSI.cursor.position(statusBarRow, 1);

		if (this.mode === ViMode.Insert) {
			view += Ansi.bold("-- INSERT --");
		} else if (this.mode === ViMode.CommandLine) {
			view += ":" + this.commandBuffer;
		} else {
			const message = this.statusMessage.length ? ` ${this.statusMessage}` : "";
			view += `"${this.fileName}" ${this.lines.length}L${message}`;
		}

		let cursorRow = this.rowIndex + 1;
		let cursorColumn = this.columnIndex + 1;

		if (this.mode === ViMode.CommandLine) {
			cursorRow = statusBarRow;
			cursorColumn = this.commandBuffer.length + 2;
		}

		const cursorPosition = ANSI.cursor.position(cursorRow, cursorColumn);
		await this.stdout.write(view + cursorPosition);
	}

	protected override async handleInput(data: string) {
		this.statusMessage = "";

		switch (this.mode) {
			case ViMode.Command:
				await this.handleCommandMode(data);
				break;
			case ViMode.CommandLine:
				await this.handleCommandLineMode(data);
				break;
			case ViMode.Insert:
				await this.handleInsertMode(data);
				break;
		}

		await this.emitAsync(TerminalUIApp.RENDER_EVENT);
	}

	private async handleCommandMode(data: string) {
		switch (data) {
			case ":":
				this.commandBuffer = "";
				await this.setMode(ViMode.CommandLine);
				break;
			case "i":
				await this.setMode(ViMode.Insert);
				break;
			case "h":
				this.columnIndex = Math.max(0, this.columnIndex - 1);
				break;
			case "j":
				this.rowIndex = Math.min(this.lines.length - 1, this.rowIndex + 1);
				this.columnIndex = Math.min(this.columnIndex, this.lines[this.rowIndex].length);
				break;
			case "k":
				this.rowIndex = Math.max(0, this.rowIndex - 1);
				this.columnIndex = Math.min(this.columnIndex, this.lines[this.rowIndex].length);
				break;
			case "l":
				this.columnIndex = Math.min(this.lines[this.rowIndex].length, this.columnIndex + 1);
				break;
			case ANSI.input.ctrlC:
				this.exit();
				break;
		}
	}

	private async handleCommandLineMode(data: string) {
		if (data === ANSI.input.escape) {
			this.commandBuffer = "";
			await this.setMode(ViMode.Command);
		} else if (data === ANSI.input.carriageReturn || data === ANSI.input.lineFeed) {
			await this.executeCommand();
		} else if (data === ANSI.input.backspace || data === ANSI.input.delete) {
			if (!this.commandBuffer.length) {
				await this.setMode(ViMode.Command);
			} else {
				this.commandBuffer = this.commandBuffer.slice(0, -1);
			}
		} else {
			this.commandBuffer += data;
		}
	}

	private async handleInsertMode(data: string) {
		const currentLine = this.lines[this.rowIndex];

		if (data === ANSI.input.escape) {
			await this.setMode(ViMode.Command);
		} else if (data === ANSI.input.carriageReturn || data === ANSI.input.lineFeed) {
			this.lines[this.rowIndex] = currentLine.slice(0, this.columnIndex);
			this.lines.splice(this.rowIndex + 1, 0, currentLine.slice(this.columnIndex));
			this.rowIndex++;
			this.columnIndex = 0;
		} else if (data === ANSI.input.backspace || data === ANSI.input.delete) {
			this.deleteCharacter(currentLine);
		} else if (data.length === 1 && data.charCodeAt(0) >= 32) {
			this.lines[this.rowIndex] = currentLine.slice(0, this.columnIndex) + data + currentLine.slice(this.columnIndex);
			this.columnIndex++;
		}
	}

	private async executeCommand() {
		const command = this.commandBuffer.trim();
		const shouldSave = command.includes("w") || command === "x";
		const shouldQuit = command.includes("q") || command === "x";

		if (shouldSave)
			this.saveFile();

		if (shouldQuit) {
			this.exit();
			return;
		}

		if (!shouldSave && command.length)
			this.statusMessage = `Not an editor command: ${command}`;

		this.commandBuffer = "";
		await this.setMode(ViMode.Command);
	}

	protected override saveFile() {
		if (!this.args.length || this.fileName === "[No Name]") {
			this.statusMessage = "No file name";
			return false;
		}

		const saved = super.saveFile();
		if (saved)
			this.statusMessage = "written";

		return saved;
	}
}

export const vi = new Command()
	.setManual({
		purpose: "Vi IMproved, a programmers text editor ",
		usage: "vi [FILE]",
		description: "Vim is a text editor that is upwards compatible to Vi. It can be used to edit all kinds of plain text. It is especially useful for editing programs.",
	})
	.setExecute(async function(this: Command, args, context) {
		const app = new ViApp(context, args);
		
		const result = await app.init();
		if (result.isError())
			return await Shell.writeError(context.stderr, this.name, result.error);

		return await app.run();
	});
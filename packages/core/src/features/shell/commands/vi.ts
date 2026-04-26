import { Command } from "../command";
import { Ansi, ANSI } from "@prozilla-os/shared";
import { Shell, ShellContext } from "../shell";
import { TUIApp } from "../tui/tuiApp";

enum ViMode {
	Command,
	Insert,
	CommandLine
}

class ViApp extends TUIApp<ViMode> {
	private lines: string[] = [""];
	private columnIndex = 0;
	private rowIndex = 0;
	private statusMessage = "";
	private commandBuffer = "";
	private fileName: string;
	private args: string[];

	constructor(context: ShellContext, args: string[]) {
		super(context, ViMode.Command);
		this.args = args;
		this.fileName = args[0] ?? "[No Name]";

		this.on(TUIApp.RENDER_EVENT, async () => {
			await this.render();
		});
		this.on(TUIApp.INPUT_EVENT, async (data) => {
			await this.handleInput(data);
		});
	}

	public async init() {
		if (!this.args.length)
			return null;

		const targetFile = this.context.workingDirectory.navigate(this.fileName);
		if (!targetFile)
			return null;

		if (targetFile.isFolder())
			return `${this.fileName}: Is a directory`;

		const content = await targetFile.read();
		if (content != null) {
			this.lines = content.split("\n");
			if (!this.lines.length)
				this.lines = [""];
		}

		return null;
	}

	private async render() {
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

	private async handleInput(data: string) {
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

		await this.emitAsync(TUIApp.RENDER_EVENT);
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
			this.processDeletion(currentLine);
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

	private processDeletion(currentLine: string) {
		if (this.columnIndex > 0) {
			this.lines[this.rowIndex] = currentLine.slice(0, this.columnIndex - 1) + currentLine.slice(this.columnIndex);
			this.columnIndex--;
		} else if (this.rowIndex > 0) {
			const previousLineLength = this.lines[this.rowIndex - 1].length;
			this.lines[this.rowIndex - 1] += currentLine;
			this.lines.splice(this.rowIndex, 1);
			this.rowIndex--;
			this.columnIndex = previousLineLength;
		}
	}

	private saveFile() {
		if (!this.args.length || this.fileName === "[No Name]") {
			this.statusMessage = "No file name";
			return;
		}

		const targetFile = this.context.workingDirectory.navigate(this.fileName) 
			?? this.context.workingDirectory.create(this.fileName);

		if (targetFile) {
			if (targetFile.isFolder()) {
				this.statusMessage = "Cannot write to directory";
			} else {
				targetFile.setContent(this.lines.join("\n"));
				this.statusMessage = "written";
			}
		} else {
			this.statusMessage = "Error saving file";
		}
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
		
		const error = await app.init();
		if (error)
			return await Shell.writeError(context.stderr, this.name, error);

		return await app.run();
	});
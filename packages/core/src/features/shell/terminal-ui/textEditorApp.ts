import { Result } from "@prozilla-os/shared";
import { TerminalUIApp, TerminalUIAppOptions } from "./terminalUIApp";
import { ShellContext } from "../shell";

export interface TextEditorAppOptions extends TerminalUIAppOptions {
	args: string[];
	defaultFileName?: string;
}

export abstract class TextEditorApp<M> extends TerminalUIApp<M> {
	protected lines: string[] = [];
	protected columnIndex = 0;
	protected rowIndex = 0;
	protected statusMessage = "";
	protected fileName: string;
	protected args: string[];
	
	constructor(context: ShellContext, initialMode: M, { args, defaultFileName = "New File", ...options }: TextEditorAppOptions) {
		super(context, initialMode, options);
		this.args = args;
		this.fileName = args[0] ?? defaultFileName;
	
		this.on(TerminalUIApp.RENDER_EVENT, async () => {
			await this.render();
		});
		this.on(TerminalUIApp.INPUT_EVENT, async (data) => {
			await this.handleInput(data);
		});
	}
	
	/**
	 * Loads the file content into the editor buffer.
	 */
	public async init(): Promise<Result<null, string>> {
		if (!this.args.length)
			return Result.error("No file specified");
	
		const targetFile = this.context.workingDirectory.navigate(this.fileName);
		if (!targetFile)
			return Result.ok(null);
	
		if (targetFile.isFolder())
			return Result.error(`${this.fileName}: Is a directory`);
	
		const content = await targetFile.read();
		this.lines = content?.split("\n") ?? [""];
			
		return Result.ok(null);
	}
	
	protected abstract render(): Promise<void>;
	
	protected abstract handleInput(data: string): Promise<void>;

	protected deleteCharacter(currentLine: string) {
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

	protected saveFile() {
		const targetFile = this.context.workingDirectory.navigate(this.fileName) 
			?? this.context.workingDirectory.create(this.fileName);

		if (targetFile) {
			if (targetFile.isFolder()) {
				this.statusMessage = "Cannot write to directory";
			} else {
				targetFile.setContent(this.lines.join("\n"));
				return true;
			}
		} else {
			this.statusMessage = "Error saving file";
		}
		return false;
	}
}
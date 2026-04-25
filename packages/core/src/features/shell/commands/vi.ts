import { EXIT_CODE } from "../../../constants";
import { Command } from "../command";
import { Stream, StreamError } from "../streams/stream";
import { Ansi, ANSI, Result } from "@prozilla-os/shared";
import { Shell } from "../shell";

export const vi = new Command()
	.setManual({
		purpose: "Edit a file using the vi text editor",
		usage: "vi [FILE]",
		description: "A visual text editor based on vi.",
	})
	.setExecute(async function(this: Command, args, { workingDirectory, shell, stdout, stdin, stderr, size }) {
		let lines: string[] = [""];
		let columnIndex = 0;
		let rowIndex = 0;
		let editorMode: "COMMAND" | "INSERT" | "COMMAND_LINE" = "COMMAND";
		let statusMessage = "";
		let commandBuffer = "";
		let renderPromise: Promise<Result<void, StreamError>> | null = null;
		const fileName = args[0] ?? "[No Name]";

		const terminalHeight = size.y; 
		const mainViewHeight = terminalHeight - 1;

		if (args.length) {
			const targetFile = workingDirectory.navigate(fileName);
			if (targetFile) {
				if (targetFile.isFolder())
					return await Shell.writeError(stderr, this.name, `${fileName}: Is a directory`);

				const content = await targetFile.read();
				if (content != null) {
					lines = content.split(ANSI.input.lineFeed);
					if (!lines.length)
						lines = [""];
				}
			}
		}

		shell.setRawMode(true);
		await stdout.write(ANSI.screen.enterAltBuffer);

		const render = async () => {
			let view = ANSI.screen.home + ANSI.screen.clear;

			for (let index = 0; index < mainViewHeight; index++) {
				if (index < lines.length) {
					view += lines[index] + ANSI.input.lineFeed;
				} else {
					view += Ansi.blue("~") + ANSI.input.lineFeed;
				}
			}

			const statusBarRow = terminalHeight;
			view += ANSI.cursor.position(statusBarRow, 1);
			
			if (editorMode === "INSERT") {
				view += Ansi.bold("-- INSERT --");
			} else if (editorMode === "COMMAND_LINE") {
				view += ":" + commandBuffer;
			} else {
				const message = statusMessage.length ? ` ${statusMessage}` : "";
				view += `"${fileName}" ${lines.length}L${message}`;
			}

			let cursorRow = rowIndex + 1;
			let cursorColumn = columnIndex + 1;

			if (editorMode === "COMMAND_LINE") {
				cursorRow = statusBarRow;
				cursorColumn = commandBuffer.length + 2;
			}

			const cursorPosition = ANSI.cursor.position(cursorRow, cursorColumn);
			renderPromise = stdout.write(view + cursorPosition);
			await renderPromise;
		};

		const saveFile = () => {
			if (!args.length) {
				statusMessage = "No file name";
				void render();
				return;
			}

			const targetFile = workingDirectory.navigate(fileName) ?? workingDirectory.create(fileName);

			if (targetFile) {
				if (targetFile.isFolder()) {
					statusMessage = "Cannot write to directory";
				} else {
					targetFile.setContent(lines.join("\n"));
					statusMessage = "written";
				}
			} else {
				statusMessage = "Error saving file";
			}
			
			void render();
		};

		const executeCommand = () => {
			const command = commandBuffer.trim();
			const shouldSave = command.includes("w") || command === "x";
			const shouldQuit = command.includes("q") || command === "x";

			if (shouldSave)
				saveFile();

			if (shouldQuit)
				stdin.end();

			if (!shouldSave && !shouldQuit && command.length)
				statusMessage = `Not an editor command: ${command}`;

			commandBuffer = "";
			editorMode = "COMMAND";
		};

		const onData = (data: string) => {
			statusMessage = "";

			if (editorMode === "COMMAND") {
				switch (data) {
					case ":":
						editorMode = "COMMAND_LINE";
						commandBuffer = "";
						break;
					case "i":
						editorMode = "INSERT";
						break;
					case "h":
						columnIndex = Math.max(0, columnIndex - 1);
						break;
					case "j":
						rowIndex = Math.min(lines.length - 1, rowIndex + 1);
						break;
					case "k":
						rowIndex = Math.max(0, rowIndex - 1);
						break;
					case "l":
						columnIndex = Math.min(lines[rowIndex].length, columnIndex + 1);
						break;
					case ANSI.input.ctrlC:
						stdin.end();
						break;
				}
			} else if (editorMode === "COMMAND_LINE") {
				if (data === ANSI.input.escape) {
					editorMode = "COMMAND";
					commandBuffer = "";
				} else if (data === ANSI.input.carriageReturn || data === ANSI.input.lineFeed) {
					executeCommand();
				} else if (data === ANSI.input.backspace || data === ANSI.input.delete) {
					if (!commandBuffer.length) {
						editorMode = "COMMAND";
					} else {
						commandBuffer = commandBuffer.slice(0, -1);
					}
				} else {
					commandBuffer += data;
				}
			} else {
				const currentLine = lines[rowIndex];
				
				if (data === ANSI.input.escape) {
					editorMode = "COMMAND";
				} else if (data === ANSI.input.carriageReturn || data === ANSI.input.lineFeed) {
					lines[rowIndex] = currentLine.slice(0, columnIndex);
					lines.splice(rowIndex + 1, 0, currentLine.slice(columnIndex));
					rowIndex++;
					columnIndex = 0;
				} else if (data === ANSI.input.backspace || data === ANSI.input.delete) {
					if (columnIndex > 0) {
						lines[rowIndex] = currentLine.slice(0, columnIndex - 1) + currentLine.slice(columnIndex);
						columnIndex--;
					} else if (rowIndex > 0) {
						const previousLineLength = lines[rowIndex - 1].length;
						lines[rowIndex - 1] += currentLine;
						lines.splice(rowIndex, 1);
						rowIndex--;
						columnIndex = previousLineLength;
					}
				} else {
					lines[rowIndex] = currentLine.slice(0, columnIndex) + data + currentLine.slice(columnIndex);
					columnIndex++;
				}
			}
			void render();
		};

		const onEnd = async () => {
			stdin.off(Stream.DATA_EVENT, onData);
			if (renderPromise)
				await renderPromise;
			await stdout.write(ANSI.screen.exitAltBuffer);
			shell.setRawMode(false);
			shell.interrupt();
		};

		stdin.on(Stream.DATA_EVENT, onData);
		stdin.once(Stream.END_EVENT, () => void onEnd());
		await render();

		return stdin.wait(EXIT_CODE.success);
	});
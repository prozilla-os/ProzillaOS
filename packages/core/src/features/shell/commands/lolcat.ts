import { Ansi, ANSI } from "@prozilla-os/shared";
import { Command } from "../command";
import { Stream } from "../stream";
import { EXIT_CODE } from "../../../constants";

const COLUMN_WIDTH = 5;
const ROW_OFFSET = 2;

const RAINBOW = [
	ANSI.fg.red,
	ANSI.fg.yellow,
	ANSI.fg.green,
	ANSI.fg.cyan,
	ANSI.fg.blue,
	ANSI.fg.magenta,
];

export const lolcat = new Command()
	.setManual({
		purpose: "Display text with a rainbow effect",
	})
	.setExecute(function(_args, { timestamp, stdout, stdin }) {
		const processText = (text: string) => {
			const rows = Ansi.strip(text).split("\n");
			const offset = timestamp / 100;

			const coloredRows = rows.map((row, index) => {
				const columns: string[] = [];

				const rowIndex = index + offset;
				const rowOffset = COLUMN_WIDTH - ROW_OFFSET * rowIndex % COLUMN_WIDTH;
				let rainbowIndex = Math.floor(rowIndex / (COLUMN_WIDTH / ROW_OFFSET));

				const addColumn = (start: number, end: number) => {
					const column = row.substring(start, end);
					const color = RAINBOW[rainbowIndex++ % RAINBOW.length];
					columns.push(color + column);
				};

				if (rowOffset > 0)
					addColumn(0, rowOffset);
        
				for (let i = rowOffset; i < row.length; i += COLUMN_WIDTH + 1) {
					addColumn(i, i + COLUMN_WIDTH + 1);
				}

				if (row.length === 0)
					return "";

				return columns.join("") + ANSI.reset;
			});

			stdout.write(coloredRows.join("\n"));
		};

		stdin.on(Stream.DATA_EVENT, (data) => {
			processText(data);
		});

		return stdin.wait(EXIT_CODE.success);
	});
import { ANSI } from "@prozilla-os/shared";
import { removeAnsi } from "../_utils/terminal.utils";
import { Command, ExecuteParams } from "../command";

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
	.setExecute(function(_args, params) {
		const { rawInputValue, timestamp } = params as ExecuteParams;
		if (rawInputValue == null) return;
		let rows = removeAnsi(rawInputValue).split("\n");
		const offset = timestamp / 100;

		rows = rows.map((row, index) => {
			const columns: string[] = [];

			const rowIndex = index + offset;
			const rowOffset = COLUMN_WIDTH - ((ROW_OFFSET * rowIndex) % COLUMN_WIDTH);
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

			return columns.join("");
		});

		return rows.join("\n");
	});
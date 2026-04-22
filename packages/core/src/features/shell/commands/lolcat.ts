import { ANSI, parseOptionalFloat } from "@prozilla-os/shared";
import { Command } from "../command";
import { Stream } from "../streams/stream";
import { EXIT_CODE } from "../../../constants";

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
		usage: "lolcat [ -p spread ] [ -F freq ] [ -S seed ]",
		options: {
			"-p spread": "Rainbow spread (default: 3.0)",
			"-F freq": "Rainbow frequency (default: 0.1)",
			"-S seed": "Rainbow seed (default: 0)",
		},
	})
	.addOption({
		short: "p",
		long: "spread",
		isInput: true,
	})
	.addOption({
		short: "F",
		long: "freq",
		isInput: true,
	})
	.addOption({
		short: "S",
		long: "seed",
		isInput: true,
	})
	.setExecute(function(this: Command, _args, { timestamp, stdout, stdin, inputs }) {
		const spread = parseOptionalFloat(inputs.p, 3.0);
		const freq = parseOptionalFloat(inputs.F, 0.1);
		const seed = parseOptionalFloat(inputs.S);

		let lineIndex = 0;

		const processText = async (text: string) => {
			let output = "";
			let i = 0;
			let colIndex = 0;
			const offset = timestamp / 1000;

			while (i < text.length) {
				const char = text[i];

				if (char === "\x1b") {
					const remaining = text.substring(i);
					// eslint-disable-next-line no-control-regex
					const match = remaining.match(/^\u001b\[[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/);
					
					if (match) {
						const seq = match[0];
						output += seq;
						
						if (seq === ANSI.screen.home || seq === ANSI.screen.clear) {
							lineIndex = 0;
							colIndex = 0;
						}
						
						i += seq.length;
						continue;
					}
				}

				if (char === "\n") {
					output += "\n";
					lineIndex++;
					colIndex = 0;
				} else if (char === "\r" || char === "\t" || char === " ") {
					output += char;
					colIndex++;
				} else {
					const iVal = freq * (seed + lineIndex + colIndex / spread + offset);
					const rainbowIndex = Math.floor(Math.abs(iVal) * RAINBOW.length);
					const color = RAINBOW[rainbowIndex % RAINBOW.length];

					output += color + char + ANSI.reset;
					colIndex++;
				}
				i++;
			}

			await stdout.write(output);
		};

		stdin.on(Stream.DATA_EVENT, (data) => {
			void processText(data);
		});

		return stdin.wait(EXIT_CODE.success);
	});
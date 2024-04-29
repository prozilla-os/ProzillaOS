import Command from "../command.js";
import Stream from "../stream.js";

const LOCOMOTIVE_SMOKE = [
	[
		"                        (@@) (  ) (@)  ( )  @@   ()   @   o   @   o",
		"                   (   )",
		"               (@@@@)",
		"            (    )",
		"",
		"          (@@@)",
	],
	[
		"                        (  ) (@@) ( )  (@)  ()    @@    o    @    o   @",
		"                   (@@@)",
		"               (    )",
		"            (@@@@)",
		"",
		"          (   )",
	]
];

const LOCOMOTIVE_TOP = [
	"      ====        ________                ___________",
	"  _D _|  |_______/        \\__I_I_____===__|_________|",
	"   |(_)---  |   H\\________/ |   |        =|___ ___|  ",
	"   /     |  |   H  |  |     |   |         ||_| |_||  ",
	"  |      |  |   H  |__--------------------| [___] |  ",
	"  | ________|___H__/__|_____/[][]~\\_______|       |  ",
	"  |/ |   |-----------I_____I [][] []  D   |=======|__",
];

const LOCOMOTIVE_BOTTOM = [
	[
		"__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__",
		" |/-=|___|=    ||    ||    ||    |_____/~\\___/       ",
		"  \\_/      \\O=====O=====O=====O_/      \\_/           ",
	],
	[
		"__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__",
		" |/-=|___|=O=====O=====O=====O   |_____/~\\___/       ",
		"  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/           ",
	],
	[
		"__/ =| o |=-O=====O=====O=====O \\ ____Y___________|__",
		" |/-=|___|=    ||    ||    ||    |_____/~\\___/       ",
		"  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/           ",
	],
	[
		"__/ =| o |=-~O=====O=====O=====O\\ ____Y___________|__",
		" |/-=|___|=    ||    ||    ||    |_____/~\\___/       ",
		"  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/           ",
	],
	[
		"__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__",
		" |/-=|___|=   O=====O=====O=====O|_____/~\\___/       ",
		"  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/           ",
	],
	[
		"__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__",
		" |/-=|___|=    ||    ||    ||    |_____/~\\___/       ",
		"  \\_/      \\_O=====O=====O=====O/      \\_/           ",
	]
].reverse();

const WAGON = [
	"    _________________        ",
	"   _|                \\_____A ",
	" =|                        | ",
	" -|                        | ",
	"__|________________________|_",
	"|__________________________|_",
	"   |_D__D__D_|  |_D__D__D_|  ",
	"    \\_/   \\_/    \\_/   \\_/   ",
];

function getLocomotive(frame, wagonCount = 1) {
	const smokeHeight = LOCOMOTIVE_SMOKE[0].length;
	const locomotiveHeight = LOCOMOTIVE_TOP.length + LOCOMOTIVE_BOTTOM[0].length;
	const wagonHeight = WAGON.length;

	const wagonStart = smokeHeight + locomotiveHeight - wagonHeight;

	const smoke = LOCOMOTIVE_SMOKE[Math.round(frame / 6) % LOCOMOTIVE_SMOKE.length];
	const top = LOCOMOTIVE_TOP;
	const bottom = LOCOMOTIVE_BOTTOM[frame % LOCOMOTIVE_BOTTOM.length];

	const distance = 50 - frame;
	const locomotive = smoke.concat(top, bottom).map((line, index) => {
		if (index >= wagonStart && wagonCount > 0) {
			line += WAGON[index - wagonStart].repeat(wagonCount);
		}

		if (distance === 0) {
			return line;
		} else if (distance > 0) {
			return " ".repeat(distance) + line;
		} else {
			line = line.slice(-distance);
			return line;
		}
	}).join("\n");

	return `\n${locomotive}\n`;
}

export const sl = new Command()
	.setManual({
		purpose: "Displays animations aimed to correct users who accidentally enter sl instead of ls. SL stands for Steam Locomotive."
	})
	.addOption({
		short: "w",
		long: "wagons",
		isInput: true
	})
	.setExecute((args, { inputs }) => {
		let wagonCount = 1;

		if (inputs?.w) {
			wagonCount = parseInt(inputs.w);

			if (!wagonCount || wagonCount < 0) {
				return `${this.name}: Please specify a valid amount of wagons`; 
			}
		}

		const stream = new Stream();

		let frame = 0;
		const interval = setInterval(() => {
			const text = getLocomotive(frame, wagonCount);
			stream.send(text);
			frame++;

			if (text.trim().length === 0)
				stream.stop();
		}, 100);

		stream.on(Stream.EVENT_NAMES.STOP, () => {
			clearInterval(interval);
		});

		stream.start();

		return stream;
	});
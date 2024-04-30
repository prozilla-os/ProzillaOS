import Command from "../command.js";
import Stream from "../stream.js";

const ANIMATION_SPEED = 1.25;

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

const COAL_WAGON = [
	"                             ",
	"    _________________        ",
	"   _|                \\_____A ",
	" =|                        | ",
	" -|                        | ",
	"__|________________________|_",
	"|__________________________|_",
	"   |_D__D__D_|  |_D__D__D_|  ",
	"    \\_/   \\_/    \\_/   \\_/   ",
];

const EXTRA_WAGONS = [
	[
		" _______================_______ ",
		"  |  | ___  ___  ___  ___ |  |  ",
		"  |  | | |  | |  | |  | | |  |  ",
		"  |  | |_|  |_|  |_|  |_| |  |  ",
		"  |  |                    |  |  ",
		"__|__|____________________|__|__",
		"_|____________________________|_",
		"   |_D__D__D_|     |_D__D__D_|  ",
		"    \\_/   \\_/       \\_/   \\_/   ",
	],
	[
		"                             ",
		"  ________========__HH____   ",
		" /                  HH    \\  ",
		"/                   HH     \\ ",
		"\\                   HH     / ",
		"_\\__________________HH____/__",
		"|__________________________|_",
		"   |_D__D__D_|  |_D__D__D_|  ",
		"    \\_/   \\_/    \\_/   \\_/   ",
	],
	[
		"                             ",
		"                             ",
		"                             ",
		"                             ",
		"                             ",
		"_____________________________",
		"|__________________________|_",
		"   |_D__D__D_|  |_D__D__D_|  ",
		"    \\_/   \\_/    \\_/   \\_/   ",
	],
	[
		"                             ",
		"    _|__|___________|__|___  ",
		"   (_|__|___________|__|___) ",
		"   _(|__|___________|__|__)_ ",
		"  (__|__|___________|__|____)",
		"_(___|__|___________|__|__)__",
		"|__________________________|_",
		"   |_D__D__D_|  |_D__D__D_|  ",
		"    \\_/   \\_/    \\_/   \\_/   ",
	],
	[
		"                             ",
		" ___________________________ ",
		" \\      |           |      / ",
		"  \\     |           |     /  ",
		"  |\\    |           |    /|  ",
		"__|_\\___|___________|___/_|__",
		"|__________________________|_",
		"   |_D__D__D_|  |_D__D__D_|  ",
		"    \\_/   \\_/    \\_/   \\_/   ",
	],
];

function getLocomotive(frame, wagonCount = 1) {
	const smokeHeight = LOCOMOTIVE_SMOKE[0].length;
	const locomotiveHeight = LOCOMOTIVE_TOP.length + LOCOMOTIVE_BOTTOM[0].length;
	const wagonHeight = COAL_WAGON.length;

	const wagonStart = smokeHeight + locomotiveHeight - wagonHeight;

	const smoke = LOCOMOTIVE_SMOKE[Math.round(frame / 4) % LOCOMOTIVE_SMOKE.length];
	const top = LOCOMOTIVE_TOP;
	const bottom = LOCOMOTIVE_BOTTOM[frame % LOCOMOTIVE_BOTTOM.length];

	const distance = 50 - frame;
	const locomotive = smoke.concat(top, bottom).map((line, index) => {
		if (index >= wagonStart && wagonCount > 0) {
			for (let i = 0; i < wagonCount; i++) {
				if (i === 0) {
					line += COAL_WAGON[index - wagonStart];
				} else {
					line += EXTRA_WAGONS[(i - 1) % EXTRA_WAGONS.length][index - wagonStart];
				}
			}
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
		purpose: "Displays animations aimed to correct users who accidentally enter sl instead of ls. SL stands for Steam Locomotive.",
		usage: "sl\n"
			+ "sl -w [NUMBER]",
		options: {
			"-w": "Set the amount of wagons (defaults to 1)"
		}
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
		}, 100 / ANIMATION_SPEED);

		stream.on(Stream.EVENT_NAMES.STOP, () => {
			clearInterval(interval);
		});

		stream.start();

		return stream;
	});
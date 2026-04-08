import { Command } from "../command";
import { Stream } from "../stream";
import { Ansi, ANSI, parseOptionalFloat } from "@prozilla-os/shared";

export const watch = new Command()
	.setRequireArgs(true)
	.setManual({
		purpose: "Execute a program periodically, showing output fullscreen",
		usage: "watch [-n <seconds>] <command>",
		options: {
			"-n seconds": "Set the interval (defaults to 2)",
		},
	})
	.addOption({
		long: "interval",
		short: "n",
		isInput: true,
	})
	.setExecute(function(args, { inputs, execute }) {
		const stream = new Stream();
        
		const intervalSeconds = parseOptionalFloat(inputs.n, 2);
		const intervalMs = Math.max(0.1, intervalSeconds) * 1000;
        
		const commandString = args.join(" ");

		let intervalId: ReturnType<typeof setInterval>;
		let isExecuting = false;

		const tick = async () => {
			if (isExecuting) return;
			isExecuting = true;

			try {
				const response = await execute(commandString);
				const header = `${ANSI.fg.white}Every ${intervalSeconds.toFixed(1)}s: ${commandString}${ANSI.reset}\n\n`;
                
				if (typeof response === "string") {
					stream.send(header + response);
				} else if (response == null || (response as { blank?: boolean }).blank) {
					stream.send(header);
				}
			} catch (_error) {
				stream.send(Ansi.red(`Command failed: ${commandString}`));
			} finally {
				isExecuting = false;
			}
		};

		setTimeout(() => {
			void tick();
			intervalId = setInterval(() => void tick(), intervalMs);
		}, 0);

		stream.on(Stream.STOP_EVENT, () => {
			clearInterval(intervalId);
		});

		return stream.start();
	});
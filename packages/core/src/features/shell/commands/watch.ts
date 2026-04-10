import { EXIT_CODE } from "../../../constants";
import { Command } from "../command";
import { Stream } from "../stream";
import { ANSI, Ansi, parseOptionalFloat } from "@prozilla-os/shared";

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
	.setExecute(function(args, { inputs, execute, stdout, stdin }) {
		const intervalSeconds = parseOptionalFloat(inputs.n, 2);
		const intervalMs = Math.max(0.1, intervalSeconds) * 1000;
		
		const commandString = args.join(" ");
		let isExecuting = false;
		let isStopping = false;

		stdout.write(ANSI.screen.enterAltBuffer);

		const tick = async () => {
			if (isExecuting || isStopping) return;
			isExecuting = true;

			const captureStream = new Stream().start();
			let capturedOutput = "";

			captureStream.on(Stream.DATA_EVENT, (data) => {
				capturedOutput += data;
			});

			try {
				await execute(commandString, { stdout: captureStream });
				
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				if (!isStopping) {
					const header = Ansi.white(`Every ${intervalSeconds.toFixed(1)}s: ${commandString}\n\n`);
					stdout.write(ANSI.screen.clear + ANSI.screen.home + header + capturedOutput);
				}
			} catch (error) {
				console.error(error);
				stdout.write(Ansi.red(`Command failed: ${commandString}\n`));
			} finally {
				isExecuting = false;
				captureStream.stop();
			}
		};

		const intervalId = setInterval(() => void tick(), intervalMs);

		stdin.on(Stream.STOP_EVENT, () => {
			isStopping = true;
			clearInterval(intervalId);
			stdout.write(ANSI.screen.exitAltBuffer);
		});

		void tick();

		return stdin.wait(EXIT_CODE.success);
	});
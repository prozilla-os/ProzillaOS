import { EXIT_CODE } from "../../../constants";
import { Command } from "../command";
import { Stream } from "../stream";
import { Ansi, parseOptionalFloat } from "@prozilla-os/shared";

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

		const tick = async () => {
			if (isExecuting) return;
			isExecuting = true;

			// Create a temporary stream to capture the specific execution's output
			const captureStream = new Stream();
			let capturedOutput = "";

			// Accumulate data from the command
			captureStream.on(Stream.DATA_EVENT, (data) => {
				capturedOutput += data;
			});

			try {
				await execute(commandString, { stdout: captureStream });
		
				const header = Ansi.white(`Every ${intervalSeconds.toFixed(1)}s: ${commandString}\n\n`);
		
				stdout.write("\x1b[2J\x1b[H" + header + capturedOutput);
			} catch (error) {
				console.error(error);
				stdout.write(Ansi.red(`Command failed: ${commandString}\n`));
			} finally {
				isExecuting = false;
				captureStream.stop();
			}
		};

		void tick();
		const intervalId = setInterval(() => void tick(), intervalMs);

		stdin.on(Stream.STOP_EVENT, () => {
			clearInterval(intervalId);
		});

		return stdin.wait(EXIT_CODE.success);
	});
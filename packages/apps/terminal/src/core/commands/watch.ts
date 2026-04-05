// import { Command } from "../command";
// import { Stream } from "../stream";

// export const watch = new Command()
// 	.setManual({
// 		purpose: "Execute a program periodically",
// 		options: {
// 			"-n seconds": "Specify update interval (defaults to 2)",
// 		},
// 	})
// 	.addOption({
// 		short: "n",
// 		long: "interval",
// 		isInput: true,
// 	})
// 	.setExecute(function(_args, { inputs }) {
// 		const delay = inputs?.n !== undefined ? parseInt(inputs.n) : 2;

// 		const stream = new Stream();
		
// 		const interval = setInterval(() => {
// 			const text = "command output here";
// 			stream.send(text);
// 		}, delay * 1000);

// 		stream.on(Stream.STOP_EVENT, () => {
// 			clearInterval(interval);
// 		});

// 		stream.start();

// 		return stream;
// 	});
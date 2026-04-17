import { Command } from "../command";
import { Shell } from "../shell";

export const date = new Command()
	.setManual({
		purpose: "Display or set the date and time",
		usage: "date [option] [+format]",
		description: "Display the current time in the given FORMAT.",
		options: {
			"-u": "Display UTC (Coordinated Universal Time)",
		},
	})
	.addOption({ short: "u", long: "utc" })
	.setExecute(function(this: Command, args, { stdout, options }) {
		const now = new Date();
		const isUtc = options.includes("u");
		const formatArgument = args.find((arg) => arg.startsWith("+"));

		if (!formatArgument) {
			stdout.write(isUtc ? now.toUTCString() : now.toString());
			return;
		}

		const pad = (value: number) => value.toString().padStart(2, "0");

		const year = isUtc ? now.getUTCFullYear() : now.getFullYear();
		const month = (isUtc ? now.getUTCMonth() : now.getMonth()) + 1;
		const day = isUtc ? now.getUTCDate() : now.getDate();
		const hours = isUtc ? now.getUTCHours() : now.getHours();
		const minutes = isUtc ? now.getUTCMinutes() : now.getMinutes();
		const seconds = isUtc ? now.getUTCSeconds() : now.getSeconds();

		const formatMap: Record<string, string> = {
			"%Y": year.toString(),
			"%m": pad(month),
			"%d": pad(day),
			"%H": pad(hours),
			"%M": pad(minutes),
			"%S": pad(seconds),
			"%T": `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
			"%D": `${pad(month)}/${pad(day)}/${year.toString().slice(-2)}`,
		};

		let result = formatArgument.substring(1);

		for (const [key, value] of Object.entries(formatMap)) {
			result = result.replaceAll(key, value);
		}

		Shell.printLn(stdout, result);
	});
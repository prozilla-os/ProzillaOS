import { parseOptionalFloat } from "@prozilla-os/shared";
import { Command } from "../command";

const SUFFIX_TO_FACTOR: Record<string, number> = {
	"s": 1000,
	"m": 1000 * 60,
	"h": 1000 * 60 * 60,
	"d": 1000 * 60 * 60 * 24,
};

export const sleep = new Command()
	.setManual({
		purpose: "Delay for a specified amount of time",
		usage: "sleep NUMBER[SUFFIX]...",
	})
	.setExecute(function(args) {
		let delay = 0;

		for (const arg of args) {
			const suffix = arg.at(-1);
			const base = parseOptionalFloat(arg.slice(0, -1));
			const factor = suffix ? SUFFIX_TO_FACTOR[suffix] : 0;
			delay += base * factor;
		}

		return new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, delay);
		});
	});
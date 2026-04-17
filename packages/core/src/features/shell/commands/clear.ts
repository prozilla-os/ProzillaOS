import { Command } from "../command";
import { HistoryFlags } from "../shell";

export const clear = new Command()
	.setManual({
		purpose: "Clear terminal screen",
	})
	.setExecute(function(_args, { shell }) {
		shell.pushHistory({
			flags: HistoryFlags.Clear,
		});
	});
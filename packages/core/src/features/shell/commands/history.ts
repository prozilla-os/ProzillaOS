import { Command } from "../command";
import { EXIT_CODE } from "../../../constants";
import { HistoryFlags, Shell } from "../shell";

export const history = new Command()
	.setManual({
		purpose: "Display the command history list with line numbers",
		usage: "history",
		description: "Display the list of commands typed since the shell session started.",
	})
	.setExecute(function(this: Command, _args, { stdout, shell }) {
		const inputHistory = shell.state.history.filter(({ flags }) => flags & HistoryFlags.Command);

		if (inputHistory.length === 0) 
			return EXIT_CODE.success;

		const output = inputHistory
			.map((entry, index) => {
				const lineNumber = (index + 1).toString().padStart(5, " ");
				return `${lineNumber}  ${entry.input}`;
			})
			.join("\n");

		Shell.printLn(stdout, output);

		return EXIT_CODE.success;
	});
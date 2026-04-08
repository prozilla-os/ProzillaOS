import { Command, CommandResponse } from "../command";

const evalCommand = new Command()
	.setRequireArgs(true)
	.setManual({
		purpose: "Evaluate and execute JavaScript code",
		usage: "eval [input]",
	})
	.setRequireArgs(true)
	.setExecute(function(args: string[]) {
		if (args.length == 0)
			return;
		
		const output = eval(args[0]) as CommandResponse;
		return output;
	});

export { evalCommand as eval };
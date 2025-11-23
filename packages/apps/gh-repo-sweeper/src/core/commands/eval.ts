import { Command, CommandResponse } from "../command";

const evalCommand = new Command()
	.setRequireArgs(true)
	.setManual({
		purpose: "Evaluate and execute JavaScript code",
		usage: "eval [input]",
	})
	.setRequireArgs(true)
	.setExecute(function(this: Command, args) {
		if (args == null || args.length == 0)
			return;
		
		const output = eval(args[0]) as CommandResponse ?? { blank: true };
		return output;
	});

export { evalCommand as eval };
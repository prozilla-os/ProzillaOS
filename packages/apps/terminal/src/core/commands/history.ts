// import { Command, CommandResponse } from "../command";

// const historyCommand = new Command()
// 	.setRequireArgs(true)
// 	.setManual({
// 		purpose: "Command Line history",
// 		usage: "history",
// 	})
// 	.setRequireArgs(true)
// 	.setExecute(function(this: Command, args, { history }) {
// 		if (args == null || args.length == 0)
// 			return;
		
// 		const output = eval(args[0]) as CommandResponse ?? { blank: true };
// 		return output;
// 	});

// export { historyCommand as eval };
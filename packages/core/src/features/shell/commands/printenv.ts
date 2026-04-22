import { Command } from "../command";
import { Shell } from "../shell";

export const printenv = new Command()
	.setManual({
		purpose: "Print all or part of environment",
		usage: "printenv [VARIABLE]...",
		description: "Print the values of the specified environment VARIABLE(s).  If no VARIABLE is specified, print name and value pairs for them all.",
	})
	.setExecute(async function(this: Command, args, { stdout, env }) {
		const exportedVars = env.exportedVariables;

		if (args.length > 0) {
			await Promise.all(args.map(async (arg) => {
				const value = exportedVars[arg];
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				if (value !== undefined)
					await Shell.printLn(stdout, `${value}`);
			}));
			return;
		}

		await Promise.all(Object.entries(exportedVars).map(async ([key, value]) => {
			await Shell.printLn(stdout, `${key}=${value}`);
		}));
	});
import { EXIT_CODE } from "../../../constants";
import { Command } from "../command";
import { Shell, ShellContext } from "../shell";

export const evalCommand = new Command()
	.setRequireArgs(true)
	.setManual({
		purpose: "Evaluate and execute JavaScript code",
		usage: "eval [input]",
		description: "Executes JavaScript code with access to the shell.",
	})
	.setExecute(function(this: Command, args, context) {
		const { stdout, stderr } = context;
		const code = args.join(" ");

		try {
			// eslint-disable-next-line @typescript-eslint/no-implied-eval
			const runner = new Function("context", `
				with(context) { 
					return (${code}); 
				}
			`) as (context: ShellContext) => unknown;

			const result = runner(context);

			if (result !== undefined) {
				stdout.write(String(result as unknown));
			}

			return EXIT_CODE.success;
		} catch (error) {
			const message = error instanceof Error ? error.message : "Execution error";
			return Shell.writeError(stderr, this.name, message);
		}
	});

export { evalCommand as eval };
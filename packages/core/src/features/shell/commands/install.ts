import { Command } from "../command";
import { Shell } from "../shell";
import type { LoadAppOptions } from "../../apps/appLoader";

export const install = new Command()
	.setManual({
		purpose: "Install an app from a URL or npm package",
		usage: "install [--export <name>] <npm-package | url>",
		description: "Dynamically install an app from an npm package name (e.g. @scope/package) or a direct URL to an ES module that exports an App instance.",
		options: {
			"-e, --export <name>": "Name of the export that contains the App instance (default: checks `app` then `default`)",
		},
	})
	.addOption({ short: "e", long: "export", isInput: true })
	.setRequireArgs(true)
	.setExecute(async function(args, { stdout, stderr, systemManager, inputs }) {
		const target = args[0];

		if (!target) {
			await Shell.writeError(stderr, "install", "expected a package name or URL");
			return 1;
		}

		await stdout.write(`Installing "${target}"...\n`);

		try {
			const options: LoadAppOptions = {};
			if (inputs.e)
				options.exportName = inputs.e;

			const app = await systemManager.appsConfig.installApp(target, systemManager, options);

			await Shell.printLn(stdout, `Successfully installed "${app.name}" (${app.id})`);
		} catch (error) {
			await Shell.writeError(stderr, "install", error instanceof Error ? error.message : String(error));
			return 1;
		}
	});

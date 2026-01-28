import { Application, TypeDocOptions } from "typedoc";
import type { PluginOptions } from "typedoc-plugin-markdown";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { ORG, OUT_DIR, PACKAGES, PACKAGES_DIR } from "./packages.const.mjs";
import { Option, program } from "@commander-js/extra-typings";
import { formatMemberPageTitle, formatModulePageTitle } from "./typedoc.utils";
import { Logger } from "@prozilla-os/shared";

const DEFAULT_OPTIONS: TypeDocOptions & PluginOptions = {
	plugin: [
		"typedoc-plugin-mdn-links",
		"typedoc-plugin-markdown",
		"./scripts/typedoc-plugin.mjs",
	],
	categorizeByGroup: true,
	router: "group",
	groupOrder: ["Apps", "Components", "Hooks", "Classes", "Constructors", "Properties", "Methods", "Functions", "Variables", "*", "Interfaces", "Types"],
	sort: ["source-order"],
	hideBreadcrumbs: true,
	hidePageHeader: true,
	expandParameters: true,
	expandObjects: true,
	pageTitleTemplates: {
		index: "Index",
		member: formatMemberPageTitle,
		module: formatModulePageTitle,
	},
	entryFileName: "index",
	modulesFileName: "api",
	navigation: {
		includeGroups: true,
	},
};

const logger = new Logger();

program.name("typedoc-helper")
	.description("Automatically generates documentation for the API of each package and adds them to the documentation site.");

program.command("run", { isDefault: true })
	.option("-f --filter <filter>", "The filter to apply", "all")
	.addOption(new Option("-s --sequential", "Generate documentation sequentially instead of concurrently").default(true))
	.addOption(new Option("-c --concurrent", "Generate documentation concurrently (may cause issues if navigation files are missing)").implies({ sequential: false }).conflicts("concurrent"))
	.option("-d --dry-run", "Does everything except actually generating documentation", false)
	.action((options) => {
		const packagesFilter = options.filter;
		const concurrent = !options.sequential;
		const dryRun = options.dryRun;

		// Apply filter
		let packages = PACKAGES;
		if (packagesFilter !== "all") {
			if (packagesFilter == "libs") {
				packages = packages.filter((path) => !path.startsWith("apps/"));
			} else if (packagesFilter == "apps") {
				packages = packages.filter((path) => path.startsWith("apps/"));
			} else {
				const packagePaths = packagesFilter.split(",").map((path) => path.replace(ORG + "/", ""));
				packages = packages.filter((path) => packagePaths.includes(path));
			}
		}
		
		logger.parameter("Filter", packagesFilter);
		logger.parameter("Packages", packages.length);
		logger.parameter("Concurrency", concurrent ? "enabled" : "disabled");

		// Generate docs
		if (concurrent) {
			packages.forEach((path) => void generateDocs(path, dryRun));
		} else {
			void (async () => {
				for (const path of packages) {
					await generateDocs(path, dryRun);
				}
			})();
		}

		// Add auto-generated docs to gitignore
		if (!dryRun) {
			writeFileSync(resolve(__dirname, "../", OUT_DIR, ".gitignore"), PACKAGES.join("\n"));
		}
	});

async function generateDocs(path: string, dryRun: boolean) {
	const packageDir = PACKAGES_DIR + path;
	const entryPoint = `${packageDir}/src/main.ts`;
	const tsConfig = `${packageDir}/tsconfig.json`;

	const outDir = OUT_DIR + path;
	const navigationJson = `${outDir}/nav.json`;

	const options: TypeDocOptions & PluginOptions & { path: string } = {
		...DEFAULT_OPTIONS,
		path,
		entryPoints: [entryPoint],
		tsconfig: tsConfig,
		out: outDir,
		navigationJson,
	};

	logger.pending(`Generating docs for: ${path}`);

	const onComplete = () => {
		logger.success(`Finished generating docs for: ${path}`);
	};

	if (!dryRun) {
		const app = await Application.bootstrapWithPlugins(options);
		const project = await app.convert();

		if (project) {
			await app.generateOutputs(project).then(onComplete).catch(() => {
				logger.error(`Failed to generate docs for: ${path}`);
			});
		}
	} else {
		onComplete();
	}
}

// Execute program
program.parse(process.argv);
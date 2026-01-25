import { Application, TypeDocOptions } from "typedoc";
import type { PluginOptions } from "typedoc-plugin-markdown";
import { ANSI } from "../../packages/shared/src/constants";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { OUT_DIR, PACKAGES, PACKAGES_DIR } from "./packages.const.mjs";

const DEFAULT_OPTIONS: TypeDocOptions & PluginOptions = {
	plugin: [
		"typedoc-plugin-mdn-links",
		"typedoc-plugin-markdown",
		"./scripts/typedoc-plugin.mjs",
	],
	categorizeByGroup: true,
	router: "group",
	groupOrder: ["Components", "Hooks", "*", "Interfaces", "Types"],
	sort: ["alphabetical-ignoring-documents"],
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
		includeGroups: true
	},
};

const packagesFilter = process.argv.length > 2 ? process.argv[2].toLowerCase() : "all";
console.log("Filter: " + ANSI.decoration.bold + packagesFilter + ANSI.reset);

// Apply filter
let packages = PACKAGES;
if (packagesFilter == "libs") {
	packages = packages.filter((path) => !path.startsWith("apps/"));
} else if (packagesFilter == "apps") {
	packages = packages.filter((path) => path.startsWith("apps/"));
}
console.log("Packages: " + ANSI.decoration.bold + packages.length + ANSI.reset);

// Generate docs
packages.forEach(async (path) => {
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

	console.log(`${ANSI.fg.yellow}Generating docs for: ${path}${ANSI.reset}`);
	const app = await Application.bootstrapWithPlugins(options);
	const project = await app.convert();

	if (project) {
		await app.generateOutputs(project).then(() => {
			console.log(`\n${ANSI.fg.green}✓ Finished generating docs for: ${path}${ANSI.reset}`);
		}).catch(() => {
			console.log(`\n${ANSI.fg.red}⚠ Failed to generate docs for: ${path}${ANSI.reset}`);
		});
	}
});

// Add auto-generated docs to gitignore
writeFileSync(resolve(__dirname, "../", OUT_DIR, ".gitignore"), PACKAGES.join("\n"));

interface PageData {
	name: string;
    rawName: string;
    kind: string;
    isDeprecated: boolean;
}

interface MemberPageData extends PageData {
	group?: string;
	codeKeyword?: string;
	keyword?: string;
}

function formatModulePageTitle({ name }: PageData) {
	return name.toUpperCase();
}

function formatMemberPageTitle({ group, rawName: name }: MemberPageData) {
	let title = "";
	if (group?.toLowerCase().startsWith("component")) {
		const componentName = name.endsWith("()") ? name.substring(0, name.length - 2) : name;
		title = `<${componentName}/>`;
	} else {
		title = name;
	}

	title = "`" + title + "`";

	if (group) {
		title = formatGroupName(group) + " " + title;
	}

	return title;
}

function formatGroupName(group: string) {
	if (group.endsWith("ses")) {
		return group.substring(0, group.length - 2);
	} else if (group.endsWith("s")) {
		return group.substring(0, group.length - 1);
	}

	return group;
}
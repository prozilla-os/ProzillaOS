import { Application, TypeDocOptions } from "typedoc";
import type { PluginOptions } from "typedoc-plugin-markdown";
import { ANSI } from "../../packages/shared/src/constants";

const PACKAGES_DIR = "../packages/";
const PACKAGES = [
	"core",
	"dev-tools",
	"shared",
	"skins",
];
const OUT_DIR = "./tmp/";

const DEFAULT_OPTIONS: TypeDocOptions & PluginOptions = {
	plugin: [
		"typedoc-plugin-mdn-links",
		"./scripts/typedoc-categorizer.mjs",
		"typedoc-plugin-markdown"
	],
	hideBreadcrumbs: true,
	categorizeByGroup: true,
	router: "group",
	groupOrder: ["Components", "Hooks", "*", "Interfaces", "Types"],
	sort: ["alphabetical-ignoring-documents"],
	expandParameters: true,
	expandObjects: true,
	pageTitleTemplates: {
		member: formatPageTitle,
	},
};

PACKAGES.forEach(async (path) => {
	const packageDir = PACKAGES_DIR + path;
	const entryPoint = `${packageDir}/src/main.ts`;
	const tsConfig = `${packageDir}/tsconfig.json`;

	const options: TypeDocOptions & PluginOptions = {
		...DEFAULT_OPTIONS,
		entryPoints: [entryPoint],
		tsconfig: tsConfig,
		out: OUT_DIR + path,
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

interface PageData {
	name: string;
	rawName: string;
	kind: string;
	isDeprecated: boolean;
	group?: string;
	codeKeyword?: string;
	keyword?: string;
}

function formatPageTitle({ group, rawName: name }: PageData) {
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
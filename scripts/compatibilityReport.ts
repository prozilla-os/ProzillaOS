import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { Extractor, ExtractorConfig } from "@microsoft/api-extractor";
import { ApiItemKind, ApiModel, type ApiItem, type ApiFunction, type ApiClass, type ApiInterface, type ApiTypeAlias, type ApiEnum, type ApiVariable, type ApiMethod, type ApiMethodSignature, type ApiProperty, type ApiPropertySignature, Excerpt } from "@microsoft/api-extractor-model";
import { Logger, Ansi } from "../packages/shared/src/features";
import { program } from "@commander-js/extra-typings";
import { NestedArray } from "../packages/shared/src/types";

interface PackageEntry {
	path: string;
	name: string;
}

type Change = 
	| { type: "added" | "removed", name: string, isBreaking?: boolean, kind?: ApiItemKind }
	| { type: "before" | "after", value: string, isBreaking?: boolean }
	| { type: "composite", name: string, isBreaking?: boolean, kind?: ApiItemKind, children: Change[] };

interface Analysis {
	packageName: string;
	packageVersion: string;
	status: "ok" | "changed" | "skipped" | "error";
	message?: string;
	changes: Change[];
}

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TEMP_DIR = path.join(ROOT_DIR, "tmp");
const DOWNLOADS_DIR = path.join(TEMP_DIR, "downloads");
const API_JSON_DIR = path.join(TEMP_DIR, "api-json");
const DTS_PATH = "dist/main.d.ts";

const PACKAGE_ENTRIES: PackageEntry[] = [
	{ path: "shared", name: "@prozilla-os/shared" },
	{ path: "skins", name: "@prozilla-os/skins" },
	{ path: "core", name: "@prozilla-os/core" },
	{ path: "dev-tools", name: "@prozilla-os/dev-tools" },
	{ path: "prozilla-os", name: "prozilla-os" },
	{ path: "apps/app-center", name: "@prozilla-os/app-center" },
	{ path: "apps/browser", name: "@prozilla-os/browser" },
	{ path: "apps/calculator", name: "@prozilla-os/calculator" },
	{ path: "apps/file-explorer", name: "@prozilla-os/file-explorer" },
	{ path: "apps/logic-sim", name: "@prozilla-os/logic-sim" },
	{ path: "apps/media-viewer", name: "@prozilla-os/media-viewer" },
	{ path: "apps/settings", name: "@prozilla-os/settings" },
	{ path: "apps/terminal", name: "@prozilla-os/terminal" },
	{ path: "apps/text-editor", name: "@prozilla-os/text-editor" },
];

const logger = new Logger();

function main() {
	const command = program.name("compatibility-report")
		.description("Generates a compatibility report by comparing the local packages with their published versions.")
		.option("--filter <name>", "Check only specific packages (e.g., \"core\", \"shared\")")
		.option("-o, --output <path>", "Write the report to a file")
		.option("-f, --full", "Include packages with no changes in report")
		.option("--no-cache", "Download fresh copies, ignoring cached packages")
		.option("--json", "Output report as JSON instead of plain text")
		.parse(process.argv);

	const options = command.opts();
	const filter = typeof options.filter === "string" ? options.filter : undefined;
	const outputFile = typeof options.output === "string" ? options.output : undefined;
	const fullReport = Boolean(options.full);
	const useCache = options.cache;
	const outputJson = options.json;

	const entries = filter
		? PACKAGE_ENTRIES.filter(({ name, path }) => name.split("/").concat(path.split("/")).includes(filter))
		: PACKAGE_ENTRIES;

	if (!entries.length) {
		logger.error(`No packages match filter: ${filter}`);
		process.exit(1);
	}

	logger.parameter("Filter", filter ?? "all");
	logger.parameter("Packages", entries.length);

	const analyses: Analysis[] = [];
	for (const entry of entries) {
		const packageName = entry.name;
		logger.pending(`Analyzing ${packageName}`);

		const analysis = analyzePackage(entry, useCache);
		analyses.push(analysis);

		switch (analysis.status) {
			case "ok":
				logger.success(`${packageName}: No changes`);
				break;
			case "changed": {
				const count = analysis.changes.length;
				logger.success(`${packageName}: ${count} change${count === 1 ? "" : "s"} found`);
				break;
			}
			case "skipped":
				logger.info(`${packageName}: Skipped (${analysis.message})`);
				break;
			case "error":
				logger.error(`${packageName}: ${analysis.message}`);
				break;
		}
	}

	const report = renderReport(analyses, { fullReport, format: outputJson ? "json" : "txt" });
	if (outputFile) {
		fs.writeFileSync(outputFile, Ansi.strip(report));
		logger.success(`Report written to: ${logger.highlight(outputFile)}`);
	} else {
		logger.newLine().text(report);
	}

	logger.newLine().summary().success("Generated compatibility report");
}

function analyzePackage(entry: PackageEntry, useCache: boolean) {
	const packageDir = path.join(ROOT_DIR, "packages", entry.path);
	const raw = JSON.parse(fs.readFileSync(path.join(packageDir, "package.json"), "utf-8")) as Record<string, unknown>;
	const version = "version" in raw && typeof raw.version === "string" ? raw.version : "0.0.0";

	function createAnalysis({ status, changes, message }: Pick<Analysis, "status"> & Partial<Pick<Analysis, "changes" | "message">>): Analysis {
		return {
			packageName: entry.name,
			packageVersion: version,
			status,
			changes: changes ?? [],
			message,
		};
	}

	const afterDtsPath = path.join(packageDir, DTS_PATH);
	const afterPackageJsonPath = path.join(packageDir, "package.json");
	if (!fs.existsSync(afterDtsPath))
		return createAnalysis({ status: "error", message: `File not found: ${afterDtsPath}` });

	const beforeDir = downloadPublishedPackage(entry.name, path.join(packageDir, "node_modules"), useCache);
	if (!beforeDir)
		return createAnalysis({ status: "skipped", message: "Failed to download latest version" });

	const beforeDtsPath = path.join(beforeDir, DTS_PATH);
	const beforePackageJsonPath = path.join(beforeDir, "package.json");
	if (!fs.existsSync(beforeDtsPath))
		return createAnalysis({ status: "skipped", message: `File not found: ${beforeDtsPath}` });

	const beforeExports = extractExports(beforeDtsPath, beforePackageJsonPath);
	const afterExports = extractExports(afterDtsPath, afterPackageJsonPath);

	if (!beforeExports || !afterExports)
		return createAnalysis({ status: "error", message: "Failed to extract API" });

	const changes = compareExports(beforeExports, afterExports);
	return createAnalysis(changes.length ? { status: "changed", changes } : { status: "ok" });
}

function downloadPublishedPackage(packageName: string, nodeModulesDir: string, useCache: boolean) {
	const targetPath = path.join(DOWNLOADS_DIR, packageName.replace(/^@/, "").replaceAll(/[/@]/g, "-"));

	try {
		const packageDir = path.join(targetPath, "package");
		if (useCache && fs.existsSync(packageDir))
			return packageDir;

		fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
		const npmPackResult = execSync(`npm pack ${packageName}@latest --pack-destination "${DOWNLOADS_DIR}" 2>/dev/null`, {
			encoding: "utf-8",
			stdio: "pipe",
		});
		const tarball = npmPackResult.trim().split("\n")
			.filter(Boolean)
			.find((line) => line.endsWith(".tgz"));
		const tarballPath = tarball ? path.join(DOWNLOADS_DIR, tarball) : "";
		if (!tarball || !fs.existsSync(tarballPath))
			return null;

		fs.rmSync(targetPath, { recursive: true, force: true });
		fs.mkdirSync(targetPath, { recursive: true });
		execSync(`tar xzf "${tarballPath}" -C "${targetPath}"`, { stdio: "pipe" });
		fs.rmSync(tarballPath, { force: true });
		if (!fs.existsSync(packageDir))
			return null;

		try {
			const packageNodeModules = path.join(packageDir, "node_modules");
			fs.symlinkSync(nodeModulesDir, packageNodeModules);
		} catch { /* empty */ }

		return packageDir;
	} catch {
		return null;
	}
}

function extractExports(dtsPath: string, packageJsonPath: string) {
	try {
		fs.mkdirSync(API_JSON_DIR, { recursive: true });

		const exportsMap = new Map<string, ApiItem>();
		const fileName = path.basename(dtsPath).replaceAll(/[^a-zA-Z0-9]/g, "-");
		const apiJsonPath = path.join(API_JSON_DIR, `${fileName}.api.json`);

		const dtsContent = fs.readFileSync(dtsPath, "utf-8").trim();
		if (!dtsContent.replace(/export\s+\*\s+from\s+['"][^'"]+['"]\s*;?\s*\n?/g, "").trim().length)
			return exportsMap;

		const config = ExtractorConfig.prepare({
			configObject: {
				mainEntryPointFilePath: dtsPath,
				projectFolder: path.dirname(packageJsonPath),
				compiler: {
					overrideTsconfig: {
						compilerOptions: {
							noEmit: false,
						},
					},
				},
				docModel: {
					enabled: true,
					apiJsonFilePath: apiJsonPath,
				},
				dtsRollup: { enabled: false },
				apiReport: { enabled: false },
				tsdocMetadata: { enabled: false },
			},
			configObjectFullPath: undefined,
			packageJsonFullPath: packageJsonPath,
		});

		const result = Extractor.invoke(config, {
			localBuild: true,
			showVerboseMessages: false,
			messageCallback: () => {},
		});
		if (!result.succeeded)
			return null;

		const model = new ApiModel();
		model.loadPackage(apiJsonPath);
		for (const packageModel of model.packages) {
			for (const entryPoint of packageModel.entryPoints) {
				for (const member of entryPoint.members) {
					exportsMap.set(member.displayName, member);
				}
			}
		}

		return exportsMap;
	} catch {
		return null;
	}
}

function compareExports(beforeExports: Map<string, ApiItem>, afterExports: Map<string, ApiItem>): Change[] {
	const changes: Change[] = [];

	for (const [name, after] of afterExports) {
		const before = beforeExports.get(name);
		if (!before) {
			changes.push(additionOf(name, after.kind));
		} else if (after.kind !== before.kind) {
			changes.push(compositeOf(name, before.kind, after.kind, true));
		} else {
			const children = compareItems(before, after);
			if (children.length) {
				const hasBreaking = children.some(({ isBreaking }) => isBreaking === true);
				const hasNonBreaking = children.some(({ isBreaking }) => isBreaking === false);
				const isBreaking = hasBreaking ? true : hasNonBreaking ? false : undefined;
				changes.push({ type: "composite", name, kind: after.kind, children, isBreaking });
			}
		}
	}

	for (const [name, before] of beforeExports) {
		if (!afterExports.has(name))
			changes.push(removalOf(name, before.kind));
	}

	return changes;
}

function compareItems(before: ApiItem, after: ApiItem): Change[] {
	switch (before.kind) {
		case ApiItemKind.Function:
			return compareFunctions(before as ApiFunction, after as ApiFunction);
		case ApiItemKind.Method:
		case ApiItemKind.MethodSignature:
			return compareCallables(before as ApiMethod | ApiMethodSignature, after as ApiMethod | ApiMethodSignature);
		case ApiItemKind.Class:
		case ApiItemKind.Interface:
			return compareClassLike(before as ApiClass | ApiInterface, after as ApiClass | ApiInterface);
		case ApiItemKind.TypeAlias:
			return compareTypeAliases(before as ApiTypeAlias, after as ApiTypeAlias);
		case ApiItemKind.Enum:
			return compareEnums(before as ApiEnum, after as ApiEnum);
		case ApiItemKind.Variable:
			return compareVariables(before as ApiVariable, after as ApiVariable);
		case ApiItemKind.Property:
		case ApiItemKind.PropertySignature:
			return compareProperties(before as ApiProperty | ApiPropertySignature, after as ApiProperty | ApiPropertySignature);
		default:
			return [];
	}
}

function compareFunctions(before: ApiFunction, after: ApiFunction): Change[] {
	const changes: Change[] = [];

	const beforeOverloads = before.getMergedSiblings() as ApiFunction[];
	const afterOverloads = after.getMergedSiblings() as ApiFunction[];
	const hasMultipleOverloads = beforeOverloads.length > 1 || afterOverloads.length > 1;

	for (const beforeOverload of beforeOverloads) {
		const afterOverload = afterOverloads.find(({ overloadIndex }) => overloadIndex === beforeOverload.overloadIndex);
		if (!afterOverload) {
			changes.push(removalOf(`Overload ${beforeOverload.overloadIndex}`, ApiItemKind.Function));
		} else {
			const children = compareCallables(beforeOverload, afterOverload);
			if (children.length) {
				if (hasMultipleOverloads) {
					const hasBreaking = children.some(({ isBreaking }) => isBreaking === true);
					const hasNonBreaking = children.some(({ isBreaking }) => isBreaking === false);
					changes.push({ type: "composite", name: `Overload ${beforeOverload.overloadIndex}`, children, isBreaking: hasBreaking ? true : hasNonBreaking ? false : undefined });
				} else {
					changes.push(...children);
				}
			}
		}
	}

	for (const afterOverload of afterOverloads) {
		if (!beforeOverloads.some(({ overloadIndex }) => overloadIndex === afterOverload.overloadIndex))
			changes.push(additionOf(`overload ${afterOverload.overloadIndex}`, ApiItemKind.Function));
	}

	return changes;
}

function compareCallables(before: ApiFunction | ApiMethod | ApiMethodSignature, after: ApiFunction | ApiMethod | ApiMethodSignature): Change[] {
	const changes: Change[] = [];

	const beforeReturnType = before.returnTypeExcerpt.text.trim();
	const afterReturnType = after.returnTypeExcerpt.text.trim();
	if (beforeReturnType !== afterReturnType)
		changes.push(compositeOf("Return type", beforeReturnType, afterReturnType));

	const parameterCount = Math.max(before.parameters.length, after.parameters.length);

	for (let i = 0; i < parameterCount; i++) {
		const beforeParameter = before.parameters[i];
		const afterParameter = after.parameters[i];

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!beforeParameter) {
			changes.push({
				type: "added",
				name: `Parameter ${i + 1} "${afterParameter.name}"`,
				isBreaking: !afterParameter.isOptional,
			});
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		} else if (!afterParameter) {
			changes.push(removalOf(`Parameter ${i + 1} "${beforeParameter.name}"`));
		} else {
			const parameterChanges: Change[] = [];

			if (beforeParameter.name !== afterParameter.name)
				parameterChanges.push(compositeOf("Name", beforeParameter.name, afterParameter.name, false));

			if (beforeParameter.parameterTypeExcerpt.text.trim() !== afterParameter.parameterTypeExcerpt.text.trim())
				parameterChanges.push(compositeOf("Type", beforeParameter.parameterTypeExcerpt.text, afterParameter.parameterTypeExcerpt.text));

			if (beforeParameter.isOptional !== afterParameter.isOptional) {
				const beforeState = beforeParameter.isOptional ? "optional" : "required";
				const afterState = afterParameter.isOptional ? "optional" : "required";
				parameterChanges.push(compositeOf("Optionality", beforeState, afterState, beforeParameter.isOptional));
			}

			if (parameterChanges.length) {
				const hasBreaking = parameterChanges.some(({ isBreaking }) => isBreaking === true);
				const hasNonBreaking = parameterChanges.some(({ isBreaking }) => isBreaking === false);
				changes.push({
					type: "composite",
					name: `Parameter ${i + 1} "${afterParameter.name}"`,
					children: parameterChanges,
					isBreaking: hasBreaking ? true : hasNonBreaking ? false : undefined,
				});
			}
		}
	}

	return changes;
}

function compareClassLike(before: ApiClass | ApiInterface, after: ApiClass | ApiInterface): Change[] {
	const changes: Change[] = [];

	const beforeMembers = new Map(before.members.map((member) => [member.displayName, member]));
	const afterMembers = new Map(after.members.map((member) => [member.displayName, member]));

	for (const [name, afterMember] of afterMembers) {
		const beforeMember = beforeMembers.get(name);
		if (!beforeMember) {
			changes.push(additionOf(name, afterMember.kind));
		} else if (beforeMember.kind !== afterMember.kind) {
			changes.push(compositeOf(name, beforeMember.kind, afterMember.kind, true));
		} else {
			const children = compareItems(beforeMember, afterMember);
			const hasBreaking = children.some(({ isBreaking }) => isBreaking === true);
			const hasNonBreaking = children.some(({ isBreaking }) => isBreaking === false);
			if (children.length)
				changes.push({ type: "composite", name, kind: afterMember.kind, children, isBreaking: hasBreaking ? true : hasNonBreaking ? false : undefined });
		}
	}

	for (const name of beforeMembers.keys()) {
		if (!afterMembers.has(name)) {
			const beforeMember = beforeMembers.get(name);
			if (beforeMember)
				changes.push(removalOf(name, beforeMember.kind));
		}
	}

	return changes;
}

function compareTypeAliases(before: ApiTypeAlias, after: ApiTypeAlias): Change[] {
	return compareTypes(before.typeExcerpt, after.typeExcerpt);
}

function compareEnums(before: ApiEnum, after: ApiEnum): Change[] {
	const changes: Change[] = [];
	const beforeMembers = new Map(before.members.map((member) => [member.name, member]));
	const afterMembers = new Map(after.members.map((member) => [member.name, member]));

	for (const [name, afterMember] of afterMembers) {
		const beforeMember = beforeMembers.get(name);
		if (beforeMember && beforeMember.initializerExcerpt?.text !== afterMember.initializerExcerpt?.text)
			changes.push(compositeOf(`Member "${name}"`, beforeMember.initializerExcerpt?.text, afterMember.initializerExcerpt?.text, true));
	}

	const beforeNames = new Set(beforeMembers.keys());
	const afterNames = new Set(afterMembers.keys());
	for (const name of beforeNames) {
		if (!afterNames.has(name))
			changes.push(removalOf(name));
	}
	for (const name of afterNames) {
		if (!beforeNames.has(name))
			changes.push(additionOf(name));
	}

	return changes;
}

function compareVariables(before: ApiVariable, after: ApiVariable): Change[] {
	return compareTypes(before.variableTypeExcerpt, after.variableTypeExcerpt);
}

function compareProperties(before: ApiProperty | ApiPropertySignature, after: ApiProperty | ApiPropertySignature): Change[] {
	return compareTypes(before.propertyTypeExcerpt, after.propertyTypeExcerpt);
}

function compareTypes(before: Excerpt, after: Excerpt): Change[] {
	const beforeText = before.text.trim();
	const afterText = after.text.trim();
	return beforeText !== afterText ? [compositeOf("Type", beforeText, afterText)] : [];
}

function removalOf(name: string, kind?: ApiItemKind): Change {
	return { type: "removed", name, isBreaking: true, kind };
}

function additionOf(name: string, kind?: ApiItemKind): Change {
	return { type: "added", name, isBreaking: false, kind };
}

function compositeOf(name: string, before?: string, after?: string, isBreaking?: boolean): Change {
	const changes: Change[] = [];
	if (before)
		changes.push({ type: "before", value: before });
	if (after)
		changes.push({ type: "after", value: after });
	return { type: "composite", name, children: changes, isBreaking };
}

function renderReport(analyses: Analysis[], { fullReport, format }: { fullReport: boolean, format: "txt" | "json" }) {
	if (format === "json")
		return JSON.stringify(analyses, null, 2);

	const report = ["=== Compatibility report ==="];

	for (const analysis of analyses) {
		if (!fullReport && analysis.status === "ok")
			continue;

		const lines: NestedArray<string> = [`Package: ${Ansi.bold(analysis.packageName + "@" + analysis.packageVersion)}`];
		let depth = 1;

		function append(...items: NestedArray<string>) {
			for (const line of items) {
				if (!Array.isArray(line)) {
					lines.push("  ".repeat(depth) + line);
				} else if (line.length) {
					depth++;
					append(...line);
					depth--;
				}
			}
		}

		switch (analysis.status) {
			case "ok":
				append(`Status: ${Ansi.green("No changes")}`);
				break;
			case "changed": {
				let breakingLines: NestedArray<string> = [];
				let nonBreakingLines: NestedArray<string> = [];
				let otherLines: NestedArray<string> = [];
				let breakingCount = 0;
				let nonBreakingCount = 0;
				let otherCount = 0;

				for (const change of analysis.changes) {
					if (change.isBreaking === true) {
						breakingCount++;
						breakingLines = breakingLines.concat(renderChange(change));
					} else if (change.isBreaking === false) {
						nonBreakingCount++;
						nonBreakingLines = nonBreakingLines.concat(renderChange(change));
					} else {
						otherCount++;
						otherLines = otherLines.concat(renderChange(change));
					}
				}

				append(`Status: ${breakingCount ? Ansi.red("Major changes") : Ansi.yellow("Minor changes")}`);

				if (nonBreakingCount)
					append(`${Ansi.green("Non-breaking changes")} (${nonBreakingCount}):`, nonBreakingLines);
				if (breakingCount)
					append(`${Ansi.red("Breaking changes")} (${breakingCount}):`, breakingLines);
				if (otherCount)
					append(`${Ansi.yellow("Other changes")} (${otherCount}):`, otherLines);

				break;
			}
			case "skipped":
				append(`Status: ${Ansi.dim("Skipped")} - ${analysis.message}`);
				break;
			case "error":
				append(`Status: ${Ansi.red("Error")} - ${analysis.message}`);
				break;
		}

		report.push(lines.join("\n"));
	}

	return report.join("\n");
}

function renderChange(change: Change): NestedArray<string> {
	switch (change.type) {
		case "added": {
			const kind = change.kind ? ` ${renderKind(change.kind)}` : "";
			return [`${Ansi.green("+")} ${change.name}${kind}`];
		}
		case "removed": {
			const kind = change.kind ? ` ${renderKind(change.kind)}` : "";
			return [`${Ansi.red("-")} ${change.name}${kind}`];
		}
		case "composite": {
			const kind = change.kind ? ` ${renderKind(change.kind)}` : "";
			return [
				`${Ansi.blue("~")} ${change.name}${kind}`,
				...change.children.map(renderChange),
			];
		}
		case "before":
			return [`${Ansi.red("- before:")} ${change.value}`];
		case "after":
			return [`${Ansi.green("+ after:")} ${change.value}`];
	}
}

function renderKind(kind: ApiItemKind) {
	return `[${Ansi.cyan(kind)}]`;
}

try {
	main();
} catch (error) {
	logger.error(error);
	process.exit(1);
}
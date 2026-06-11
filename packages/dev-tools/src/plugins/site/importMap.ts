import { mkdirSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { createRequire } from "node:module";
import type { ManualChunkMeta, OutputBundle, OutputOptions } from "rollup";
import type { Connect, PluginOption, ViteDevServer } from "vite";
import { IncomingMessage, ServerResponse } from "node:http";
import { isObject } from "@prozilla-os/shared/utils";
import { ALWAYS_SHARED_SPECIFIERS, PROZILLA_OS_SCOPE, collectDependencyNames, readPackageJson } from "../_utils/package.utils";

const SHIM_PATH_PREFIX = "/__shim/";
const SHARED_PATH_PREFIX = "/__shared/";
const ASSETS_DIRECTORY = "assets";
const SHIM_DIRECTORY_NAME = "__shim";
const VITE_DEPS_PREFIX = "/node_modules/.vite/deps/";
const PLACEHOLDER_PREFIX = "IMPORT_MAP_PLACEHOLDER_";

const IMPORT_MAP_SCRIPT_TAG = "script" as const;
const IMPORT_MAP_SCRIPT_TYPE = "importmap" as const;

const SHIM_URL_PATTERN = /^\/__shim\/(.+)\.js$/;
const SHARED_URL_PATTERN = /^\/__shared\/(.+)\.js$/;
const RELATIVE_IMPORT_PATTERN = /["']((\.\.?\/)[^"']+)["']/g;

const PRODUCTION_ENV_REPLACEMENT = "\"production\"" as const;
const DEVELOPMENT_ENV_REPLACEMENT = "\"development\"" as const;
const NODE_ENV_REGEX = /process\.env\.NODE_ENV/g;

const NODE_MODULES_MATCH_PREFIX = "/node_modules/";

const COMMON_JS_PACKAGE_CONFIGS = new Map<string, { chunkName: string; isCommonJS: true }>([
	["react", { chunkName: "react", isCommonJS: true }],
	["react/jsx-runtime", { chunkName: "react-jsx-runtime", isCommonJS: true }],
	["react-dom", { chunkName: "react-dom", isCommonJS: true }],
]);

const EXPORT_ORDER = ["module", "import", "default"] as const;
const MAX_EXPORT_DEPTH = 3;
const EXCLUDED_EXPORT_KEYS = new Set(["__esModule", "default"]);

export interface SharedPackage {
	specifier: string;
	chunkName?: string;
	isCommonJS?: boolean;
}

interface ShimEntry {
	urlName: string;
	specifier: string;
}

interface ShimFile {
	path: string;
	code: string;
}

interface DerivedData {
	shimEntries: ShimEntry[];
	chunkPatterns: ChunkPattern[];
	nonChunkEntries: ShimEntry[];
}

interface ChunkPattern {
	chunkName: string;
	subpath: string | undefined;
	pattern: RegExp;
}

/**
 * Options for the {@link importMapPlugin}.
 */
export interface ImportMapPluginOptions {
	/** Packages to expose via import map. When omitted, auto-discovered from the project's package.json. */
	sharedPackages?: SharedPackage[];
	/** Dev-mode import map overrides for packages not handled by CommonJS shims. */
	devImports?: Record<string, string>;
}

/**
 * Vite plugin that generates an import map in order to support dynamically installing apps into ProzillaOS.
 */
export function importMapPlugin(options: ImportMapPluginOptions = {}): PluginOption {
	const { sharedPackages, devImports: userDevImports = {} } = options;

	let isDev = false;
	let projectRoot = "";

	const chunkUrlBySpecifier = new Map<string, string>();
	const viteUrlBySpecifier = new Map<string, string>();
	const pendingShimFiles: ShimFile[] = [];

	const resolvedPackages: SharedPackage[] = sharedPackages ?? [];

	const derivedData: DerivedData = {
		shimEntries: buildShimEntries(resolvedPackages),
		chunkPatterns: computeChunkPatterns(resolvedPackages),
		nonChunkEntries: computeNonChunkEntries(resolvedPackages),
	};

	const exportsCache: Record<string, string[] | undefined> = {};

	return {
		name: "import-map",

		configResolved(config) {
			isDev = config.command === "serve";
			projectRoot = config.root;

			if (sharedPackages != null)
				return;

			const discovered = discoverSharedPackages(projectRoot);
			resolvedPackages.length = 0;
			resolvedPackages.push(...discovered);

			derivedData.shimEntries = buildShimEntries(resolvedPackages);
			derivedData.chunkPatterns = computeChunkPatterns(resolvedPackages);
			derivedData.nonChunkEntries = computeNonChunkEntries(resolvedPackages);
		},

		config(config, _env) {
			const existingOutputs = normalizeOutputOptions(config.build?.rollupOptions?.output);
			const existingInclude = config.optimizeDeps?.include ?? [];

			const wrappedOutputs = existingOutputs.map((existingOutput: OutputOptions) => ({
				...existingOutput,
				manualChunks: (id: string, meta: ManualChunkMeta) => {
					if (typeof existingOutput.manualChunks === "function") {
						const result = existingOutput.manualChunks(id, meta);
						if (result)
							return result;
					}

					return matchChunkPattern(id, derivedData.chunkPatterns);
				},
			}));

			return {
				optimizeDeps: {
					include: [...new Set([
						...existingInclude,
						...derivedData.shimEntries.map((entry) => entry.specifier),
					])],
				},
				build: {
					rollupOptions: {
						output: wrappedOutputs,
					},
				},
			};
		},

		async configureServer(server) {
			await resolveNonChunkViteUrls(server, derivedData.nonChunkEntries, viteUrlBySpecifier, projectRoot);

			server.middlewares.use((request, response, nextMiddleware) => {
				handleSharedRequest(
					request,
					response,
					projectRoot,
					derivedData.nonChunkEntries,
					server
				).then((handled) => {
					if (handled)
						return;

					handleShimRequest(
						request,
						response,
						nextMiddleware,
						projectRoot,
						derivedData.shimEntries,
						exportsCache
					);
				}).catch(() => {
					nextMiddleware();
				});
			});
		},

		transformIndexHtml() {
			return [buildImportMapScript(isDev
				? buildDevImportMap(userDevImports, derivedData, viteUrlBySpecifier)
				: buildBuildImportMap(resolvedPackages)),
			];
		},

		generateBundle(options, bundle) {
			pendingShimFiles.length = 0;

			collectChunkUrls(resolvedPackages, bundle, chunkUrlBySpecifier);
			collectPendingShims(resolvedPackages, chunkUrlBySpecifier, derivedData.shimEntries, projectRoot, options.dir, pendingShimFiles, exportsCache);

			for (const sharedPackage of resolvedPackages) {
				if (sharedPackage.chunkName)
					continue;

				const entryPath = resolveEsmEntry(sharedPackage.specifier, projectRoot);
				const collected = collectAssetFiles(entryPath);

				for (const filePath of collected.filePaths) {
					if (filePath === entryPath)
						continue;

					this.emitFile({
						type: "asset",
						name: basename(filePath),
						source: collected.codeByPath.get(filePath),
					});
				}

				const assetReference = this.emitFile({
					type: "asset",
					name: collected.entryAssetName,
					source: collected.codeByPath.get(entryPath),
				});

				const assetFileName = this.getFileName(assetReference);
				const assetUrl = "/" + assetFileName.replace(/\\/g, "/");
				chunkUrlBySpecifier.set(sharedPackage.specifier, assetUrl);
			}
		},

		writeBundle(options) {
			if (isDev || !options.dir)
				return;

			writeShimFiles(pendingShimFiles, options.dir);
			const resolvedImports = resolveChunkImports(resolvedPackages, chunkUrlBySpecifier, derivedData.shimEntries);
			replacePlaceholdersInHtmlFiles(options.dir, resolvedImports);
		},
	};
}

function buildDevImportMap(userImports: Record<string, string>, derivedData: DerivedData, urlMap: Map<string, string>) {
	const result: Record<string, string> = { ...userImports };
	for (const entry of derivedData.shimEntries) {
		result[entry.specifier] = `${SHIM_PATH_PREFIX}${entry.urlName}.js`;
	}
	for (const entry of derivedData.nonChunkEntries) {
		const resolvedUrl = urlMap.get(entry.specifier);
		result[entry.specifier] = resolvedUrl ?? `${SHARED_PATH_PREFIX}${entry.urlName}.js`;
	}
	return result;
}

function buildBuildImportMap(resolvedPackages: SharedPackage[]) {
	const result: Record<string, string> = {};
	for (const sharedPackage of resolvedPackages) {
		result[sharedPackage.specifier] = toPlaceholder(sharedPackage.specifier);
	}
	return result;
}

function buildImportMapScript(imports: Record<string, string>) {
	return {
		tag: IMPORT_MAP_SCRIPT_TAG,
		attrs: { type: IMPORT_MAP_SCRIPT_TYPE },
		children: JSON.stringify({ imports }),
	};
}

function resolveChunkImports(resolvedPackages: SharedPackage[], chunkUrlBySpecifier: Map<string, string>, shimEntries: ShimEntry[]) {
	const imports: Record<string, string> = {};

	for (const sharedPackage of resolvedPackages) {
		const chunkUrl = chunkUrlBySpecifier.get(sharedPackage.specifier);
		if (!chunkUrl)
			continue;

		if (sharedPackage.isCommonJS) {
			const entry = shimEntries.find((entry) => entry.specifier === sharedPackage.specifier);
			if (entry)
				imports[sharedPackage.specifier] = `${SHIM_PATH_PREFIX}${entry.urlName}.js`;
		} else {
			imports[sharedPackage.specifier] = chunkUrl;
		}
	}

	return imports;
}

function writeShimFiles(shimFiles: ShimFile[], outputDirectory: string) {
	const shimDirectory = resolve(outputDirectory, SHIM_DIRECTORY_NAME);
	mkdirSync(shimDirectory, { recursive: true });

	for (const shim of shimFiles) {
		writeFileSync(shim.path, shim.code);
	}
}

function replacePlaceholdersInHtmlFiles(directory: string, imports: Record<string, string>) {
	if (!Object.keys(imports).length)
		return;

	let htmlFiles: string[];
	try {
		const files = readdirSync(directory);
		htmlFiles = files
			.filter((file) => file.endsWith(".html"))
			.map((file) => resolve(directory, file));
	} catch {
		return;
	}

	if (!htmlFiles.length)
		return;

	for (const htmlPath of htmlFiles) {
		let html: string;
		try {
			html = readFileSync(htmlPath, "utf-8");
		} catch {
			continue;
		}

		for (const [specifier, url] of Object.entries(imports)) {
			html = html.split(toPlaceholder(specifier)).join(url);
		}

		writeFileSync(htmlPath, html);
	}
}

async function resolveNonChunkViteUrls(
	server: ViteDevServer,
	nonChunkEntries: ShimEntry[],
	urlMap: Map<string, string>,
	projectRoot: string
) {
	for (const entry of nonChunkEntries) {
		try {
			const resolved = await server.pluginContainer.resolveId(entry.specifier, undefined);
			if (resolved?.id != null)
				urlMap.set(entry.specifier, toViteUrl(resolved.id, projectRoot));
		} catch { /* empty */ }
	}
}

function collectChunkUrls(resolvedPackages: SharedPackage[], bundle: OutputBundle, urlMap: Map<string, string>) {
	for (const sharedPackage of resolvedPackages) {
		if (sharedPackage.chunkName == null)
			continue;

		for (const chunk of Object.values(bundle)) {
			if (chunk.type !== "chunk" || chunk.name !== sharedPackage.chunkName)
				continue;

			const chunkFileName = chunk.fileName;
			const chunkUrl = "/" + chunkFileName.split("\\").join("/");
			urlMap.set(sharedPackage.specifier, chunkUrl);
			break;
		}
	}
}

function collectPendingShims(
	resolvedPackages: SharedPackage[],
	chunkUrlMap: Map<string, string>,
	shimEntries: ShimEntry[],
	projectRoot: string,
	outputDirectory: string | undefined,
	pendingShims: ShimFile[],
	exportsCache: Record<string, string[] | undefined>
) {
	for (const sharedPackage of resolvedPackages) {
		if (!sharedPackage.isCommonJS || !sharedPackage.chunkName)
			continue;

		const chunkUrl = chunkUrlMap.get(sharedPackage.specifier);
		if (!chunkUrl)
			continue;

		const shimEntry = shimEntries.find((entry) => entry.specifier === sharedPackage.specifier);
		if (!shimEntry)
			continue;

		const exportNames = getExportNames(shimEntry.specifier, projectRoot, exportsCache);
		if (!exportNames.length)
			continue;

		const resolvedDirectory = outputDirectory ?? "dist";
		pendingShims.push({
			path: resolve(resolvedDirectory, SHIM_DIRECTORY_NAME, `${shimEntry.urlName}.js`),
			code: generateShimCode(chunkUrl, exportNames),
		});
	}
}

function collectAssetFiles(entryPath: string) {
	const entryCode = readFileSync(entryPath, "utf-8")
		.replace(NODE_ENV_REGEX, PRODUCTION_ENV_REPLACEMENT);

	const entryAssetName = toUrlName(basename(entryPath, ".js")) + ".js";
	const entryAssetUrl = `/${ASSETS_DIRECTORY}/${entryAssetName}`;

	const assetUrlByPath = new Map<string, string>();
	const codeByPath = new Map<string, string>();
	assetUrlByPath.set(entryPath, entryAssetUrl);
	codeByPath.set(entryPath, entryCode);

	const pendingFiles = [entryPath];
	const visitedFiles = new Set<string>([entryPath]);

	while (pendingFiles.length) {
		const currentPath = pendingFiles.shift();
		if (!currentPath)
			break;

		const currentDirectory = dirname(currentPath);
		const currentCode = codeByPath.get(currentPath);
		if (!currentCode)
			continue;

		let importMatch: RegExpExecArray | null;
		while ((importMatch = RELATIVE_IMPORT_PATTERN.exec(currentCode)) !== null) {
			const capturedPath = importMatch[1];
			const resolvedPath = resolve(currentDirectory, capturedPath);

			if (visitedFiles.has(resolvedPath))
				continue;

			visitedFiles.add(resolvedPath);

			try {
				const chunkCode = readFileSync(resolvedPath, "utf-8");
				codeByPath.set(resolvedPath, chunkCode);
				assetUrlByPath.set(resolvedPath, `/${ASSETS_DIRECTORY}/${basename(resolvedPath)}`);
				pendingFiles.push(resolvedPath);
			} catch { /* empty */ }
		}
	}

	for (const [filePath, code] of codeByPath) {
		codeByPath.set(filePath, rewriteRelativeImports(code, dirname(filePath), assetUrlByPath));
	}

	return {
		entryAssetName,
		filePaths: Array.from(codeByPath.keys()),
		codeByPath,
	};
}

function rewriteRelativeImports(code: string, fileDirectory: string, assetUrlByPath: Map<string, string>) {
	return code.replace(RELATIVE_IMPORT_PATTERN, (match: string, capturedPath: string) => {
		const resolvedPath = resolve(fileDirectory, capturedPath);
		const assetUrl = assetUrlByPath.get(resolvedPath);
		return assetUrl != null ? `"${assetUrl}"` : match;
	});
}

function generateShimCode(chunkUrl: string, exportNames: string[]) {
	return [
		`import * as __raw from "${chunkUrl}";`,
		"const __mod = __raw.default ?? Object.values(__raw)[0] ?? __raw;",
		`const { ${exportNames.join(", ")} } = __mod;`,
		`export { ${exportNames.join(", ")} };`,
		"export default __mod;",
	].join("\n");
}

function matchChunkPattern(id: string, patterns: ChunkPattern[]) {
	for (const { chunkName, pattern, subpath } of patterns) {
		if (pattern.test(id) && (!subpath || id.includes(subpath)))
			return chunkName;
	}
	return null;
}

function normalizeOutputOptions(output: OutputOptions | OutputOptions[] | undefined) {
	if (!output)
		return [{}];
	return Array.isArray(output) ? output : [output];
}

function toUrlName(specifier: string) {
	return specifier.replace(/^@/, "").replace(/[^a-zA-Z0-9]/g, "_");
}

function toViteDependencyName(specifier: string) {
	return specifier.replace(/^@/, "").replace(/\//g, "_");
}

function toViteUrl(resolvedId: string, projectRoot: string) {
	const normalizedId = resolvedId.replace(/\\/g, "/");
	const normalizedRoot = projectRoot.replace(/\\/g, "/") + "/";
	return normalizedId.startsWith(normalizedRoot)
		? "/" + normalizedId.slice(normalizedRoot.length)
		: "/@fs/" + normalizedId;
}

function toPlaceholder(specifier: string) {
	const safe = specifier.replace(/[^a-zA-Z0-9]/g, "_");
	return `__${PLACEHOLDER_PREFIX}${safe}__`;
}

function buildShimEntries(sharedPackages: SharedPackage[]): ShimEntry[] {
	return sharedPackages
		.filter((sharedPackage) => sharedPackage.isCommonJS)
		.map((sharedPackage) => ({
			urlName: toUrlName(sharedPackage.specifier),
			specifier: sharedPackage.specifier,
		}));
}

function computeChunkPatterns(sharedPackages: SharedPackage[]): ChunkPattern[] {
	return sharedPackages
		.filter(({ chunkName }) => chunkName != null)
		.sort((a, b) => b.specifier.length - a.specifier.length)
		.map(({ specifier, chunkName }) => {
			const hasSubpath = specifier.includes("/");
			const matchSpecifier = hasSubpath ? specifier.split("/")[0] : specifier;
			const subpath = hasSubpath ? specifier.slice(matchSpecifier.length + 1) : undefined;
			const escapedSpecifier = matchSpecifier.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			return {
				chunkName: chunkName!,
				subpath,
				pattern: new RegExp(`${NODE_MODULES_MATCH_PREFIX}${escapedSpecifier}(?=[/.])`),
			};
		});
}

function computeNonChunkEntries(sharedPackages: SharedPackage[]) {
	return sharedPackages
		.filter(({ chunkName }) => chunkName == null)
		.map(({ specifier }) => ({
			urlName: toUrlName(specifier),
			specifier,
		}));
}

function discoverSharedPackages(projectRoot: string): SharedPackage[] {
	const packageJson = readPackageJson(projectRoot);
	if (!packageJson)
		return [];

	const dependencies = collectDependencyNames(packageJson);
	const specifiers = new Set(ALWAYS_SHARED_SPECIFIERS);

	for (const dependency of dependencies) {
		if (!dependency.startsWith(PROZILLA_OS_SCOPE))
			continue;

		specifiers.add(dependency);
		const dependencyPackage = readPackageJson(resolve(projectRoot, "node_modules", dependency));
		if (dependencyPackage) {
			for (const transitiveName of collectDependencyNames(dependencyPackage)) {
				specifiers.add(transitiveName);
			}
		}
	}

	return Array.from(specifiers).map((specifier) => {
		const commonJsConfig = COMMON_JS_PACKAGE_CONFIGS.get(specifier);
		return commonJsConfig != null ? { specifier, ...commonJsConfig } : { specifier };
	});
}

function findExportEntryValue(exportObject: Record<string, unknown>, depth = 0): string | null {
	if (depth > MAX_EXPORT_DEPTH)
		return null;

	for (const key of EXPORT_ORDER) {
		const value = exportObject[key];
		if (typeof value === "string")
			return value;

		if (isObject(value)) {
			const nested = findExportEntryValue(value, depth + 1);
			if (nested != null)
				return nested;
		}
	}

	return null;
}

function resolveEsmEntry(specifier: string, projectRoot: string) {
	const require = createRequire(resolve(projectRoot, "package.json"));
	const packageDirectory = resolve(require.resolve(`${specifier}/package.json`), "..");
	const packageJson = readPackageJson(packageDirectory);
	if (!packageJson)
		return resolve(packageDirectory, "index.js");

	const exportsField = packageJson.exports;
	if (isObject(exportsField)) {
		const dotExports = exportsField["."];
		if (isObject(dotExports)) {
			const fromExports = findExportEntryValue(dotExports);
			if (fromExports != null)
				return resolve(packageDirectory, fromExports);
		}
	}

	if (packageJson.module != null)
		return resolve(packageDirectory, packageJson.module);

	return resolve(packageDirectory, packageJson.main ?? "index.js");
}

function getExportNames(specifier: string, root: string, exportsCache: Record<string, string[] | undefined>) {
	const cached = exportsCache[specifier];
	if (cached != null)
		return cached;

	try {
		const projectRequire = createRequire(resolve(root));
		const required: unknown = projectRequire(specifier);
		const names = isObject(required)
			? Object.keys(required).filter((key) => !EXCLUDED_EXPORT_KEYS.has(key))
			: [];

		exportsCache[specifier] = names;
		return names;
	} catch {
		exportsCache[specifier] = [];
		return [];
	}
}

function handleShimRequest(
	request: Connect.IncomingMessage,
	response: ServerResponse<IncomingMessage>,
	nextMiddleware: Connect.NextFunction,
	projectRoot: string,
	shimEntries: ShimEntry[],
	exportsCache: Record<string, string[] | undefined>
) {
	const match = request.url?.match(SHIM_URL_PATTERN);
	if (!match) {
		nextMiddleware();
		return;
	}

	const entry = shimEntries.find((entry) => entry.urlName === match[1]);
	if (!entry) {
		nextMiddleware();
		return;
	}

	const names = getExportNames(entry.specifier, projectRoot, exportsCache);
	if (!names.length) {
		nextMiddleware();
		return;
	}

	const dependencyUrl = `${VITE_DEPS_PREFIX}${toViteDependencyName(entry.specifier)}.js`;
	const code = [
		`import __mod from "${dependencyUrl}";`,
		`const { ${names.join(", ")} } = __mod;`,
		`export { ${names.join(", ")} };`,
		"export default __mod;",
	].join("\n");

	response.setHeader("Content-Type", "application/javascript");
	response.end(code);
}

async function handleSharedRequest(
	request: Connect.IncomingMessage,
	response: ServerResponse<IncomingMessage>,
	projectRoot: string,
	nonChunkEntries: ShimEntry[],
	server?: ViteDevServer
) {
	const match = request.url?.match(SHARED_URL_PATTERN);
	if (!match)
		return false;

	const entry = nonChunkEntries.find((entry) => entry.urlName === match[1]);
	if (!entry)
		return false;

	try {
		const entryPath = resolveEsmEntry(entry.specifier, projectRoot);

		if (server) {
			const viteUrl = toViteUrl(entryPath, projectRoot);
			const transformed = await server.transformRequest(viteUrl);

			if (transformed) {
				response.setHeader("Content-Type", "application/javascript");
				response.end(transformed.code);
				return true;
			}
		}

		const code = readFileSync(entryPath, "utf-8")
			.replace(NODE_ENV_REGEX, DEVELOPMENT_ENV_REPLACEMENT);

		response.setHeader("Content-Type", "application/javascript");
		response.end(code);

		return true;
	} catch {
		return false;
	}
}
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { basename, dirname, resolve } from "path";
import { createRequire } from "node:module";
import type { ExternalOption, ManualChunkMeta, OutputOptions } from "rollup";
import type { Connect, PluginOption, ViteDevServer } from "vite";
import { IncomingMessage, ServerResponse } from "node:http";
import { DEFAULT_SHARED_PACKAGES, type SharedPackage } from "../shared/sharedPackages";

interface ShimEntry {
	urlName: string;
	specifier: string;
}

const exportsCache: Record<string, string[] | undefined> = {};

interface ShimFile {
	path: string;
	code: string;
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
	if (normalizedId.startsWith(normalizedRoot)) {
		return "/" + normalizedId.slice(normalizedRoot.length);
	}
	return "/@fs/" + normalizedId;
}

function buildShimEntries(packages: SharedPackage[]): ShimEntry[] {
	return packages.filter((sharedPackage) => sharedPackage.isCommonJS).map((sharedPackage) => ({
		urlName: toUrlName(sharedPackage.specifier),
		specifier: sharedPackage.specifier,
	}));
}

function wrapExternal(existingExternal: ExternalOption | undefined, specifiers: string[]): (source: string, importer: string | undefined, isResolved: boolean) => boolean | null {
	return function externalChecker(source, importer, isResolved) {
		if (typeof existingExternal === "function") {
			const result = existingExternal(source, importer, isResolved);
			if (result) return true;
		} else if (Array.isArray(existingExternal)) {
			for (const item of existingExternal) {
				if (typeof item === "string" && item === source) return true;
				if (item instanceof RegExp && item.test(source)) return true;
			}
		} else if (existingExternal instanceof RegExp) {
			if (existingExternal.test(source)) return true;
		}

		const matched = !isResolved && specifiers.includes(source);
		if (matched) return true;

		return null;
	};
}

export interface ImportMapPluginOptions {
	/** Packages to expose via import map. Defaults to {@link DEFAULT_SHARED_PACKAGES}. */
	sharedPackages?: SharedPackage[];
	/** Dev-mode import map overrides for packages not handled by CommonJS shims. */
	devImports?: Record<string, string>;
}

/**
 * Vite plugin that generates an import map in order to support dynamically installing apps into ProzillaOS.
 */
export function importMapPlugin(options: ImportMapPluginOptions = {}): PluginOption {
	const { sharedPackages = DEFAULT_SHARED_PACKAGES, devImports: userDevImports = {} } = options;

	const state = { isDev: false };
	let projectRoot = "";

	const chunkUrlBySpecifier = new Map<string, string>();
	const viteUrlBySpecifier = new Map<string, string>();
	const pendingShims: ShimFile[] = [];
	const shimEntries = buildShimEntries(sharedPackages);

	const externalSpecifiers = sharedPackages
		.filter((sharedPackage) => !sharedPackage.chunkName)
		.map((sharedPackage) => sharedPackage.specifier);

	const chunkPatterns = sharedPackages
		.filter((sharedPackage) => sharedPackage.chunkName)
		.sort((a, b) => b.specifier.length - a.specifier.length)
		.map((sharedPackage) => {
			const isSubpathExport = sharedPackage.specifier.includes("/");
			const matchSpecifier = isSubpathExport
				? sharedPackage.specifier.split("/")[0]
				: sharedPackage.specifier;
			const subpath = isSubpathExport
				? sharedPackage.specifier.slice(matchSpecifier.length + 1)
				: undefined;

			const escaped = matchSpecifier.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			return {
				chunkName: sharedPackage.chunkName,
				subpath,
				pattern: new RegExp(
					`/node_modules/${escaped}(?=[/.])`
				),
			};
		});

	const nonChunkEntries = sharedPackages
		.filter((sharedPackage) => !sharedPackage.chunkName)
		.map((sharedPackage) => ({
			urlName: toUrlName(sharedPackage.specifier),
			specifier: sharedPackage.specifier,
		}));

	const commonJSDevImports = Object.fromEntries(
		shimEntries.map((entry) => [entry.specifier, `/__shim/${entry.urlName}.js`])
	);

	return {
		name: "import-map",

		configResolved(config) {
			state.isDev = config.command === "serve";
			projectRoot = config.root;
		},

		config(config, _env) {
			const outputs = config.build?.rollupOptions?.output;
			const existingOutputs = outputs
				? Array.isArray(outputs) ? outputs : [outputs]
				: [{}];

			const existingInclude = config.optimizeDeps?.include ?? [];

			const wrappedOutputs = existingOutputs.map((existingOutput: OutputOptions) => ({
				...existingOutput,
				manualChunks: (id: string, meta: ManualChunkMeta) => {
					if (typeof existingOutput.manualChunks === "function") {
						const result = existingOutput.manualChunks(id, meta);
						if (result) return result;
					}

					for (const { chunkName, pattern, subpath } of chunkPatterns) {
						if (pattern.test(id) && (!subpath || id.includes(subpath))) {
							return chunkName;
						}
					}

					return null;
				},
			}));

			return {
				optimizeDeps: {
					include: [...new Set([
						...existingInclude,
						...shimEntries.map((entry) => entry.specifier),
					])],
				},
				build: {
					rollupOptions: {
						output: wrappedOutputs,
					},
				},
			};
		},

		options(rollupOptions) {
			if (state.isDev) return;

			const existing = rollupOptions.external;
			rollupOptions.external = wrapExternal(
				existing,
				externalSpecifiers
			);
			return rollupOptions;
		},

		async configureServer(server) {
			for (const entry of nonChunkEntries) {
				try {
					const result = await server.pluginContainer.resolveId(entry.specifier, undefined);
					if (result?.id) {
						const viteUrl = toViteUrl(result.id, projectRoot);
						viteUrlBySpecifier.set(entry.specifier, viteUrl);
					}
				} catch { /* empty */ }
			}

			server.middlewares.use((request, response, nextMiddleware) => {
				handleSharedRequest(
					request,
					response,
					projectRoot,
					nonChunkEntries,
					server
				).then((handled) => {
					if (handled) return;

					handleShimRequest(
						request,
						response,
						nextMiddleware,
						projectRoot,
						shimEntries
					);
				}).catch(() => {
					nextMiddleware();
				});
			});
		},

		transformIndexHtml() {
			if (state.isDev) {
				const imports: Record<string, string> = {
					...userDevImports,
					...commonJSDevImports,
				};

				for (const entry of nonChunkEntries) {
					imports[entry.specifier] = viteUrlBySpecifier.get(entry.specifier)
						?? `/__shared/${entry.urlName}.js`;
				}

				return [
					{
						tag: "script",
						attrs: { type: "importmap" },
						children: JSON.stringify({ imports }),
					},
				];
			}

			const imports: Record<string, string> = {};
			for (const sharedPackage of sharedPackages) {
				imports[sharedPackage.specifier] = toPlaceholder(sharedPackage.specifier);
			}

			return [
				{
					tag: "script",
					attrs: { type: "importmap" },
					children: JSON.stringify({ imports }),
				},
			];
		},

		generateBundle(options, bundle) {
			pendingShims.length = 0;

			for (const sharedPackage of sharedPackages) {
				if (!sharedPackage.chunkName) continue;

				for (const [, chunk] of Object.entries(bundle)) {
					if (chunk.type !== "chunk" || chunk.name !== sharedPackage.chunkName)
						continue;

					const chunkUrl = "/" + chunk.fileName.replace(/\\/g, "/");
					chunkUrlBySpecifier.set(sharedPackage.specifier, chunkUrl);

					if (sharedPackage.isCommonJS) {
						const entry = shimEntries.find((entry) => entry.specifier === sharedPackage.specifier);
						if (entry) {
							const names = getExportNames(entry.specifier, projectRoot);
							if (names.length > 0) {
								pendingShims.push({
									path: resolve(options.dir ?? "dist", "__shim", `${entry.urlName}.js`),
									code: [
										`import * as __raw from "${chunkUrl}";`,
										"const __mod = __raw.default ?? Object.values(__raw)[0] ?? __raw;",
										`const { ${names.join(", ")} } = __mod;`,
										`export { ${names.join(", ")} };`,
										"export default __mod;",
									].join("\n"),
								});
							}
						}
					}

					break;
				}
			}

			for (const sharedPackage of sharedPackages) {
				if (sharedPackage.chunkName) continue;

				const entryPath = resolveEsmEntry(sharedPackage.specifier, projectRoot);
				const entryCode = readFileSync(entryPath, "utf-8")
					.replace(/process\.env\.NODE_ENV/g, "\"production\"");

				const entryAssetName = toUrlName(sharedPackage.specifier) + ".js";
				const entryAssetUrl = "/assets/" + entryAssetName;

				const assetUrlByPath = new Map<string, string>();
				const codeByPath = new Map<string, string>();
				assetUrlByPath.set(entryPath, entryAssetUrl);
				codeByPath.set(entryPath, entryCode);

				const pendingFiles = [entryPath];
				const visitedFiles = new Set<string>([entryPath]);
				while (pendingFiles.length > 0) {
					const currentPath = pendingFiles.shift()!;
					const currentDir = dirname(currentPath);
					const currentCode = codeByPath.get(currentPath)!;
					const relativePathRegex = /["']((\.\.?\/)[^"']+)["']/g;
					let importMatch;
					while ((importMatch = relativePathRegex.exec(currentCode)) !== null) {
						const capturedPath = importMatch[1];
						const resolvedPath = resolve(currentDir, capturedPath);
						if (!visitedFiles.has(resolvedPath)) {
							visitedFiles.add(resolvedPath);
							try {
								const chunkCode = readFileSync(resolvedPath, "utf-8");
								codeByPath.set(resolvedPath, chunkCode);
								assetUrlByPath.set(resolvedPath, "/assets/" + basename(resolvedPath));
								pendingFiles.push(resolvedPath);
							} catch {
								/* file not found, skip */
							}
						}
					}
				}

				const rewriteRelativeImports = (code: string, fileDir: string): string =>
					code.replace(/["']((\.\.?\/)[^"']+)["']/g, (match, capturedPath: string) => {
						const resolvedPath = resolve(fileDir, capturedPath);
						const assetUrl = assetUrlByPath.get(resolvedPath);
						return assetUrl ? `"${assetUrl}"` : match;
					});

				for (const [filePath, code] of codeByPath) {
					codeByPath.set(filePath, rewriteRelativeImports(code, dirname(filePath)));
				}

				for (const [filePath, code] of codeByPath) {
					if (filePath === entryPath) continue;
					this.emitFile({
						type: "asset",
						name: basename(filePath),
						source: code,
					});
				}

				const assetRef = this.emitFile({
					type: "asset",
					name: entryAssetName,
					source: codeByPath.get(entryPath)!,
				});

				const assetFileName = this.getFileName(assetRef);
				const assetUrl = "/" + assetFileName.replace(/\\/g, "/");
				chunkUrlBySpecifier.set(sharedPackage.specifier, assetUrl);
			}
		},

		writeBundle(options) {
			if (state.isDev || !options.dir) return;

			const shimDirectory = resolve(options.dir, "__shim");
			mkdirSync(shimDirectory, { recursive: true });

			for (const shim of pendingShims) {
				writeFileSync(shim.path, shim.code);
			}

			const imports: Record<string, string> = {};

			for (const sharedPackage of sharedPackages) {
				const chunkUrl = chunkUrlBySpecifier.get(sharedPackage.specifier);
				if (!chunkUrl) continue;

				if (sharedPackage.isCommonJS) {
					const entry = shimEntries.find((entry) => entry.specifier === sharedPackage.specifier);
					if (entry) {
						imports[sharedPackage.specifier] = `/__shim/${entry.urlName}.js`;
					}
				} else {
					imports[sharedPackage.specifier] = chunkUrl;
				}
			}

			const htmlPath = resolve(options.dir, "index.html");
			let html: string;
			try {
				html = readFileSync(htmlPath, "utf-8");
			} catch {
				return;
			}

			for (const [specifier, url] of Object.entries(imports)) {
				html = html.split(toPlaceholder(specifier)).join(url);
			}

			writeFileSync(htmlPath, html);
		},
	};
}

function resolveEsmEntry(specifier: string, projectRoot: string) {
	const require = createRequire(resolve(projectRoot, "package.json"));
	const packageJsonPath = require.resolve(`${specifier}/package.json`);
	const packageDirectory = resolve(packageJsonPath, "..");
	const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8")) as Record<string, unknown>;

	const findExportEntry = (object: Record<string, unknown>, depth = 0): string | null => {
		if (depth > 3) return null;
		for (const key of ["module", "import", "default"]) {
			const value = object[key];
			if (typeof value === "string") return value;
			if (typeof value === "object" && value !== null) {
				const result = findExportEntry(value as Record<string, unknown>, depth + 1);
				if (result) return result;
			}
		}
		return null;
	};

	const exports = packageJson.exports as Record<string, unknown> | undefined;
	const dotExport = typeof exports?.["."] === "object"
		? exports["."] as Record<string, unknown>
		: undefined;

	if (dotExport) {
		const fromExports = findExportEntry(dotExport);
		if (fromExports) return resolve(packageDirectory, fromExports);
	}

	const moduleField = (packageJson as Record<string, string | undefined>).module;
	if (moduleField) return resolve(packageDirectory, moduleField);

	const mainField = (packageJson as Record<string, string | undefined>).main ?? "index.js";
	return resolve(packageDirectory, mainField);
}

function getExportNames(specifier: string, root: string) {
	let names = exportsCache[specifier];

	if (names)
		return names;

	try {
		const projectRequire = createRequire(resolve(root));
		const namespace = projectRequire(specifier) as Record<string, unknown>;
		names = Object.keys(namespace).filter(
			(key) => key !== "__esModule" && key !== "default"
		);
		exportsCache[specifier] = names;
	} catch {
		names = [];
	}

	return names;
}

function handleShimRequest(
	request: Connect.IncomingMessage,
	response: ServerResponse<IncomingMessage>,
	nextMiddleware: Connect.NextFunction,
	projectRoot: string,
	shimEntries: ShimEntry[]
) {
	const match = request.url?.match(/^\/__shim\/(.+)\.js$/);
	if (!match) {
		nextMiddleware();
		return;
	}

	const shim = shimEntries.find((entry) => entry.urlName === match[1]);
	if (!shim) {
		nextMiddleware();
		return;
	}

	const names = getExportNames(shim.specifier, projectRoot);

	if (names.length === 0) {
		nextMiddleware();
		return;
	}

	const dependencyUrl = `/node_modules/.vite/deps/${toViteDependencyName(shim.specifier)}.js`;
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
	nonChunkEntries: { urlName: string; specifier: string }[],
	server?: ViteDevServer
): Promise<boolean> {
	const match = request.url?.match(/^\/__shared\/(.+)\.js$/);
	if (!match)
		return false;

	const entry = nonChunkEntries.find((entry) => entry.urlName === match[1]);
	if (!entry) {
		return false;
	}

	try {
		const entryPath = resolveEsmEntry(entry.specifier, projectRoot);

		if (server) {
			const viteUrl = toViteUrl(entryPath, projectRoot);
			const result = await server.transformRequest(viteUrl);
			if (result) {
				response.setHeader("Content-Type", "application/javascript");
				response.end(result.code);
				return true;
			}
		}

		const code = readFileSync(entryPath, "utf-8")
			.replace(/process\.env\.NODE_ENV/g, "\"development\"");
		response.setHeader("Content-Type", "application/javascript");
		response.end(code);
	} catch {
		return false;
	}

	return true;
}

function toPlaceholder(specifier: string) {
	const safe = specifier.replace(/[^a-zA-Z0-9]/g, "_");
	return `__IMPORT_MAP_PLACEHOLDER_${safe}__`;
}

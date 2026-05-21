import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import type { ManualChunkMeta, OutputOptions } from "rollup";
import type { PluginOption } from "vite";

interface SharedDep {
	specifier: string;
	chunkName: string;
}

interface ShimEntry {
	urlName: string;
	specifier: string;
}

const DEV_IMPORTS: Record<string, string> = {
	"@prozilla-os/core": "/@id/@prozilla-os/core",
	"@prozilla-os/shared": "/@id/@prozilla-os/shared",
	"react": "/__shim/react.js",
	"react/jsx-runtime": "/__shim/react_jsx-runtime.js",
	"react-dom": "/node_modules/.vite/deps/react-dom_client.js",
};

const SHARED_DEPS: SharedDep[] = [
	{ specifier: "@prozilla-os/core", chunkName: "core" },
	{ specifier: "@prozilla-os/shared", chunkName: "shared" },
	{ specifier: "react", chunkName: "react" },
	{ specifier: "react/jsx-runtime", chunkName: "react-jsx-runtime" },
	{ specifier: "react-dom", chunkName: "react-dom" },
];

const SHIM_ENTRIES: ShimEntry[] = [
	{ urlName: "react", specifier: "react" },
	{ urlName: "react_jsx-runtime", specifier: "react/jsx-runtime" },
];

const EXPORTS_CACHE: Record<string, string[] | undefined> = {};

export function importMapPlugin(): PluginOption {
	let isDev = false;
	let projectRoot = "";

	const chunkUrlBySpecifier = new Map<string, string>();

	return {
		name: "configure-import-map",

		configResolved(config) {
			isDev = config.command === "serve";
			projectRoot = config.root;
			setBrowserHash(projectRoot);
		},

		config(config) {
			const outputs = config.build?.rollupOptions?.output;
			const existingOutputs = outputs
				? Array.isArray(outputs) ? outputs : [outputs]
				: [{ manualChunks: undefined }];

			const existingInclude = config.optimizeDeps?.include ?? [];

			const newOutputs = existingOutputs.map((existingOutput: OutputOptions) => ({
				...existingOutput,
				manualChunks(id: string, meta: ManualChunkMeta) {
					if (typeof existingOutput.manualChunks === "function") {
						const result = existingOutput.manualChunks(id, meta);
						if (result) return result;
					}

					const nodeModule = /[\\/]node_modules[\\/](.+)/.exec(id);
					if (nodeModule) {
						const packagePath = nodeModule[1];
						if (/^react-dom[\\/]/.test(packagePath))
							return "react-dom";
						if (/^react[\\/]/.test(packagePath) || packagePath === "react")
							return /jsx-runtime/.test(packagePath) ? "react-jsx-runtime" : "react";
						if (/^@prozilla-os[\\/]core/.test(packagePath))
							return "core";
						if (/^@prozilla-os[\\/]shared/.test(packagePath))
							return "shared";
					}

					if (id.includes("packages/core"))
						return "core";
					if (id.includes("packages/shared"))
						return "shared";

					return null;
				},
			}));

			return {
				optimizeDeps: {
					include: [...new Set([...existingInclude, "react/jsx-runtime"])],
				},
				build: {
					rollupOptions: {
						output: newOutputs,
					},
				},
			};
		},

		configureServer(server) {
			server.middlewares.use((request, response, nextMiddleware) => {
				void handleShimRequest(request, response, nextMiddleware, projectRoot);
			});
		},

		transformIndexHtml() {
			if (isDev) {
				return [
					{
						tag: "script",
						attrs: { type: "importmap" },
						children: JSON.stringify({ imports: DEV_IMPORTS }),
					},
				];
			}

			const imports: Record<string, string> = {};
			for (const dep of SHARED_DEPS) {
				imports[dep.specifier] = placeholderFor(dep.specifier);
			}

			return [
				{
					tag: "script",
					attrs: { type: "importmap" },
					children: JSON.stringify({ imports }),
				},
			];
		},

		generateBundle(_options, bundle) {
			for (const dep of SHARED_DEPS) {
				for (const [, chunk] of Object.entries(bundle)) {
					if (chunk.type === "chunk" && chunk.name === dep.chunkName) {
						const url = "/" + chunk.fileName.replace(/\\/g, "/");
						chunkUrlBySpecifier.set(dep.specifier, url);
						break;
					}
				}
			}
		},

		writeBundle(options) {
			if (isDev || !options.dir) return;

			const htmlPath = resolve(options.dir, "index.html");
			let html: string;
			try {
				html = readFileSync(htmlPath, "utf-8");
			} catch {
				return;
			}

			for (const dep of SHARED_DEPS) {
				const url = chunkUrlBySpecifier.get(dep.specifier);
				if (!url) continue;
				html = html.split(placeholderFor(dep.specifier)).join(url);
			}

			writeFileSync(htmlPath, html);
		},
	};
}

let browserHash = "";

function setBrowserHash(root: string): void {
	try {
		const metadataPath = resolve(root, "node_modules/.vite/deps/_metadata.json");
		const metadata = JSON.parse(readFileSync(metadataPath, "utf-8")) as { browserHash: string };
		browserHash = metadata.browserHash;
	} catch {
		// metadata not ready yet
	}
}

async function handleShimRequest(
	request: { url?: string },
	response: { setHeader: (key: string, value: string) => void; end: (data: string) => void },
	nextMiddleware: () => void,
	projectRoot: string
): Promise<void> {
	const match = request.url?.match(/^\/__shim\/(.+)\.js$/);
	if (!match) {
		nextMiddleware();
		return;
	}

	const shim = SHIM_ENTRIES.find((entry) => entry.urlName === match[1]);
	if (!shim) {
		nextMiddleware();
		return;
	}

	try {
		let exportNames = EXPORTS_CACHE[shim.specifier];

		if (!exportNames) {
			const { createRequire } = await import("node:module");
			const projectRequire = createRequire(resolve(projectRoot, "noop.js"));
			const namespace = projectRequire(shim.specifier) as Record<string, unknown>;
			exportNames = Object.keys(namespace).filter(
				(key) => key !== "__esModule" && key !== "default"
			);
			EXPORTS_CACHE[shim.specifier] = exportNames;
		}

		if (exportNames.length === 0) {
			nextMiddleware();
			return;
		}

		if (!browserHash) setBrowserHash(projectRoot);
		if (!browserHash) {
			nextMiddleware();
			return;
		}

		const depUrl = `/node_modules/.vite/deps/${shim.urlName}.js?v=${browserHash}`;
		const code = [
			`import __mod from "${depUrl}";`,
			`const { ${exportNames.join(", ")} } = __mod;`,
			`export { ${exportNames.join(", ")} };`,
			"export default __mod;",
		].join("\n");

		response.setHeader("Content-Type", "application/javascript");
		response.end(code);
	} catch {
		nextMiddleware();
	}
}

function placeholderFor(specifier: string): string {
	const safe = specifier.replace(/[^a-zA-Z0-9]/g, "_");
	return `__IMPORT_MAP_PLACEHOLDER_${safe}__`;
}

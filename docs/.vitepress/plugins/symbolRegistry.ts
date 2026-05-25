import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { Logger } from "@prozilla-os/shared";
import type { NavigationJSON } from "typedoc-plugin-markdown";

const logger = new Logger({ prefix: "[symbolRegistry]" });

const PACKAGE_PRIORITY = [
	"core",
	"shared",
	"skins",
	"dev-tools",
	"apps/app-center",
	"apps/browser",
	"apps/calculator",
	"apps/file-explorer",
	"apps/logic-sim",
	"apps/media-viewer",
	"apps/settings",
	"apps/terminal",
	"apps/text-editor",
];

export interface SymbolEntry {
	path: string;
	packageName: string;
}

export function buildSymbolRegistry() {
	const registry = new Map<string, SymbolEntry>();
	const seen = new Set<string>();
	const referenceDirectory = fileURLToPath(new URL("../../src/reference", import.meta.url));

	if (!existsSync(referenceDirectory)) {
		return registry;
	}

	const collisions: Array<{ symbol: string; kept: string; skipped: string }> = [];

	for (const packageName of PACKAGE_PRIORITY) {
		const navPath = fileURLToPath(new URL(`../../src/reference/${packageName}/nav.json`, import.meta.url));

		if (!existsSync(navPath))
			continue;

		let navigation: NavigationJSON;
		try {
			const content = readFileSync(navPath, "utf-8");
			navigation = JSON.parse(content) as NavigationJSON;
		} catch (error) {
			logger.warn(`Failed to read nav.json for ${packageName}:`, (error as Error).message);
			continue;
		}

		if (!Array.isArray(navigation))
			continue;

		for (const group of navigation) {
			const children = group.children;
			if (!Array.isArray(children))
				continue;

			for (const child of children) {
				if (!child.title || !child.path)
					continue;

				const cleanPath = child.path.replace(/\.md$/, "");

				const key = child.title + "@" + packageName;
				if (seen.has(key))
					continue;

				seen.add(key);

				if (registry.has(child.title)) {
					const existingEntry = registry.get(child.title)!;
					collisions.push({
						symbol: child.title,
						kept: existingEntry.packageName,
						skipped: packageName,
					});
					continue;
				}

				registry.set(child.title, {
					path: packageName + "/" + cleanPath,
					packageName,
				});
			}
		}
	}

	if (collisions.length > 0) {
		const crossPackageCollisions = collisions.filter(({ kept, skipped }) => kept !== skipped);
		for (const { symbol, kept, skipped } of crossPackageCollisions) {
			logger.warn(`Collision: "${symbol}" exists in both "${kept}" and "${skipped}". Using "${kept}".`);
		}
	}

	return registry;
}

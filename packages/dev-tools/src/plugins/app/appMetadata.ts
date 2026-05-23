import MagicString from "magic-string";
import { readFileSync } from "fs";
import { resolve } from "path";
import { RollupError } from "rollup";
import { Plugin } from "vite";

interface PackageJson {
    name: string;
    version: string;
    author?: string | { name: string };
    homepage?: string;
}

export interface AppMetadataPluginOptions {
	/** Path to the app's entry file, relative to the project root. */
    entryPath: string;
	/** Name of the app class. Defaults to `"App"`. */
    appClass?: string;
}

/**
 * Vite plugin that automatically adds metadata to ProzillaOS apps.
 */
export function appMetadataPlugin({ entryPath, appClass = "App" }: AppMetadataPluginOptions): Plugin {
	return {
		name: "vite-plugin-app-metadata",
		apply: "build",
		transform(code, id) {
			if (!id.includes(entryPath)) return null;

			const rootDir = process.cwd();
			const packageJsonPath = resolve(rootDir, "package.json");

			let packageJson: PackageJson | null = null;
			try {
				const packageJsonContent = readFileSync(packageJsonPath, "utf-8");
				packageJson = JSON.parse(packageJsonContent) as PackageJson | null;
			} catch (error) {
				this.error(error as RollupError);
			}
			if (packageJson === null) return null;

			const { name, version, homepage } = packageJson;
			let { author = "Unknown" } = packageJson;
			if (typeof author === "string") {
				author = author.replace(/<[^>]*>|\([^)]*\)/g, "").trim();
			} else {
				author = author.name;
			}

			// Find instance of app class
			const appInstanceRegex = new RegExp(`const\\s+(\\w+)\\s*=\\s*new\\s+${appClass}(?:<[\\w\\s,]+>)?\\s*\\(([^;]*)\\)\\s*(\\.[\\w]+\\([^)]*\\)\\s*)*;`);
			const match = code.match(appInstanceRegex);

			if (match == null || match.index == null) {
				return this.error("No App instance found in the entry file.");
			}

			const appInstanceName = match[1];

			// Inject code to set metadata of app
			const metadataFields = [`name: "${name}"`, `version: "${version}"`, `author: "${author}"`];
			if (homepage) {
				metadataFields.push(`website: "${homepage}"`);
			}
			const injectCode = `\n${appInstanceName}.setMetadata({ ${metadataFields.join(", ")} });\n`;

			const insertPosition = match.index + match[0].length;
			const magicString = new MagicString(code);
			magicString.appendLeft(insertPosition, injectCode);

			return {
				code: magicString.toString(),
				map: magicString.generateMap({ hires: true }),
			};
		},
	};
}
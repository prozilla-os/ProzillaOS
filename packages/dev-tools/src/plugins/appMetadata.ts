import MagicString from "magic-string";
import { readFileSync } from "fs";
import { resolve } from "path";
import { RollupError } from "rollup";
import { Plugin } from "vite";

interface PackageJson {
    name: string;
    version: string;
    author?: string | { name: string };
}

interface AppMetadataPluginOptions {
    entryPath: string;
    appClass?: string;
}

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

			const { name, version } = packageJson;
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
			const injectCode = `\n${appInstanceName}.setMetadata({ name: "${name}", version: "${version}", author: "${author}" });\n`;

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
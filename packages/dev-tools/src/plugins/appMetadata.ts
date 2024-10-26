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
}

export function appMetadataPlugin({ entryPath }: AppMetadataPluginOptions): Plugin {
	return {
		name: "vite-plugin-app-metadata",
		apply: "build",
		load(id) {
			if (!id.includes(entryPath)) return null;
		
			const rootDir = process.cwd();
			const packageJsonPath = resolve(rootDir, "package.json");
		
			// Read and parse the package.json file
			let packageJson: PackageJson | null = null;
			try {
				const packageJsonContent = readFileSync(packageJsonPath, "utf-8");
				packageJson = JSON.parse(packageJsonContent) as PackageJson;
			} catch (error) {
				this.error(error as RollupError);
			}

			if (!packageJson)
				return null;
		
			const { name, version } = packageJson;
			let { author = "Unknown" } = packageJson;

			if (typeof author == "string") {
				author = author.replace(/<[^>]*>|\([^)]*\)/g, "").trim();
			} else {
				author = author.name;
			}
		
			// Read the source file content
			let code: string | null = null;
			try {
				code = readFileSync(id, "utf-8");
			} catch (error) {
				this.error(error as RollupError);
			}

			if (code == null)
				return null;

			// Find instance of app class
			const appInstanceRegex = /const\s+(\w+)\s*=\s*new\s+App(?:<[\w\s,]+>)?\s*\(([^;]*)\)\s*(\.[\w]+\([^)]*\)\s*)*;/;
			const match = code.match(appInstanceRegex);
		
			if (match) {
				const appInstanceName = match[1];
		
				// Inject code to set metadata of app
				const injectCode = `\n${appInstanceName}.setMetadata({ name: "${name}", version: "${version}", author: "${author}" });\n`;
				const modifiedCode = code.replace(appInstanceRegex, match[0] + injectCode);
		
				return modifiedCode; 
			} else {
				this.warn("No App instance found in the entry file.");
				return null;
			}
		},
	};
}
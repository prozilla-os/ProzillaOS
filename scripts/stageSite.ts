import { ANSI } from "../packages/shared/src/constants";
import { name } from "../package.json";
import fs from "node:fs";
import { BUILD_DIR } from "../demo/src/config/deploy.config";
import { resolve } from "node:path";
import { Print } from "../packages/shared/src/features";

const EXAMPLES = [
	"portfolio",
];

const PACKAGES = [
	{ source: `../demo/${BUILD_DIR}`, destination: "/" },
	{ source: `../docs/${BUILD_DIR}`, destination: "/docs" },
	...EXAMPLES.map((folder) => {
		return {
			source: `../examples/${folder}/${BUILD_DIR}`,
			destination: `/examples/${folder}`,
		};
	}),
];

const TARGET = `../${BUILD_DIR}`;

function stageSite() {
	try {
		Print.parameter("Context", name);
		Print.pending("Staging site...");

		// Copy packages to build directory
		PACKAGES.forEach(({ source, destination }) => {
			const sourceDirectory = resolve(__dirname, source);
			const targetDirectory = resolve(__dirname, TARGET, destination.replace(/^\//, ""));

			if (!fs.existsSync(sourceDirectory)) {
				console.warn(`Directory not found: ${source}`);
				return;
			} else if (!fs.existsSync(resolve(sourceDirectory, "index.html"))) {
				console.warn(`Directory does not contain index.html file: ${source}`);
				return;
			}

			if (!fs.existsSync(targetDirectory))
				fs.mkdirSync(targetDirectory, { recursive: true });

			fs.cpSync(sourceDirectory, targetDirectory, { recursive: true });
			Print.text(`- Copied ${Print.highlight(source.replace(/^\.\.\//, ""))} to ${Print.highlight(destination)}`);
		});

		// Copy git attributes to build directory
		const gitAttributesDirectory = resolve(__dirname, "../.gitattributes");
		if (fs.existsSync(gitAttributesDirectory)) {
			fs.copyFileSync(gitAttributesDirectory, resolve(__dirname, `../${BUILD_DIR}/.gitattributes`));
			Print.text(`- Copied ${Print.highlight(".gitattributes")}`);
		}
		
		Print.newLine().success(`Site staged: ${Print.highlight("./" + BUILD_DIR)}`);
	} catch (error) {
		const errorObj = error as object;
		if ("stdout" in errorObj) {
			Print.error(errorObj.stdout?.toString());
		}
		if ("stderr" in errorObj) {
			Print.error(errorObj.stderr?.toString());
		}

		Print.error(error).error("Staging failed");
		process.exit(1);
	}
}

stageSite();
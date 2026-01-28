import { name } from "../package.json";
import fs from "node:fs";
import { BUILD_DIR } from "../demo/src/config/deploy.config";
import { resolve } from "node:path";
import { Logger } from "../packages/shared/src/features";

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

const logger = new Logger();

function stageSite() {
	try {
		logger.parameter("Context", name);
		logger.pending("Staging site...");

		// Copy packages to build directory
		PACKAGES.forEach(({ source, destination }) => {
			const sourceDirectory = resolve(__dirname, source);
			const targetDirectory = resolve(__dirname, TARGET, destination.replace(/^\//, ""));

			if (!fs.existsSync(sourceDirectory)) {
				logger.warn(`Directory not found: ${source}`);
				return;
			} else if (!fs.existsSync(resolve(sourceDirectory, "index.html"))) {
				logger.warn(`Directory does not contain index.html file: ${source}`);
				return;
			}

			if (!fs.existsSync(targetDirectory))
				fs.mkdirSync(targetDirectory, { recursive: true });

			fs.cpSync(sourceDirectory, targetDirectory, { recursive: true });
			logger.text(`- Copied ${logger.highlight(source.replace(/^\.\.\//, ""))} to ${logger.highlight(destination)}`);
		});

		// Copy git attributes to build directory
		const gitAttributesDirectory = resolve(__dirname, "../.gitattributes");
		if (fs.existsSync(gitAttributesDirectory)) {
			fs.copyFileSync(gitAttributesDirectory, resolve(__dirname, `../${BUILD_DIR}/.gitattributes`));
			logger.text(`- Copied ${logger.highlight(".gitattributes")}`);
		}
		
		logger.newLine().success(`Site staged: ${logger.highlight("./" + BUILD_DIR)}`);
	} catch (error) {
		const errorObj = error as object;
		if ("stdout" in errorObj) {
			logger.error(errorObj.stdout?.toString());
		}
		if ("stderr" in errorObj) {
			logger.error(errorObj.stderr?.toString());
		}

		logger.error(error).error("Staging failed");
		process.exit(1);
	}
}

stageSite();
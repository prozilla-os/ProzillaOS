import { ANSI } from "../packages/shared/src/constants";
import { name } from "../package.json";
import fs from "node:fs";
import { BUILD_DIR } from "../demo/src/config/deploy.config";
import { resolve } from "node:path";

const PACKAGES = [
	{ source: `../demo/${BUILD_DIR}`, path: "/" },
	{ source: `../docs/${BUILD_DIR}`, path: "/docs" }
];

const TARGET = `../${BUILD_DIR}`;

function stageSite() {
	try {
		console.log(`Context: ${ANSI.decoration.bold}${name}${ANSI.reset}\n`);
		console.log(`${ANSI.fg.yellow}Staging site...${ANSI.reset}`);

		// Copy packages to build directory
		PACKAGES.forEach(({ source, path }) => {
			const sourceDirectory = resolve(__dirname, source);
			const targetDirectory = resolve(__dirname, TARGET, path.replace(/^\//, ""));

			if (!fs.existsSync(targetDirectory))
				fs.mkdirSync(targetDirectory, { recursive: true });

			fs.cpSync(sourceDirectory, targetDirectory, { recursive: true });
			console.log(`- Copied ${ANSI.fg.cyan + source.replace(/^\.\.\//, "") + ANSI.reset} to ${ANSI.fg.cyan + path + ANSI.reset}`);
		});

		// Copy git attributes to build directory
		const gitAttributesDirectory = resolve(__dirname, "../.gitattributes");
		if (fs.existsSync(gitAttributesDirectory)) {
			fs.copyFileSync(gitAttributesDirectory, resolve(__dirname, `../${BUILD_DIR}/.gitattributes`));
			console.log(`- Copied ${ANSI.fg.cyan + ".gitattributes" + ANSI.reset}`);
		}
		
		console.log(`\n${ANSI.fg.green}✓ Site staged: ${ANSI.fg.cyan}./${BUILD_DIR + ANSI.reset}`);
	} catch (error) {
		if ((error as Record<string, string>).stdout) {
			console.error((error as Record<string, string>).stdout.toString());
		}
		if ((error as Record<string, string>).stderr) {
			console.error((error as Record<string, string>).stderr.toString());
		}

		console.error(error);
		console.log(`${ANSI.fg.red}⚠ Staging failed${ANSI.reset}`);
		process.exit(1);
	}
}

stageSite();
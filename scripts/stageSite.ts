import { ANSI } from "../packages/core/src/constants";
import { name } from "../package.json";
import fs from "node:fs";
import { BUILD_DIR } from "packages/demo/src/config/deploy.config";
import { resolve } from "node:path";

const PACKAGES = [
	{ source: `../packages/demo/${BUILD_DIR}`, path: "/" },
	{ source: `../packages/docs/${BUILD_DIR}`, path: "/docs" }
];

const TARGET = `../${BUILD_DIR}`;

function stageSite() {
	try {
		console.log(`Context: ${ANSI.decoration.bold}${name}${ANSI.reset}\n`);
		console.log(`${ANSI.fg.yellow}Staging site...${ANSI.reset}`);

		PACKAGES.forEach(({ source, path }) => {
			const sourceDirectory = resolve(__dirname, source);
			const targetDirectory = resolve(__dirname, TARGET, path.replace(/^\//, ""));

			if (!fs.existsSync(targetDirectory))
				fs.mkdirSync(targetDirectory, { recursive: true });

			fs.cpSync(sourceDirectory, targetDirectory, { recursive: true });
			console.log(`- Copied ${ANSI.fg.cyan + source.replace(/^\.\.\//, "") + ANSI.reset} to ${ANSI.fg.cyan + path + ANSI.reset}`);
		});
		
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
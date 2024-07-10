import { ANSI } from "../../core/src/constants";
import { name } from "../package.json";
import fs from "node:fs";
import { resolve } from "node:path";

const BUILD_DIR = "dist";

function stage() {
	try {
		console.log(`Context: ${ANSI.decoration.bold}${name}${ANSI.reset}\n`);

		console.log(`${ANSI.fg.yellow}Staging build...${ANSI.reset}`);
		fs.cpSync(BUILD_DIR, resolve(__dirname, `../../../${BUILD_DIR}/docs/`), { recursive: true });
		console.log(`\n${ANSI.fg.green}✓ Staging complete${ANSI.reset}`);
	} catch (error) {
		console.error(error);
		console.log(`${ANSI.fg.red}⚠ Staging failed${ANSI.reset}`);
		process.exit(1);
	}
}

stage();
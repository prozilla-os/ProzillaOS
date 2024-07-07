import fs from "node:fs";
import path from "node:path";
import { ANSI } from "../../core/src/constants";

const BUILD_DIR = "dist";

function stage() {
	try {
		fs.cpSync(BUILD_DIR, path.resolve(__dirname, `../../../${BUILD_DIR}/docs/`), { recursive: true });
	} catch (error) {
		console.error(error);
		console.log(`${ANSI.fg.red}⚠ Staging failed${ANSI.reset}`);
		process.exit(1);
	}
}

stage();
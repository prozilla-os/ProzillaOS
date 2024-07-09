import { ANSI } from "../../core/src/constants";
import { name } from "../package.json";
import { resolve } from "node:path";
import fs from "node:fs";

const OUTPUT_DIR = "cache";

function getItemType(key: string, value: unknown): string | null {
	if (/^[A-Z_]+$/.test(key))
		return "Constant";

	if (typeof value === "function") {
		if (/^use([A-Z][a-z]*)+$/.test(key)) {
			return "Hook";
		} else if (/^[a-z]+([A-Z][a-z]*)+$/.test(key)) {
			return "Function";
		} else if (/^([A-Z][a-z]*)+$/.test(key)) {
			return "Class";
		}
	}

	return null;
}

function generateContent(key: string, value: unknown, type: string): string {
	const content = [
		"---",
		"outline: deep",
		"---"
	];

	content.push(`\n# ${type}`);

	return content.join("\n");
}

function generateReferencePage(key: string, value: unknown) {
	const type = getItemType(key, value);
	if (type == null) return;

	let directory = "/";

	switch (type) {
		case "Constant":
			directory = "/constants";
			break;
		case "Hook":
			directory = "/hooks";
			break;
		case "Function":
			directory = "/functions";
			break;
		case "Class":
			directory = "/classes";
			break;
	}

	try {
		const path = resolve(__dirname, OUTPUT_DIR, directory);
		if (!fs.existsSync(path)){
			fs.mkdirSync(path, { recursive: true });
		}
	
		// fs.writeFileSync(path, generateContent(key, value, type), { flag: "w+" });
		console.log(`- ${ANSI.fg.cyan}${path}${ANSI.reset}`);
	} catch (error) {
		console.log(`${ANSI.fg.red}⚠ Failed to generate page: ${key}${ANSI.reset}`);
	}
}

async function generateReferencePages() {
	try {
		console.log(`Context: ${ANSI.decoration.bold}${name}${ANSI.reset}\n`);

		console.log(`${ANSI.fg.yellow}Generating reference pages...${ANSI.reset}`);

		const items = await import("packages/core/src/main");

		for (const key in module) {
			if (module.hasOwnProperty(key)) {
				const item = module[key];
				console.log(`Name: ${key}, Type: ${typeof item}, Source: ${modulePath}`);
			}
		}

		// for (const [key, value] of Object.entries(items)) {
		// 	generateReferencePage(key, value);
		// }

		console.log(`\n${ANSI.fg.green}✓ Completed generating reference pages${ANSI.reset}`);
	} catch (error) {
		console.error(error);
		console.log(`${ANSI.fg.red}⚠ Reference pages generation failed${ANSI.reset}`);
		process.exit(1);
	}
}

generateReferencePages();
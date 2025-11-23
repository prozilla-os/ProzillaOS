import { ANSI } from "../../packages/core/src/constants";
import { name } from "../package.json";
import { resolve } from "node:path";
import fs from "node:fs";
import { isValidElement } from "react";

const items = await import("../../packages/core/src/main");

const OUTPUT_DIR = "data";

const MACRO_CASE = /^[A-Z_]+$/;
const SNAKE_CASE = /^[a-z]+([A-Z][a-z]*)+$/;
const PASCAL_CASE = /^([A-Z][a-z]*)+$/;

function getItemType(key: string, value: unknown): string | null {
	if (MACRO_CASE.test(key))
		return "Constant";

	if (typeof value === "function") {
		if (/^use([A-Z][a-z]*)+$/.test(key)) {
			return "Hook";
		} else if (SNAKE_CASE.test(key)) {
			return "Function";
		} else if (PASCAL_CASE.test(key)) {
			if (isValidElement(value)) {
				return "Component";
			} else {
				return "Class";
			}
		}
	}

	return null;
}

function getItemCategory(key: string, value: unknown, type: string): string | null {
	if (type == "Function") {
		if (key.includes("Viewport") || key.endsWith("Url") || key.endsWith("Clipboard")) {
			return "Browser";
		} else if (key.endsWith("Array")) {
			return "Utils";
		} else if (key.endsWith("Time")) {
			return "Time";
		}
	}

	return null;
}

function generateContent(key: string, value: unknown, type: string, category: string | null): string {
	const content: { [key: string]: unknown } = {
		name: key,
		type,
		value,
	};

	if (category != null)
		content.category = category;

	return JSON.stringify(content, null, 4);
}

function generateFile(key: string, value: unknown) {
	const fileName = `${key}.json`;

	const type = getItemType(key, value);
	if (type == null) {
		console.log(`${ANSI.fg.yellow}Skipping item with unknown type:${ANSI.reset} ${key}`);
		return;
	}

	let directory = "/";

	switch (type) {
		case "Constant":
			directory += "constants/";
			break;
		case "Hook":
			directory += "hooks/";
			break;
		case "Function":
			directory += "functions/";
			break;
		case "Class":
			directory += "classes/";
			break;
		case "Component":
			directory += "components/";
			break;
	}

	const category = getItemCategory(key, value, type);

	switch (category) {
		case "Browser":
			directory += "browser/";
			break;
		case "Utils":
			directory += "utils/";
			break;
		case "Time":
			directory += "time/";
			break;
	}

	try {
		const path = resolve(__dirname, `../${OUTPUT_DIR + directory}`);
		if (!fs.existsSync(path)){
			fs.mkdirSync(path, { recursive: true });
		}

		const content = generateContent(key, value, type, category);
	
		fs.writeFileSync(`${path}/${fileName}`, content, { flag: "w+" });
		console.log(`- ${ANSI.fg.cyan}${OUTPUT_DIR + directory}${fileName}${ANSI.reset}`);
	} catch (error) {
		console.error(error);
		console.log(`${ANSI.fg.red}⚠ Failed to generate: ${fileName}${ANSI.reset}`);
	}
}

function generateData() {
	try {
		console.log(`Context: ${ANSI.decoration.bold}${name}${ANSI.reset}\n`);

		console.log(`${ANSI.fg.yellow}Generating data...${ANSI.reset}`);

		for (const [key, value] of Object.entries(items)) {
			generateFile(key, value);
		}

		console.log(`\n${ANSI.fg.green}✓ Completed generating data${ANSI.reset}`);
	} catch (error) {
		console.error(error);
		console.log(`${ANSI.fg.red}⚠ Data generation failed${ANSI.reset}`);
		process.exit(1);
	}
}

void generateData();
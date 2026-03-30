import { readFileSync, writeFileSync, mkdirSync } from "fs";

const source = readFileSync("src/main.ts", "utf-8");

const content = source
	.split("\n")
	.filter((line) => line.startsWith("export * from"))
	.join("\n");

mkdirSync("dist", { recursive: true });
writeFileSync("dist/main.d.ts", content + "\n");

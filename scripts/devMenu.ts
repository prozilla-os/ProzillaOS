import { spawn, execSync } from "node:child_process";
import type { Logger } from "../packages/shared/src/features";

let logger: Logger | undefined;

async function main() {
	const { interactiveListPrompt, Logger, ANSI_LOGO_COLOR, ASCII_LOGO, ANSI } = await loadModules();

	logger = new Logger();
	logger.text(ANSI_LOGO_COLOR + ASCII_LOGO + ANSI.reset);

	const answer = await interactiveListPrompt({
		message: "Select a task to run:",
		choices: [
			{ name: "Start demo", value: "demo:start", key: "s" },
			{ name: "Start docs", value: "docs:start", key: "d" },
			{ name: "Run tests", value: "test", key: "t" },
			{ name: "Preview build", value: "preview", key: "p" },
			{ name: "Generate compatibility report", value: "report", key: "c" },
			{ name: "None", value: "", key: "n" },
		],
	});

	if (!answer)
		return;

	const child = spawn(`pnpm run ${answer}`, { stdio: "inherit", shell: true });
	child.on("exit", (code) => process.exit(code ?? 0));
}

async function loadModules() {
	try {
		return await importModules();
	} catch (error) {
		if (isPackageMissing(error)) {
			const script = process.env.npm_lifecycle_event;
			if (!script)
				throw new Error("Cannot restart: npm_lifecycle_event is not defined");

			console.log("Missing package detected, building packages...");
			execSync("pnpm run libs:build", { stdio: "inherit" });
			execSync(`pnpm run ${script}`, { stdio: "inherit" });
			process.exit(0);
		} else {
			throw error;
		}
	}
}

// Dynamically load modules because they will fail to load if their local dependencies haven't been built yet.
// As this script is meant to run when a user opens this project (which could be their first time),
// the packages might not have been built yet. 
async function importModules() {
	return {
		...await import("../packages/dev-tools/src/features"),
		...await import("../packages/shared/src/features"),
		...await import("../packages/core/src/constants"),
		...await import("../packages/shared/src/constants"),
	};
}

function isPackageMissing(error: unknown) {
	return error instanceof Error && (
		error.message.includes("Cannot find package")
		|| (error as NodeJS.ErrnoException).code === "ERR_CLOSED_SERVER"
	);
}

main().catch((error) => {
	if (logger) {
		logger.error(error);
	} else {
		console.error(error);
	}
	process.exit(1);
});
#!/usr/bin/env node

import { ExecutableResolver, Shell } from "@prozilla-os/core";
import { HeadlessShell } from "./features";
import { Command } from "@commander-js/extra-typings";
import { existsSync, readFileSync } from "node:fs";
import { Ansi } from "@prozilla-os/shared/logging";
import { version } from "../package.json";

process.title = "posh";

function error(message: string) {
	process.stderr.write(Ansi.red(`posh: ${message}\n`));
	process.exit(1);
}

await ExecutableResolver.loadBuiltins();
const posh = ExecutableResolver.getBuiltin("posh");
if (!posh)
	error("Failed to resolve executable");

const program = new Command();
program.name("posh");
if (posh?.manual?.description)
	program.description(posh.manual.description);
if (posh?.manual?.usage)
	program.usage(posh.manual.usage.replace("posh ", ""));

program
	.allowExcessArguments(true)
	.option("-c", posh?.manual?.options?.["-c"])
	.version(version, "-v, --version")
	.action(async (options) => {
		const shell = new HeadlessShell();

		let exitCode: number;
		if (options.c) {
			if (!program.args.length) {
				return error("-c: Option requires an argument");
			}

			const input = program.args.map(HeadlessShell.quote).join(" ");
			exitCode = await shell.start(input);
		} else if (program.args.length) {
			const path = program.args[0];

			if (!existsSync(path)) {
				return error(`${path}: ${Shell.INVALID_PATH_ERROR}`);
			}

			const input = readFileSync(path, "utf-8");
			exitCode = await shell.start(input);
		} else {
			exitCode = await shell.start();
		}

		process.exit(exitCode);
	});

program.parse(process.argv);
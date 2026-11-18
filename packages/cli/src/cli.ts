#!/usr/bin/env node

import { HeadlessShell } from "./features";

const shell = new HeadlessShell();
const input = process.argv.slice(2).map(HeadlessShell.quote).join(" ");

const exitCode = await shell.start(input);
process.exit(exitCode);
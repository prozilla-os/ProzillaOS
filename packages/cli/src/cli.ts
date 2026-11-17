#!/usr/bin/env node

import { Shell } from "@prozilla-os/core";
import { HeadlessShell } from "./features";

const shell = new HeadlessShell();
const input = process.argv.slice(2).map(Shell.quote).join(" ");

const exitCode = await shell.start(input);
process.exit(exitCode);
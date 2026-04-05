import { test as base } from "vitest";
import { extend } from "@prozilla-os/dev-tools";
import { isValidInteger, isValidNumber } from "../src/features";

const test = extend(base);

test.simpleCases(isValidInteger, [
	[0, true],
	[42, true],
	[-7, true],
	[3.14, true],

	["0", true],
	["42", true],
	["-7", true],
	["1e3", true],
	["3.0", true],

	["3.14", false],
	["1e1.5", false],
	["abc", false],
	["12abc", false],
	["Infinity", false],
	["", false],
	["   ", false],
]);

test.simpleCases(isValidNumber, [
	[0, true],
	[42, true],
	[-7, true],
	[3.14, true],

	["0", true],
	["42", true],
	["-7", true],
	["3.14", true],
	["1e3", true],
	["Infinity", true],

	["abc", false],
	["12abc", false],
	["", false],
	["   ", false],
]);
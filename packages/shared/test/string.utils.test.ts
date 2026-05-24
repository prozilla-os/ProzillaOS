import { test as base } from "vitest";
import { extend } from "@prozilla-os/dev-tools";
import { kebabToCamelCase, parseBool } from "../src/features";

const test = extend(base);

test.simpleCases(parseBool, [
	["true", true],
	["True", true],
	["TRUE", true],
	["TrUe", true],
	["tRuE", true],
	["   true   ", true],
	["false", false],
	["False", false],
	["FALSE", false],
	["FaLsE", false],
	["fAlSe", false],
	["   false   ", false],
	["This is not a bool.", false],
	["", false],
]);

test.simpleCases(kebabToCamelCase, [
	["foo-bar", "fooBar"],
	["short", "short"],
	["", ""],
]);
import { test as base } from "vitest";
import { extend } from "@prozilla-os/dev-tools";
import { isObject, mergeDeep } from "../src/features";

const test = extend(base);

test.simpleCases(isObject, [
	[true, false],
	[false, false],
	["foo", false],
	["", false],
	[0, false],
	[1, false],
	[null, false],
	[undefined, false],
	[[], false],
	[[true], false],
	[["foo"], false],
	[[{ foo: "bar" }], false],
	[{ foo: "bar" }, true],
	[{}, true],
	[{ a: "b", c: "d", e: 6 }, true],
]);

test.cases(mergeDeep, [
	[[{}, {}], {}],
	[[{ value: "foo" }, { value: "bar" }], { value: "bar" }],
	[[{ values: ["foo"] }, { values: ["bar"] }], { values: ["foo", "bar"] }],
	[[{ values: ["foo"] }, { values: "bar" }], { values: "bar" }],
	[[{ values: "foo" }, { values: ["bar"] }], { values: ["bar"] }],
	[[{ a: "b", c: "d", e: 6 }, {}], { a: "b", c: "d", e: 6 }],
	[[{ a: "b", c: "d", e: 6 }, { e: null }], { a: "b", c: "d", e: null }],
	[[{ a: "b", c: "d", e: 6 }, { e: 5 }], { a: "b", c: "d", e: 5 }],
]);
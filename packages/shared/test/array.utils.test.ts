import { expect, test as base } from "vitest";
import { randomFromArray, removeDuplicatesFromArray, removeFromArray } from "../src/features";
import { extend } from "@prozilla-os/dev-tools";

const test = extend(base);

test.each([
	[1, [2, 3]],
	[3, [1, 2]],
	[0, [1, 2, 3]],
])("removeFromArray(%d, [1, 2, 3]) -> %o", (item, expected) => {
	const array = [1, 2, 3];
	removeFromArray(item, array);
	expect(array).toStrictEqual(expected);
});

test("randomFromArray", { repeats: 5 }, () => {
	const array = [1, 2, 3, 4, 5];
	expect(randomFromArray(array)).toBeOneOf(array);
});

test.simpleCases(removeDuplicatesFromArray, [
	[[1, 2, 3], [1, 2, 3]],
	[[1, 1, 1], [1]],
	[[1, 2, 2, 3], [1, 2, 3]],
	[[], []],
	[[1, 1, 2, 2, 3, 3], [1, 2, 3]],
]);
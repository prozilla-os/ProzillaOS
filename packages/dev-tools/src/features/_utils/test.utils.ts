import { expect, TestAPI } from "vitest";

function testSimpleCases<A = unknown, R = undefined>(test: TestAPI, func: (arg: A) => R, cases: [A, R][]) {
	return testCases(test, func, cases.map(([arg, expected]) => [[arg], expected]));
}

function testCases<A extends unknown[] = [], R = undefined>(test: TestAPI, func: (...args: A) => R, cases: [A, R][]) {
	return test.each(cases)(`${func.name}(...%o) -> %o`, (args, expected) => {
		const assertion = expect(func(...args));
		if (Array.isArray(expected)) {
			assertion.toStrictEqual(expected);
		} else {
			assertion.toBe(expected);
		}
	});
}

export interface CustomTestAPI {
	simpleCases: <A = unknown, R = undefined>(func: (arg: A) => R, cases: [A, R][]) => void;
	cases: <A extends unknown[] = [], R = undefined>(func: (...args: A) => R, cases: [A, R][]) => void;
}

export type ExtendedTestAPI = TestAPI & CustomTestAPI;

/**
 * Extends Vitest's {@link TestAPI} with functions from the {@link CustomTestAPI}.
 * @param test - The Vitest test API.
 * @returns The extended test API.
 * @example
 * import { test as base } from "vitest";
 * 
 * const test = extend(base);
 */
export function extend(test: TestAPI): ExtendedTestAPI {
	return Object.assign(test, {
		simpleCases: (func, cases) => testSimpleCases(test, func, cases),
		cases: (func, cases) => testCases(test, func, cases),
	} satisfies CustomTestAPI);
}
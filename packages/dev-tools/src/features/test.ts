import { Ansi } from "@prozilla-os/shared";
import { inspect, InspectOptions } from "node:util";
import { expect, TestAPI } from "vitest";

function testSimpleCases<A = unknown, R = undefined>(test: TestAPI, func: (arg: A) => R, cases: [A, R][]) {
	return testCases(test, func, cases.map(([arg, expected]) => [[arg], expected]));
}

function testCases<A extends unknown[] = [], R = undefined>(test: TestAPI, func: (...args: A) => R, cases: [A, R][]) {
	return test.each(
		cases.map(([args, expected]) => [
			formatFunction(func, args, expected),
			args,
			expected,
		])
	)("%s", (_title, args, expected) => {
		const assertion = expect(func(...args));
		if (typeof expected === "object") { // Object or array
			assertion.toStrictEqual(expected);
		} else {
			assertion.toBe(expected);
		}
	});
}

function formatFunction<A extends unknown[] = [], R = undefined>(func: (...args: A) => R, args: A, returnValue: R, options: { colors?: boolean } = {}) {
	const { colors = true } = options;
	const formattedName = colors ? Ansi.blue(func.name) : func.name;
	const formattedArgs = args.map((arg) => format(arg, { colors })).join(", ");
	const formattedReturnValue = format(returnValue, { colors });
	return `${formattedName}(${formattedArgs}) ${colors ? Ansi.dim("🠆") : "🠆"} ${formattedReturnValue}`;
}

function format(object: unknown, options?: InspectOptions) {
	return inspect(object, options);
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
import { expect, test } from "vitest";

export function testSimpleFunction<A = unknown, R = undefined>(func: (arg: A) => R, cases: [A, R][]) {
	return testFunction(func, cases.map(([arg, expected]) => [[arg], expected]));
}

export function testFunction<A extends unknown[] = [], R = undefined>(func: (...args: A) => R, cases: [A, R][]) {
	return test.each(cases)(`${func.name}(...%o) -> %o`, (args, expected) => {
		const assertion = expect(func(...args));
		if (Array.isArray(expected)) {
			assertion.toStrictEqual(expected);
		} else {
			assertion.toBe(expected);
		}
	});
}
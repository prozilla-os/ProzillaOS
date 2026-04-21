import { describe, it, expect, beforeEach } from "vitest";
import { ArithmeticEnvironment, ArithmeticParser, ArithmeticParserResult } from "../../../../src/features/shell/arithmetic/arithmeticParser";

describe("ArithmeticParser", () => {
	let environment: ArithmeticEnvironment;
	let parser: ArithmeticParser;
	let store: Map<string, string>;

	beforeEach(() => {
		store = new Map();
		environment = {
			get: (name: string) => {
				return store.get(name);
			},
			set: (name: string, value: string) => {
				store.set(name, value);
			},
		};
		parser = new ArithmeticParser(environment);
	});

	/**
     * Helper to extract value from a successful Result or fail the test.
     */
	const assertSuccess = (result: ArithmeticParserResult, expected: number) => {
		expect(result.isOk(), `Expected success but got error: ${result.match(() => "", (error) => error)}`).toBe(true);
		const actual = result.match((value) => value, (error) => {
			throw new Error(`Unexpected failure: ${error}`);
		});
		expect(actual).toBe(expected);
	};

	it("should evaluate basic arithmetic with correct precedence", () => {
		assertSuccess(parser.evaluate("1 + 2 * 3"), 7);
		assertSuccess(parser.evaluate("(1 + 2) * 3"), 9);
		assertSuccess(parser.evaluate("10 / 3"), 3);
		assertSuccess(parser.evaluate("2 ** 3 ** 2"), 512);
		assertSuccess(parser.evaluate("10 % 3"), 1);
	});

	it("should handle unary operators", () => {
		assertSuccess(parser.evaluate("-5"), -5);
		assertSuccess(parser.evaluate("-(-5)"), 5);
		assertSuccess(parser.evaluate("!0"), 1);
		assertSuccess(parser.evaluate("!5"), 0);
		assertSuccess(parser.evaluate("~0"), -1);
	});

	it("should handle bitwise operators", () => {
		assertSuccess(parser.evaluate("5 & 3"), 1);
		assertSuccess(parser.evaluate("5 | 3"), 7);
		assertSuccess(parser.evaluate("5 ^ 3"), 6);
		assertSuccess(parser.evaluate("1 << 2"), 4);
		assertSuccess(parser.evaluate("8 >> 1"), 4);
	});

	it("should handle logical and comparison operators", () => {
		assertSuccess(parser.evaluate("1 && 0"), 0);
		assertSuccess(parser.evaluate("1 || 0"), 1);
		assertSuccess(parser.evaluate("5 > 3"), 1);
		assertSuccess(parser.evaluate("5 <= 2"), 0);
		assertSuccess(parser.evaluate("10 == 10"), 1);
		assertSuccess(parser.evaluate("10 != 10"), 0);
	});

	it("should process ternary expressions", () => {
		assertSuccess(parser.evaluate("1 ? 10 : 20"), 10);
		assertSuccess(parser.evaluate("0 ? 10 : 20"), 20);
		assertSuccess(parser.evaluate("1 ? 2 ? 3 : 4 : 5"), 3);
	});

	it("should interact with the environment for variables", () => {
		store.set("x", "10");
		assertSuccess(parser.evaluate("x + 5"), 15);
	});

	it("should perform assignments and update the environment", () => {
		assertSuccess(parser.evaluate("y = 5"), 5);
		expect(store.get("y")).toBe("5");
        
		assertSuccess(parser.evaluate("y += 10"), 15);
		expect(store.get("y")).toBe("15");
	});

	it("should handle prefix and postfix increment/decrement", () => {
		store.set("counter", "10");
        
		assertSuccess(parser.evaluate("++counter"), 11);
		expect(store.get("counter")).toBe("11");

		assertSuccess(parser.evaluate("counter++"), 11);
		expect(store.get("counter")).toBe("12");
	});

	it("should return a Failure result for invalid syntax", () => {
		const ternaryResult = parser.evaluate("1 ? 2");
		expect(ternaryResult.isError()).toBe(true);
        
		ternaryResult.match(
			() => {
				throw new Error("Should have failed");
			},
			(error) => {
				expect(error).toBe("Expected ':' in ternary expression");
			}
		);

		const parenResult = parser.evaluate("(1 + 2");
		expect(parenResult.isError()).toBe(true);
	});
});
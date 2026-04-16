import { describe, it, expect, beforeEach } from "vitest";
import { ShellEnvironment } from "../../../src/features";

describe("ShellEnvironment", () => {
	let env: ShellEnvironment;

	beforeEach(() => {
		env = new ShellEnvironment({ USER: "prozilla", TEST: "123" });
	});

	it("should get existing variables", () => {
		expect(env.get("USER")).toBe("prozilla");
		expect(env.get("TEST")).toBe("123");
	});

	it("should return undefined for non-existent variables", () => {
		expect(env.get("NON_EXISTENT")).toBeUndefined();
	});

	it("should inherit variables from parent scope", () => {
		const childEnv = env.fork();
		expect(childEnv.get("USER")).toBe("prozilla");
	});

	it("should override parent variables in child scope without affecting parent", () => {
		const childEnv = env.fork();
		childEnv.set("USER", "root");
        
		expect(childEnv.get("USER")).toBe("root");
		expect(env.get("USER")).toBe("prozilla");
	});

	// it("should expand variables in a string", () => {
	// 	env.set("NAME", "world");
	// 	expect(env.expand("hello $NAME")).toBe("hello world");
	// 	expect(env.expand("val: ${TEST}")).toBe("val: 123");
	// });

	// it("should expand internal variables", () => {
	// 	env.set("?", "127");
	// 	expect(env.expand("exit code: $?")).toBe("exit code: 127");
	// });

	it("should parse and set assignments", () => {
		const success = env.parseAssignment("FOO=bar");
		expect(success).toBe(true);
		expect(env.get("FOO")).toBe("bar");
	});

	it("should handle quoted values in assignments", () => {
		env.parseAssignment("GREETING=\"hello world\"");
		expect(env.get("GREETING")).toBe("hello world");
	});

	it("should track exported variables separately from internal ones", () => {
		env.set("INTERNAL", "secret", false);
		env.set("EXPORTED", "public", true);

		const exported = env.exportedVariables;
		expect(exported.EXPORTED).toBe("public");
		expect(exported.INTERNAL).toBeUndefined();
		expect(exported["?"]).toBeUndefined();
	});

	it("should not export variables in INTERNAL_VARS even if requested", () => {
		env.set("?", "1", true);
		expect(env.exportedVariables["?"]).toBeUndefined();
	});

	it("should combine parent exported variables in child scope", () => {
		env.set("PARENT_VAR", "parent", true);
		const childEnv = env.fork();
		childEnv.set("CHILD_VAR", "child", true);

		const exported = childEnv.exportedVariables;
		expect(exported.PARENT_VAR).toBe("parent");
		expect(exported.CHILD_VAR).toBe("child");
	});
});
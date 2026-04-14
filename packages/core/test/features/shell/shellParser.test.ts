import { describe, it, expect } from "vitest";
import { ShellParser } from "../../../src/features/shell/shellParser";
import { Command } from "../../../src/features/shell/command";

describe("ShellParser", () => {
	describe("parseScript", () => {
		it("should parse simple commands into an AST", () => {
			const script = "echo hello; ls -la";
			const block = ShellParser.parseScript(script);

			expect(block).toHaveLength(2);
			expect(block[0]).toEqual({ type: ShellParser.NODE_COMMAND, command: "echo hello" });
			expect(block[1]).toEqual({ type: ShellParser.NODE_COMMAND, command: "ls -la" });
		});

		it("should parse an if-then-else structure", () => {
			const script = `
				if true; then
					echo "yes"
				else
					echo "no"
				fi
			`;
			const nodes = ShellParser.parseScript(script);

			expect(nodes).toHaveLength(1);
			const node = nodes[0];
			if (node.type === "if") {
				expect(node.condition).toBe("true");
				expect(node.thenBranch).toHaveLength(1);
				expect(node.thenBranch[0]).toEqual({ type: ShellParser.NODE_COMMAND, command: "echo \"yes\"" });
				expect(node.elseBranch).toHaveLength(1);
				expect(node.elseBranch[0]).toEqual({ type: ShellParser.NODE_COMMAND, command: "echo \"no\"" });
			} else {
				throw new Error("Expected IfNode");
			}
		});

		it("should handle elif branches", () => {
			const script = "if a; then b; elif c; then d; fi";
			const nodes = ShellParser.parseScript(script);

			const node = nodes[0];
			if (node.type === "if") {
				expect(node.elifBranches).toHaveLength(1);
				expect(node.elifBranches[0].condition).toBe("c");
				expect(node.elifBranches[0].thenBranch[0]).toEqual({ type: ShellParser.NODE_COMMAND, command: "d" });
			}
		});

		it("should parse a while loop", () => {
			const script = "while condition; do task; done";
			const nodes = ShellParser.parseScript(script);

			const node = nodes[0];
			if (node.type === "while") {
				expect(node.condition).toBe("condition");
				expect(node.body).toHaveLength(1);
				expect(node.body[0]).toEqual({ type: ShellParser.NODE_COMMAND, command: "task" });
			}
		});

		it("should parse a for loop", () => {
			const script = "for i in 1 2 3; do echo $i; done";
			const nodes = ShellParser.parseScript(script);

			const node = nodes[0];
			if (node.type === "for") {
				expect(node.variableName).toBe("i");
				expect(node.items).toEqual(["1", "2", "3"]);
				expect(node.body).toHaveLength(1);
				expect(node.body[0]).toEqual({ type: ShellParser.NODE_COMMAND, command: "echo $i" });
			}
		});
	});

	describe("parseCommand", () => {
		it("should split strings into tokens while respecting quotes", () => {
			const input = "echo \"double quotes\" 'single quotes' no quotes";
			const tokens = ShellParser.parseCommand(input);

			expect(tokens).toEqual(["echo", "\"double quotes\"", "'single quotes'", "no", "quotes"]);
		});
	});

	describe("expandBraces", () => {
		it("should expand numeric sequences", () => {
			const expanded = ShellParser.expandBraces("file{1..3}.txt");
			expect(expanded).toEqual(["file1.txt", "file2.txt", "file3.txt"]);
		});

		it("should expand comma-separated lists", () => {
			const expanded = ShellParser.expandBraces("img.{jpg,png}");
			expect(expanded).toEqual(["img.jpg", "img.png"]);
		});

		it("should handle nested expansions", () => {
			const expanded = ShellParser.expandBraces("v{1..2}_{a,b}");
			expect(expanded).toEqual(["v1_a", "v1_b", "v2_a", "v2_b"]);
		});
	});

	describe("parseOptions", () => {
		it("should extract long and short flags from arguments", () => {
			const command = new Command()
				.addOption({ short: "a", long: "all" })
				.addOption({ short: "l", long: "list" });
			
			const args = ["-a", "--list", "file.txt"];
			const { options } = ShellParser.parseOptions(command, args);

			expect(options).toContain("a");
			expect(options).toContain("l");
			expect(args).toEqual(["file.txt"]);
		});

		it("should handle combined short flags (e.g., -la)", () => {
			const command = new Command()
				.addOption({ short: "l", long: "list" })
				.addOption({ short: "a", long: "all" });

			const args = ["-la"];
			const { options } = ShellParser.parseOptions(command, args);

			expect(options).toEqual(["l", "a"]);
		});

		it("should handle options that require input values", () => {
			const command = new Command()
				.addOption({ short: "f", long: "file", isInput: true });

			const args = ["-f", "config.json", "other"];
			const { options, inputs } = ShellParser.parseOptions(command, args);

			expect(options).toContain("f");
			expect(inputs.f).toBe("config.json");
			expect(args).toEqual(["other"]);
		});
	});
});
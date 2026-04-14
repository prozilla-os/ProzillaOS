import { EXIT_CODE } from "../../../constants";
import { VirtualFolder } from "../../virtual-drive";
import { Command } from "../command";
import { Shell } from "../shell";

const toExitCode = (result: boolean) => result ? EXIT_CODE.success : EXIT_CODE.generalError;

const UNARY_OPERATORS: Record<string, (value: string, workingDirectory: VirtualFolder) => boolean> = {
	"-z": (value) => value.length === 0,
	"-n": (value) => value.length > 0,
	"-f": (value, workingDirectory) => workingDirectory.navigate(value)?.isFile() ?? false,
	"-d": (value, workingDirectory) => workingDirectory.navigate(value)?.isFolder() ?? false,
	"-e": (value, workingDirectory) => workingDirectory.navigate(value) != null,
};

const BINARY_OPERATORS: Record<string, (left: string, right: string) => boolean> = {
	"=":   (left, right) => left === right,
	"==":  (left, right) => left === right,
	"!=":  (left, right) => left !== right,
	"-eq": (left, right) => Number(left) === Number(right),
	"-ne": (left, right) => Number(left) !== Number(right),
	"-lt": (left, right) => Number(left) <   Number(right),
	"-le": (left, right) => Number(left) <=  Number(right),
	"-gt": (left, right) => Number(left) >   Number(right),
	"-ge": (left, right) => Number(left) >=  Number(right),
};

class ConditionalParser {
	tokens: string[];
	index = 0;
	workingDirectory: VirtualFolder;

	constructor(tokens: string[], workingDirectory: VirtualFolder) {
		this.tokens = tokens;
		this.workingDirectory = workingDirectory;
	}

	parse(): boolean {
		return this.parseOr();
	}

	parseOr(): boolean {
		let result = this.parseAnd();
		while (this.tokens[this.index] === "||") {
			this.index++;
			result = this.parseAnd() || result;
		}
		return result;
	}

	parseAnd(): boolean {
		let result = this.parsePrimary();
		while (this.tokens[this.index] === "&&") {
			this.index++;
			result = this.parsePrimary() && result;
		}
		return result;
	}

	parsePrimary(): boolean {
		const token = this.tokens[this.index++];

		if (token === "!") return !this.parsePrimary();

		if (token === "(") {
			const result = this.parseOr();
			this.index++; // Skip ")"
			return result;
		}

		if (token in UNARY_OPERATORS) {
			const value = this.tokens[this.index++];
			return UNARY_OPERATORS[token](value, this.workingDirectory);
		}

		const nextToken = this.tokens[this.index];
		if (nextToken in BINARY_OPERATORS) {
			this.index++;
			const right = this.tokens[this.index++];
			return BINARY_OPERATORS[nextToken](token, right);
		}

		return token.length > 0;
	}
}

export const doubleBracket = new Command()
	.setName("[[")
	.setRequireArgs(true)
	.setManual({
		purpose: "Evaluate a conditional expression",
		usage: "[[ expression ]]",
	})
	.setExecute(function(this: Command, args, { stderr, workingDirectory }) {
		if (args.at(-1) !== "]]")
			return Shell.writeError(stderr, this.name, "missing `]]'");

		const tokens = args.slice(0, -1);
		if (tokens.length === 0) return EXIT_CODE.generalError;

		try {
			return toExitCode(new ConditionalParser(tokens, workingDirectory).parse());
		} catch {
			return EXIT_CODE.misuseOfBuiltins;
		}
	});
import { Result } from "@prozilla-os/shared";
import { tokenize, Token } from "./arithmeticTokenizer";

export interface ArithmeticEnvironment {
	get(name: string): string | undefined;
	set(name: string, value: string): void;
}

const ASSIGNMENT_OPERATORS = new Set([
	"=", "+=", "-=", "*=", "/=", "%=", "**=",
	"&=", "|=", "^=", "<<=", ">>=",
]);

export type ArithmeticParserResult = Result<number, string>;

export class ArithmeticParser {
	private tokens: Token[] = [];
	private position = 0;

	constructor(private readonly env: ArithmeticEnvironment) {}

	public evaluate(expression: string) {
		this.tokens = tokenize(expression);
		this.position = 0;
		return this.parseAssignment();
	}

	private peek(): Token | undefined {
		return this.tokens[this.position];
	}

	private pop(): Token | undefined {
		return this.tokens[this.position++];
	}

	private match(value: string) {
		if (this.peek()?.value === value) {
			this.position++;
			return true;
		}
		return false;
	}

	private expect(value: string, errorMessage: string): Result<void, string> {
		const current = this.peek();
		return Result.require(
			current,
			(_token): _token is Token => this.match(value),
			() => undefined,
			() => errorMessage
		);
	}

	private consume() {
		const token = this.pop();
		return Result.require(
			token,
			(value): value is Token => Boolean(value),
			(value) => value,
			() => "Unexpected end of arithmetic expression"
		);
	}

	private readVar(name: string) {
		return parseInt(this.env.get(name) ?? "0", 10);
	}

	private writeVar(name: string, value: number) {
		this.env.set(name, value.toString());
		return value;
	}

	private parseAssignment(): ArithmeticParserResult {
		const oldPosition = this.position;
		const currentToken = this.peek();

		if (currentToken?.type === "ident") {
			const name = currentToken.value;
			this.position++;
			const operatorToken = this.peek();
			const operator = operatorToken?.value.toString() ?? "";

			if (ASSIGNMENT_OPERATORS.has(operator)) {
				this.position++;
				const leftOperand = this.readVar(name);
				return this.parseAssignment().map((value) => 
					this.writeVar(name, this.applyAssign(operator, leftOperand, value))
				);
			}
			this.position--;
		}

		this.position = oldPosition;
		return this.parseTernary();
	}

	private applyAssign(operator: string, leftOperand: number, rightOperand: number) {
		switch (operator) {
			case "=": 
				return rightOperand;
			case "+=": 
				return leftOperand + rightOperand;
			case "-=": 
				return leftOperand - rightOperand;
			case "*=": 
				return leftOperand * rightOperand;
			case "/=": 
				return Math.trunc(leftOperand / rightOperand);
			case "%=": 
				return leftOperand % rightOperand;
			case "**=": 
				return leftOperand ** rightOperand;
			case "&=": 
				return leftOperand & rightOperand;
			case "|=": 
				return leftOperand | rightOperand;
			case "^=": 
				return leftOperand ^ rightOperand;
			case "<<=": 
				return leftOperand << rightOperand;
			case ">>=": 
				return leftOperand >> rightOperand;
			default: 
				return rightOperand;
		}
	}

	private parseTernary(): ArithmeticParserResult {
		return this.parseOr().next((condition) => {
			if (this.match("?")) {
				return this.parseAssignment().next((thenBranch) =>
					this.expect(":", "Expected ':' in ternary expression")
						.next(() => this.parseAssignment())
						.map((elseBranch) => condition ? thenBranch : elseBranch)
				);
			}
			return Result.ok(condition);
		});
	}

	private whileMatch(
		parser: () => ArithmeticParserResult,
		operators: string[],
		apply: (left: number, operator: string, right: number) => number
	): ArithmeticParserResult {
		return parser().next((initialLeft) => {
			return Result.loop(
				initialLeft,
				() => {
					const operatorToken = this.peek();
					return Boolean(operatorToken && operators.includes(operatorToken.value.toString()));
				},
				(currentLeft) => {
					const operator = this.pop()?.value.toString() ?? "";
					return parser().map((rightOperand) => apply(currentLeft, operator, rightOperand));
				}
			);
		});
	}

	private parseOr(): ArithmeticParserResult {
		return this.whileMatch(() => this.parseAnd(), ["||"], (left, _, right) => left || right ? 1 : 0);
	}

	private parseAnd(): ArithmeticParserResult {
		return this.whileMatch(() => this.parseBitOr(), ["&&"], (left, _, right) => left && right ? 1 : 0);
	}

	private parseBitOr(): ArithmeticParserResult {
		return this.whileMatch(() => this.parseBitXor(), ["|"], (left, _, right) => left | right);
	}

	private parseBitXor(): ArithmeticParserResult {
		return this.whileMatch(() => this.parseBitAnd(), ["^"], (left, _, right) => left ^ right);
	}

	private parseBitAnd(): ArithmeticParserResult {
		return this.whileMatch(() => this.parseEquality(), ["&"], (left, _, right) => left & right);
	}

	private parseEquality(): ArithmeticParserResult {
		return this.whileMatch(() => this.parseCompare(), ["==", "!="], (left, operator, right) => 
			operator === "==" ? Number(left === right) : Number(left !== right)
		);
	}

	private parseCompare(): ArithmeticParserResult {
		const operators = ["<", ">", "<=", ">="];
		return this.whileMatch(() => this.parseShift(), operators, (left, operator, right) => {
			switch (operator) {
				case "<": 
					return left < right ? 1 : 0;
				case ">": 
					return left > right ? 1 : 0;
				case "<=": 
					return left <= right ? 1 : 0;
				default: 
					return left >= right ? 1 : 0;
			}
		});
	}

	private parseShift(): ArithmeticParserResult {
		return this.whileMatch(() => this.parseAdd(), ["<<", ">>"], (left, operator, right) => 
			operator === "<<" ? left << right : left >> right
		);
	}

	private parseAdd(): ArithmeticParserResult {
		return this.whileMatch(() => this.parseMultiplication(), ["+", "-"], (left, operator, right) => 
			operator === "+" ? left + right : left - right
		);
	}

	private parseMultiplication(): ArithmeticParserResult {
		const operators = ["*", "/", "%"];
		return this.whileMatch(() => this.parseExponent(), operators, (left, operator, right) => {
			switch (operator) {
				case "*": 
					return left * right;
				case "/": 
					return Math.trunc(left / right);
				default: 
					return left % right;
			}
		});
	}

	private parseExponent(): ArithmeticParserResult {
		return this.parseUnary().next((base) => {
			if (this.match("**")) {
				return this.parseExponent().map((exponent) => base ** exponent);
			}
			return Result.ok(base);
		});
	}

	private parseUnary(): ArithmeticParserResult {
		const operator = this.peek()?.value;

		switch (operator) {
			case "++":
			case "--": {
				this.pop();
				const token = this.peek();
				if (token?.type === "ident") {
					this.pop();
					const value = this.readVar(token.value);
					const newValue = operator === "++" ? value + 1 : value - 1;
					return Result.ok(this.writeVar(token.value, newValue));
				}
				return Result.error(`Expected identifier after prefix ${operator}`);
			}
			case "+":
				this.pop();
				return this.parseUnary().map((value) => +value);
			case "-":
				this.pop();
				return this.parseUnary().map((value) => -value);
			case "!":
				this.pop();
				return this.parseUnary().map((value) => value ? 0 : 1);
			case "~":
				this.pop();
				return this.parseUnary().map((value) => ~value);
			default:
				return this.parsePrimary();
		}
	}

	private parsePrimary(): ArithmeticParserResult {
		return this.consume().next((token) => {
			if (token.type === "number")
				return Result.ok(token.value);

			if (token.type === "ident") {
				const name = token.value;
				const nextOperator = this.peek()?.value;
				if (nextOperator === "++" || nextOperator === "--") {
					this.pop();
					const previousValue = this.readVar(name);
					const newValue = nextOperator === "++" ? previousValue + 1 : previousValue - 1;
					this.writeVar(name, newValue);
					return Result.ok(previousValue);
				}
				return Result.ok(this.readVar(name));
			}

			if (token.value === "(") {
				return this.parseAssignment().next((value) =>
					this.expect(")", "Expected closing ')'").map(() => value)
				);
			}
			
			return Result.error(`Unexpected token: '${token.value}'`);
		});
	}
}
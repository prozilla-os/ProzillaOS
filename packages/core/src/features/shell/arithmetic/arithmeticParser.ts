import { tokenize, Token } from "./arithmeticTokenizer";

export interface ArithmeticEnvironment {
	get(name: string): string | undefined;
	set(name: string, value: string): void;
}

const ASSIGNMENT_OPERATORS = new Set([
	"=", "+=", "-=", "*=", "/=", "%=", "**=",
	"&=", "|=", "^=", "<<=", ">>=",
]);

export class ArithmeticParser {
	private tokens: Token[] = [];
	private position = 0;

	constructor(private readonly env: ArithmeticEnvironment) {}

	public evaluate(expression: string): number {
		this.tokens = tokenize(expression);
		this.position = 0;
		return this.parseAssignment();
	}

	private peek(): Token | undefined {
		return this.tokens[this.position];
	}

	private pop(): Token {
		return this.tokens[this.position++];
	}

	private match(value: string): boolean {
		if (this.peek()?.value !== value)
			return false;
		this.position++;
		return true;
	}

	private readVar(name: string): number {
		return parseInt(this.env.get(name) ?? "0", 10);
	}

	private writeVar(name: string, value: number): number {
		this.env.set(name, value.toString());
		return value;
	}

	private parseAssignment(): number {
		const oldPosition = this.position;

		if (this.peek()?.type === "ident") {
			const name = (this.pop() as Extract<Token, { type: "ident" }>).value;

			const token = this.peek();
			if (ASSIGNMENT_OPERATORS.has(typeof token?.value === "string" ? token.value : "")) {
				const operator  = this.pop().value.toString();
				const left = this.readVar(name);
				const right = this.parseAssignment();

				return this.writeVar(name, this.applyAssign(operator, left, right));
			}
		}

		this.position = oldPosition;
		return this.parseTernary();
	}

	private applyAssign(operator: string, left: number, right: number): number {
		switch (operator) {
			case "=":   return right;
			case "+=":  return left + right;
			case "-=":  return left - right;
			case "*=":  return left * right;
			case "/=":  return Math.trunc(left / right);
			case "%=":  return left % right;
			case "**=": return left ** right;
			case "&=":  return left & right;
			case "|=":  return left | right;
			case "^=":  return left ^ right;
			case "<<=": return left << right;
			case ">>=": return left >> right;
			default:    return right;
		}
	}

	private parseTernary(): number {
		const condition = this.parseOr();
		if (!this.match("?"))
			return condition;
		const then = this.parseAssignment();
		if (!this.match(":"))
			throw new Error("Expected ':' in ternary expression");
		const otherwise = this.parseAssignment();
		return condition !== 0 ? then : otherwise;
	}

	private parseOr(): number {
		let left = this.parseAnd();
		while (this.peek()?.value === "||") {
			this.pop();
			left = left !== 0 || this.parseAnd() !== 0 ? 1 : 0;
		}
		return left;
	}

	private parseAnd(): number {
		let left = this.parseBitOr();
		while (this.peek()?.value === "&&") {
			this.pop();
			left = left !== 0 && this.parseBitOr() !== 0 ? 1 : 0;
		}
		return left;
	}

	private parseBitOr(): number {
		let left = this.parseBitXor();
		while (this.peek()?.value === "|") {
			this.pop();
			left = left | this.parseBitXor();
		}
		return left;
	}

	private parseBitXor(): number {
		let left = this.parseBitAnd();
		while (this.peek()?.value === "^") {
			this.pop();
			left = left ^ this.parseBitAnd();
		}
		return left;
	}

	private parseBitAnd(): number {
		let left = this.parseEquality();
		while (this.peek()?.value === "&") {
			this.pop();
			left = left & this.parseEquality();
		}
		return left;
	}

	private parseEquality(): number {
		let left = this.parseCompare();
		for (;;) {
			if      (this.peek()?.value === "==") { this.pop(); left = left === this.parseCompare() ? 1 : 0; }
			else if (this.peek()?.value === "!=") { this.pop(); left = left !== this.parseCompare() ? 1 : 0; }
			else break;
		}
		return left;
	}

	private parseCompare(): number {
		let left = this.parseShift();
		for (;;) {
			const op = this.peek()?.value;
			if      (op === "<")  { this.pop(); left = left <  this.parseShift() ? 1 : 0; }
			else if (op === ">")  { this.pop(); left = left >  this.parseShift() ? 1 : 0; }
			else if (op === "<=") { this.pop(); left = left <= this.parseShift() ? 1 : 0; }
			else if (op === ">=") { this.pop(); left = left >= this.parseShift() ? 1 : 0; }
			else break;
		}
		return left;
	}

	private parseShift(): number {
		let left = this.parseAdd();
		for (;;) {
			if      (this.peek()?.value === "<<") { this.pop(); left = left << this.parseAdd(); }
			else if (this.peek()?.value === ">>") { this.pop(); left = left >> this.parseAdd(); }
			else break;
		}
		return left;
	}

	private parseAdd(): number {
		let left = this.parseMul();
		for (;;) {
			if      (this.peek()?.value === "+") { this.pop(); left = left + this.parseMul(); }
			else if (this.peek()?.value === "-") { this.pop(); left = left - this.parseMul(); }
			else break;
		}
		return left;
	}

	private parseMul(): number {
		let left = this.parseExp();
		for (;;) {
			const op = this.peek()?.value;
			if      (op === "*") { this.pop(); left = left * this.parseExp(); }
			else if (op === "/") { this.pop(); left = Math.trunc(left / this.parseExp()); }
			else if (op === "%") { this.pop(); left = left % this.parseExp(); }
			else break;
		}
		return left;
	}

	private parseExp(): number {
		const base = this.parseUnary();
		if (this.peek()?.value === "**") {
			this.pop();
			return base ** this.parseExp();
		}
		return base;
	}

	private parseUnary(): number {
		const operator = this.peek()?.value;

		if (operator === "++") {
			this.pop();
			const token = this.peek();
			if (token?.type !== "ident")
				throw new Error("Expected identifier after prefix ++");
			this.pop();
			return this.writeVar(token.value, this.readVar(token.value) + 1);
		}
		if (operator === "--") {
			this.pop();
			const token = this.peek();
			if (token?.type !== "ident")
				throw new Error("Expected identifier after prefix --");
			this.pop();
			return this.writeVar(token.value, this.readVar(token.value) - 1);
		}
		if (operator === "+") {
			this.pop();
			return +this.parseUnary();
		}
		if (operator === "-") {
			this.pop();
			return -this.parseUnary();
		}
		if (operator === "!") {
			this.pop();
			return this.parseUnary() === 0 ? 1 : 0;
		}
		if (operator === "~") {
			this.pop();
			return ~this.parseUnary();
		}

		return this.parsePrimary();
	}

	private parsePrimary(): number {
		const token = this.peek();
		if (!token)
			throw new Error("Unexpected end of arithmetic expression");

		if (token.type === "number") {
			this.pop();
			return token.value;
		}

		if (token.type === "ident") {
			this.pop();
			const { value: name } = token;
			if (this.peek()?.value === "++") {
				this.pop();
				const old = this.readVar(name);
				this.writeVar(name, old + 1);
				return old;
			}
			if (this.peek()?.value === "--") {
				this.pop();
				const old = this.readVar(name);
				this.writeVar(name, old - 1);
				return old;
			}
			return this.readVar(name);
		}

		if (token.value === "(") {
			this.pop();
			const val = this.parseAssignment();
			if (!this.match(")"))
				throw new Error("Expected closing ')'");
			return val;
		}

		throw new Error(`Unexpected token in arithmetic expression: '${token.value}'`);
	}
}
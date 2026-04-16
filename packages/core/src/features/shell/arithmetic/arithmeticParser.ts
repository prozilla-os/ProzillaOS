import { tokenize, Token } from "./arithmeticTokenizer";

/** Minimal interface so the parser stays decoupled from ShellEnvironment. */
export interface ArithmeticEnv {
	get(name: string): string | undefined;
	set(name: string, value: string): void;
}

const ASSIGN_OPS = new Set([
	"=", "+=", "-=", "*=", "/=", "%=", "**=",
	"&=", "|=", "^=", "<<=", ">>=",
]);

export class ArithmeticParser {
	private tokens: Token[] = [];
	private pos = 0;

	constructor(private readonly env: ArithmeticEnv) {}

	evaluate(expression: string): number {
		console.log("COUNT: " + this.env.get("COUNT"));
		this.tokens = tokenize(expression);
		this.pos = 0;
		return this.parseAssign();
	}

	// ── helpers ──────────────────────────────────────────────────────────────

	private peek(): Token | undefined { return this.tokens[this.pos]; }
	private eat():  Token             { return this.tokens[this.pos++]; }

	private match(value: string): boolean {
		if (this.peek()?.value !== value) return false;
		this.pos++;
		return true;
	}

	private readEnv(name: string): number {
		const value = parseInt(this.env.get(name) ?? "0", 10);
		console.log(`read: ${name} = ${value}`);
		return value;
	}

	private writeEnv(name: string, value: number): number {
		this.env.set(name, value.toString());
		console.log(`write: ${name} = ${value}`);
		return value;
	}

	// ── grammar (precedence low → high) ──────────────────────────────────────
	//
	//  assign → ternary → || → && → | → ^ → & → ==!= → <><=>=
	//  → <<>> → +- → */% → ** → unary → primary

	private parseAssign(): number {
		const saved = this.pos;

		if (this.peek()?.type === "ident") {
			const name = (this.eat() as Extract<Token, { type: "ident" }>).value;

			const token = this.peek();
			if (ASSIGN_OPS.has(typeof token?.value === "string" ? token.value : "")) {
				const op  = this.eat().value.toString();
				const rhs = this.parseAssign();
				const cur = this.readEnv(name);

				return this.writeEnv(name, this.applyAssign(op, cur, rhs));
			}
		}

		this.pos = saved;
		return this.parseTernary();
	}

	private applyAssign(op: string, cur: number, rhs: number): number {
		switch (op) {
			case "=":   return rhs;
			case "+=":  return cur + rhs;
			case "-=":  return cur - rhs;
			case "*=":  return cur * rhs;
			case "/=":  return Math.trunc(cur / rhs);
			case "%=":  return cur % rhs;
			case "**=": return cur ** rhs;
			case "&=":  return cur & rhs;
			case "|=":  return cur | rhs;
			case "^=":  return cur ^ rhs;
			case "<<=": return cur << rhs;
			case ">>=": return cur >> rhs;
			default:    return rhs;
		}
	}

	private parseTernary(): number {
		const cond = this.parseOr();
		if (!this.match("?")) return cond;
		const then      = this.parseAssign();
		if (!this.match(":")) throw new Error("Expected ':' in ternary expression");
		const otherwise = this.parseAssign();
		return cond !== 0 ? then : otherwise;
	}

	private parseOr(): number {
		let left = this.parseAnd();
		while (this.peek()?.value === "||") { this.eat(); left = left !== 0 || this.parseAnd() !== 0 ? 1 : 0; }
		return left;
	}

	private parseAnd(): number {
		let left = this.parseBitOr();
		while (this.peek()?.value === "&&") { this.eat(); left = left !== 0 && this.parseBitOr() !== 0 ? 1 : 0; }
		return left;
	}

	private parseBitOr(): number {
		let left = this.parseBitXor();
		while (this.peek()?.value === "|") { this.eat(); left = left | this.parseBitXor(); }
		return left;
	}

	private parseBitXor(): number {
		let left = this.parseBitAnd();
		while (this.peek()?.value === "^") { this.eat(); left = left ^ this.parseBitAnd(); }
		return left;
	}

	private parseBitAnd(): number {
		let left = this.parseEquality();
		while (this.peek()?.value === "&") { this.eat(); left = left & this.parseEquality(); }
		return left;
	}

	private parseEquality(): number {
		let left = this.parseCompare();
		for (;;) {
			if      (this.peek()?.value === "==") { this.eat(); left = left === this.parseCompare() ? 1 : 0; }
			else if (this.peek()?.value === "!=") { this.eat(); left = left !== this.parseCompare() ? 1 : 0; }
			else break;
		}
		return left;
	}

	private parseCompare(): number {
		let left = this.parseShift();
		for (;;) {
			const op = this.peek()?.value;
			if      (op === "<")  { this.eat(); left = left <  this.parseShift() ? 1 : 0; }
			else if (op === ">")  { this.eat(); left = left >  this.parseShift() ? 1 : 0; }
			else if (op === "<=") { this.eat(); left = left <= this.parseShift() ? 1 : 0; }
			else if (op === ">=") { this.eat(); left = left >= this.parseShift() ? 1 : 0; }
			else break;
		}
		return left;
	}

	private parseShift(): number {
		let left = this.parseAdd();
		for (;;) {
			if      (this.peek()?.value === "<<") { this.eat(); left = left << this.parseAdd(); }
			else if (this.peek()?.value === ">>") { this.eat(); left = left >> this.parseAdd(); }
			else break;
		}
		return left;
	}

	private parseAdd(): number {
		let left = this.parseMul();
		for (;;) {
			if      (this.peek()?.value === "+") { this.eat(); left = left + this.parseMul(); }
			else if (this.peek()?.value === "-") { this.eat(); left = left - this.parseMul(); }
			else break;
		}
		return left;
	}

	private parseMul(): number {
		let left = this.parseExp();
		for (;;) {
			const op = this.peek()?.value;
			if      (op === "*") { this.eat(); left = left * this.parseExp(); }
			else if (op === "/") { this.eat(); left = Math.trunc(left / this.parseExp()); }
			else if (op === "%") { this.eat(); left = left % this.parseExp(); }
			else break;
		}
		return left;
	}

	private parseExp(): number {
		const base = this.parseUnary();
		if (this.peek()?.value === "**") { this.eat(); return base ** this.parseExp(); }
		return base;
	}

	private parseUnary(): number {
		const op = this.peek()?.value;

		if (op === "++") {
			this.eat();
			const t = this.peek();
			if (t?.type !== "ident") throw new Error("Expected identifier after prefix ++");
			this.eat();
			return this.writeEnv(t.value, this.readEnv(t.value) + 1);
		}
		if (op === "--") {
			this.eat();
			const t = this.peek();
			if (t?.type !== "ident") throw new Error("Expected identifier after prefix --");
			this.eat();
			return this.writeEnv(t.value, this.readEnv(t.value) - 1);
		}
		if (op === "+") { this.eat(); return +this.parseUnary(); }
		if (op === "-") { this.eat(); return -this.parseUnary(); }
		if (op === "!") { this.eat(); return this.parseUnary() === 0 ? 1 : 0; }
		if (op === "~") { this.eat(); return ~this.parseUnary(); }

		return this.parsePrimary();
	}

	private parsePrimary(): number {
		const t = this.peek();
		if (!t) throw new Error("Unexpected end of arithmetic expression");

		if (t.type === "number") { this.eat(); return t.value; }

		if (t.type === "ident") {
			this.eat();
			const { value: name } = t;
			if (this.peek()?.value === "++") { this.eat(); const old = this.readEnv(name); this.writeEnv(name, old + 1); return old; }
			if (this.peek()?.value === "--") { this.eat(); const old = this.readEnv(name); this.writeEnv(name, old - 1); return old; }
			return this.readEnv(name);
		}

		if (t.value === "(") {
			this.eat();
			const val = this.parseAssign();
			if (!this.match(")")) throw new Error("Expected closing ')'");
			return val;
		}

		throw new Error(`Unexpected token in arithmetic expression: '${t.value}'`);
	}
}
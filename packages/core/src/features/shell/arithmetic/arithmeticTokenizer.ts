export type Token =
	| { type: "number"; value: number }
	| { type: "ident"; value: string }
	| { type: "op"; value: string };

const THREE_CHAR_OPERATORS = new Set(["**=", "<<=", ">>="]);
const TWO_CHAR_OPERATORS   = new Set([
	"**", "++", "--",
	"+=", "-=", "*=", "/=", "%=", "&=", "|=", "^=",
	"==", "!=", "<=", ">=", "<<", ">>", "&&", "||",
]);

export function tokenize(expression: string): Token[] {
	const tokens: Token[] = [];
	let i = 0;

	while (i < expression.length) {
		if (/\s/.test(expression[i])) {
			i++;
			continue;
		}

		if (/[0-9]/.test(expression[i])) {
			let raw = "";
			while (i < expression.length && /[0-9]/.test(expression[i])) {
				raw += expression[i++];
			}
			tokens.push({ type: "number", value: parseInt(raw, 10) });
			continue;
		}

		if (/[a-zA-Z_]/.test(expression[i])) {
			let name = "";
			while (i < expression.length && /[a-zA-Z0-9_]/.test(expression[i])) {
				name += expression[i++];
			}
			tokens.push({ type: "ident", value: name });
			continue;
		}

		const s3 = expression.slice(i, i + 3);
		const s2 = expression.slice(i, i + 2);

		if (THREE_CHAR_OPERATORS.has(s3)) {
			tokens.push({ type: "op", value: s3 }); i += 3;
		} else if (TWO_CHAR_OPERATORS.has(s2)) {
			tokens.push({ type: "op", value: s2 }); i += 2;
		} else {
			tokens.push({ type: "op", value: expression[i++] });
		}
	}

	return tokens;
}
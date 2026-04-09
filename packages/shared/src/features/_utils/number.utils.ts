/**
 * Checks if `input` is a valid integer.
 */
export function isValidInteger(input: number | string): boolean {
	if (typeof input === "number") return true;
	if (input.trim() === "") return false;
	return Number.isInteger(Number(input));
}

/**
 * Checks if `input` is a valid number.
 */
export function isValidNumber(input: number | string): boolean {
	if (typeof input === "number") return true;
	if (input.trim() === "") return false;
	return !isNaN(Number(input));
}

export function parseOptionalInteger(input?: string, defaultValue = 0) {
	return input !== undefined && isValidInteger(input) ? Number(input) : defaultValue;
}

export function parseOptionalFloat(input?: string, defaultValue = 0) {
	return input !== undefined && isValidNumber(input) ? parseFloat(input) : defaultValue;
}
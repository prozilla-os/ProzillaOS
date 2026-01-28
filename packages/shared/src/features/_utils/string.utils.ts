/**
 * Converts a string to a boolean.
 * @param input - The string to parse.
 */
export function parseBool(input: string) {
	return input.trim().toLowerCase() === "true";
}
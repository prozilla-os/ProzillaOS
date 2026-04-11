/**
 * Converts a string to a boolean.
 * @param input - The string to parse.
 */
export function parseBool(input: string) {
	return input.trim().toLowerCase() === "true";
}

/**
 * Returns the longest common prefix from a list of strings.
 */
export function getLongestCommonPrefix(strings: string[]) {
	if (!strings.length) return "";
    
	let prefix = strings[0];
	for (let i = 1; i < strings.length; i++) {
		while (strings[i].indexOf(prefix) !== 0) {
			prefix = prefix.substring(0, prefix.length - 1);
			if (prefix === "") return "";
		}
	}
	return prefix;
}
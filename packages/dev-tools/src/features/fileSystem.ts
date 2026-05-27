import { readdirSync } from "node:fs";

/**
 * Returns a list of all files and folders in a directory.
 * @param path - The path of the directory.
 * @returns The contents of the directory.
 */
export function listDirectory(path: string): string[] {
	return readdirSync(path, { withFileTypes: true }).sort((a, b) => {
		if (a.isDirectory() == b.isDirectory()) {
			return a.name.localeCompare(b.name);
		} else {
			return a.isDirectory() ? -1 : 1;
		}
	}).map((entry) =>
		entry.isDirectory() ? entry.name + "/" : entry.name
	);
}

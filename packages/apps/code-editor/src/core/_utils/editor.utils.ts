export function extensionToLanguage(extension?: string | null) {
	switch (extension) {
		case "sh":
			return "shell";
		case "js":
			return "javascript";
		case "ts":
			return "typescript";
	}
	return extension ?? undefined;
}
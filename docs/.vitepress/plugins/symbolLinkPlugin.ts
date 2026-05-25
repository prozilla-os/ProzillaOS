import type MarkdownIt from "markdown-it";
import type { SymbolEntry } from "./symbolRegistry";

function getRelativePath(sourcePage: string | undefined, targetPath: string) {
	if (!sourcePage)
		return "reference/" + targetPath;

	const sourceDirectory = sourcePage.includes("/")
		? sourcePage.substring(0, sourcePage.lastIndexOf("/") + 1)
		: "";

	const absoluteTargetPath = "reference/" + targetPath;

	const sourceParts = sourceDirectory.split("/").filter(Boolean);
	const targetParts = absoluteTargetPath.split("/").filter(Boolean);

	let i = 0;
	while (i < sourceParts.length && i < targetParts.length && sourceParts[i] === targetParts[i]) {
		i++;
	}

	const upSegments = sourceParts.slice(i).map(() => "..");
	const downSegments = targetParts.slice(i);

	return [...upSegments, ...downSegments].join("/");
}

export function symbolLinkPlugin(markdownIt: MarkdownIt, options: { registry: Map<string, SymbolEntry> }) {
	const { registry } = options;

	if (registry.size === 0)
		return;

	markdownIt.core.ruler.push("symbol_links", (state) => {
		const tokens = state.tokens;

		for (let i = 0; i < tokens.length; i++) {
			const token = tokens[i];

			if (token.type !== "inline" || !token.children || token.children.length === 0)
				continue;

			const children = token.children;
			let linkDepth = 0;

			for (let j = 0; j < children.length; j++) {
				const child = children[j];

				if (child.type === "link_open") {
					linkDepth++;
					continue;
				}

				if (child.type === "link_close") {
					linkDepth--;
					continue;
				}

				if (child.type !== "code_inline" || linkDepth > 0)
					continue;

				const content = child.content;
				if (content.length < 2)
					continue;

				let symbolName = content;
				let symbolEntry: SymbolEntry | undefined;

				if (symbolName.startsWith("@")) {
					const slashIndex = symbolName.indexOf("/");
					if (slashIndex > 1) {
						const packagePrefix = symbolName.substring(1, slashIndex);
						symbolName = symbolName.substring(slashIndex + 1);

						symbolEntry = registry.get(symbolName);
						if (symbolEntry?.packageName !== packagePrefix && symbolEntry?.packageName !== "apps/" + packagePrefix) {
							symbolEntry = undefined;
						}
					}
				} else {
					symbolEntry = registry.get(symbolName);
				}

				if (!symbolEntry)
					continue;

				const sourcePage = (state.env as Record<string, string | undefined>).relativePath;
				const href = getRelativePath(sourcePage, symbolEntry.path);

				const openToken = new state.Token("link_open", "a", 1);
				openToken.attrSet("href", href);

				const closeToken = new state.Token("link_close", "a", -1);

				children.splice(j, 1, openToken, child, closeToken);
				j += 2;
			}
		}
	});
}

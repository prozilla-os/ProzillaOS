// @ts-check
import { Converter, ReflectionKind, CommentTag, Comment, PageKind, ParameterType } from "typedoc";
import { MarkdownPageEvent } from "typedoc-plugin-markdown";
import { ORG, PACKAGES } from "./packages.const.mjs";
import { existsSync, readFileSync } from "node:fs";
import { Logger, Markdown } from "@prozilla-os/shared";

const logger = new Logger();

/** @type {Record<string, import("typedoc-plugin-markdown").NavigationJSON>} */
const packageNavCache = {};

/**
 * @param {string} targetPath 
 * @param {string} sourcePath 
 */
function getPackageNavigation(targetPath, sourcePath) {
	if (!PACKAGES.includes(targetPath))
		return;

	if (targetPath in packageNavCache)
		return packageNavCache[targetPath];

	const navJsonPath = new URL("../src/reference/" + targetPath + "/nav.json", import.meta.url);
	if (!existsSync(navJsonPath)) {
		logger.warn("Unknown symbol", 
			`Referenced from: ${sourcePath}`,
			`Imported from: ${targetPath}`,
			`Missing navigation file: ${navJsonPath}`
		);
		packageNavCache[targetPath] = [];
		return;
	}

	const navJson = readFileSync(navJsonPath, "utf-8");
	/** @type {import("typedoc-plugin-markdown").NavigationJSON} */
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const navigation = JSON.parse(navJson);

	packageNavCache[targetPath] = navigation;
	return packageNavCache[targetPath];
}

/**
 * @param {import("typedoc-plugin-markdown").MarkdownApplication} app
 */
export function load(app) {
	app.options.addDeclaration({
		name: "path",
		type: ParameterType.String,
		help: "The relative path of the package",
		defaultValue: "",
	});

	function getRelativePath() {
		return String(app.options.getValue("path"));
	}

	function getPackageReadmeEditUrl() {
		return `https://github.com/prozilla-os/ProzillaOS/edit/main/packages/${getRelativePath()}/README.md`;
	}

	app.converter.addUnknownSymbolResolver((reference) => resolveUnknownSymbol(getRelativePath(), reference));

	app.converter.on(Converter.EVENT_CREATE_DECLARATION, (_context, reflection) => {
		addReactGroups(reflection);
		updateGroups(reflection);
	});

	app.converter.on(Converter.EVENT_RESOLVE_END, (context) => {
		context.project.getReflectionsByKind(ReflectionKind.Variable).forEach((reflection) => {
			addExtendedAppsToGroup(context, reflection);
		});
	});

	app.renderer.on(MarkdownPageEvent.END, (event) => {
		const source = reformatSources(event);
		const fileName = source?.fileName;
		const sourceUrl = source?.url;

		fixCodeBlockLanguages(event, fileName);
		renameHeadings(event);

		let editUrl;
		if (event.pageKind === PageKind.Index) {
			editUrl = getPackageReadmeEditUrl();
		} else {
			editUrl = sourceUrl?.replace(/\/blob\/[a-zA-ZZ0-9]+\//, "/edit/main/");
		}
		insertFrontmatter(event, editUrl);
	});
}

/**
 * @param {import("typedoc").DeclarationReflection} reflection 
 */
function addReactGroups(reflection) {
	if ((reflection.kind !== ReflectionKind.Function && reflection.kind !== ReflectionKind.Variable))
		return;

	const group = getGroup(reflection);
	if (!group)
		return;

	addGroup(reflection, group);
}

/**
 * @param {import("typedoc").DeclarationReflection} reflection 
 */
function updateGroups(reflection) {
	if (reflection.kind === ReflectionKind.TypeAlias) {
		addGroup(reflection, "Types");
	} else if (reflection.kind === ReflectionKind.Enum) {
		addGroup(reflection, "Enums");
	} else if (reflection.kind === ReflectionKind.Variable) {
		if (reflection.type?.type === "reference") {
			if (isAppReference(reflection.type)) {
				addGroup(reflection, "Apps");
			}
		}
	}
}

/**
 * @param {import("typedoc").Context} context
 * @param {import("typedoc").Reflection} reflection 
 */
function addExtendedAppsToGroup(context, reflection) {
	if (!reflection.isDeclaration() || reflection.kind !== ReflectionKind.Variable || reflection.type?.type !== "reference")
		return;

	if (!reflection.type.name)
		return;

	const name = reflection.type.name;
	const type = context.project.getReflectionsByKind(ReflectionKind.Class).find((ref) => ref.name === name);
	if (!type || !type.isDeclaration() || !type.extendedTypes?.length)
		return;

	const extendedType = type.extendedTypes[0];
	if (extendedType.type !== "reference")
		return;

	const isApp = isAppReference(extendedType);
	if (isApp) {
		addGroup(reflection, "Apps");
	}
}

/**
 * @param {import("typedoc").ReferenceType} reference 
 */
function isAppReference(reference) {
	return reference.name === "App" && reference.toDeclarationReference().moduleSource === ORG + "/core";
}

/**
 * @param {import("typedoc").DeclarationReflection} reflection 
 * @param {string} group 
 */
function addGroup(reflection, group) {
	if (!reflection.comment)
		reflection.comment = new Comment();
	
	const { comment } = reflection;
	if (!comment.blockTags) {
		comment.blockTags = [];
	}
	
	const hasGroup = comment.blockTags.some((tag) => tag.tag === "@group" );
	if (!hasGroup) {
		comment.blockTags.push(new CommentTag("@group", [{ kind: "text", text: group }]));
	}
}

/**
 * @param {import("typedoc").DeclarationReflection} reflection 
 */
function getGroup({ name }) {
	if (name.startsWith("use") && name.length > 3 && name[3] === name[3].toUpperCase()) {
		return "Hooks";
	} else if (name[0] === name[0].toUpperCase() && name !== name.toUpperCase()) {
		return "Components";
	}

	return null;
}

/**
 * @param {MarkdownPageEvent} event 
 */
function reformatSources(event) {
	/** @type {string[]} */
	const contents = [];
	/** @type {{ fileName?: string, url?: string } | undefined} */
	let firstSource;

	event.contents.split("\n").forEach((line) => {
		if (line.startsWith("Defined in: node\\_modules")) {
			// TO DO: add support for CSS exports (e.g., utilStyles)
			return;
		}

		if (line.startsWith("Defined in: [") && !firstSource) {
			const results = line.match(/\[([^\]]+)\]\(([^)]+)\)/);

			firstSource = {};
			if (results) {
				const path = results[1];
				const url = results[2];
				const fileName = path
					.substring(path.lastIndexOf("/") + 1, path.lastIndexOf(":"))
					.trim();

				contents.push(Markdown.bold("Source:") + " " + Markdown.link(fileName, url));
				firstSource.fileName = fileName;
				firstSource.url = url;
			}
		} else if (!line.startsWith("Defined in: ")) {
			contents.push(line);
		}
	});
	
	event.contents = contents.join("\n");
	return firstSource;
}

/**
 * @param {MarkdownPageEvent} event 
 * @param {string | undefined} editUrl 
 */
function insertFrontmatter(event, editUrl) {
	const frontmatter = {};

	if (event.pageKind !== PageKind.Index) {
		frontmatter.package = `"${event.project.packageName}"`;

		if (event.isReflectionEvent() && event.model.comment) {
			const comment = event.model.comment;
			let description = Comment.combineDisplayParts(comment.getShortSummary(true));

			description = description.replace(/`/g, "").trim().split("\n")[0].trim();

			if (description.length) {
				frontmatter.description = description;
			} else {
				const lines = event.contents.split("\n")
					.map((line) => line.trim())
					.filter((line) => line.length > 0);
				const title = lines.findIndex((line) => line.startsWith("# "));
				const firstSection = lines.findIndex((line) => line.startsWith("## "));

				if (title > 0) {
					for (let i = title + 1; i < firstSection; i++) {
						const line = lines[i];
						if (!line.startsWith("**Source")
							&& !line.startsWith("> ")) {
							frontmatter.description = line;
							break;
						}
					}
				}
			}
		}
	} else {
		// Replace header image with title
		event.contents = event.contents.replace(/^\s*<div(.|\s)*?<\/div>/, event.project.packageName ? Markdown.heading1(event.project.packageName) : "");
		
		// TO DO: automatically fetch description from line below "## About"
	}

	if (editUrl) {
		frontmatter.editUrl = `"${editUrl}"`;
	} else {
		frontmatter.editLink = "false";
	}

	if (Object.keys(frontmatter).length) {
		event.contents = [
			"---",
			...Object.entries(frontmatter).map(([key, value]) => `${key}: ${value}`),
			"---",
		].join("\n") + "\n\n" + event.contents;
	}
}

/**
 * @param {MarkdownPageEvent} event 
 * @param {string | undefined} fileName 
 */
function fixCodeBlockLanguages(event, fileName) {
	if (event.pageKind !== PageKind.Reflection)
		return;

	if (fileName?.endsWith(".tsx")) {
		event.contents = event.contents.replaceAll(/^`{3}ts\s*$/gm, "```tsx");
	}
}

/**
 * @param {MarkdownPageEvent} event
 */
function renameHeadings(event) {
	if (event.pageKind !== PageKind.Reflection)
		return;

	if (event.isReflectionEvent()) {
		const reflection = event.model;

		if (reflection.kind === ReflectionKind.Enum) {
			event.contents = event.contents.replace(/^## Enumeration Members\s*$/mi, Markdown.heading2("Members\n"));
		}
	}
}

/**
 * @param {string} path 
 * @param {import("typedoc").DeclarationReference} reference 
 */
function resolveUnknownSymbol(path, reference) {
	if (reference.moduleSource?.startsWith("@prozilla-os/")) {
		const targetName = reference.moduleSource.replace("@prozilla-os/", "");
		const targetPath = PACKAGES.find((path) => path.endsWith(targetName));

		if (!targetPath || path === targetPath)
			return;

		const navigation = getPackageNavigation(targetPath, path);
		if (!navigation)
			return;

		const symbolName = reference.symbolReference?.path?.[0].path;
		if (!symbolName)
			return;
		
		/** @type {string | undefined} */
		let pagePath;
		for (const { children } of navigation) {
			if (children) {
				for (const { title, path } of children) {
					if (title === symbolName) {
						pagePath = path ?? undefined;
						break;
					}
				}

				if (pagePath)
					break;
			}
		}
		if (!pagePath)
			return;

		let relativePagePath = `../../${targetPath}/${pagePath}`;
		const sourceDepth = path.split("/").length - 1;
		const targetDepth = targetPath.split("/").length - 1;
		for (let i = 0; i < sourceDepth - targetDepth; i++) {
			relativePagePath = "../" + relativePagePath;
		}

		return relativePagePath;
	}
}

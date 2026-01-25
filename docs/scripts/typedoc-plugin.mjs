// @ts-check
import { Converter, ReflectionKind, CommentTag, Comment, DeclarationReflection, PageKind, Reflection } from "typedoc";
import { MarkdownPageEvent, MarkdownRendererEvent } from "typedoc-plugin-markdown";

/**
 * @param {import("typedoc-plugin-markdown").MarkdownApplication} app
 */
export function load(app) {
	app.converter.on(Converter.EVENT_CREATE_DECLARATION, (context, reflection) => {
		addReactGroups(reflection);
		renameDefaultGroup(reflection);
	});

	/** @type {string | undefined} */
	let packageReadmeEditUrl;
	app.renderer.on(MarkdownRendererEvent.BEGIN, (event) => {
		packageReadmeEditUrl = event.outputDirectory.replace(/^.*\/docs\/src\/reference\//, "https://github.com/prozilla-os/ProzillaOS/edit/main/packages/")
		packageReadmeEditUrl += "/README.md";
	});

	app.renderer.on(MarkdownPageEvent.END, (event) => {
		const source = reformatSources(event);
		const fileName = source?.fileName;
		const sourceUrl = source?.url;

		fixCodeBlockLanguages(event, fileName);
		renameHeadings(event);

		let editUrl;
		if (event.pageKind === PageKind.Index) {
			editUrl = packageReadmeEditUrl;
		} else {
			editUrl = sourceUrl?.replace(/\/blob\/[a-zA-ZZ0-9]+\//, "/edit/main/");
		}
		insertFrontmatter(event, editUrl);
	});
}

/**
 * @param {DeclarationReflection} reflection 
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
 * @param {DeclarationReflection} reflection 
 */
function renameDefaultGroup(reflection) {
	if (reflection.kind === ReflectionKind.TypeAlias) {
		addGroup(reflection, "Types");
	} else if (reflection.kind === ReflectionKind.Enum) {
		addGroup(reflection, "Enums");
	}
}

/**
 * @param {DeclarationReflection} reflection 
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
 * @param {DeclarationReflection} reflection 
 */
function getGroup({ name }) {
	if (name.startsWith("use") && name.length > 3 && name[3] === name[3].toUpperCase()) {
		return "Hooks";
	} else if (name[0] === name[0].toUpperCase() && name !== name.toUpperCase()) {
		return "Components"
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

		if (!line.startsWith("Defined in: [")) {
			contents.push(line);
			return;
		}

		if (!firstSource) {
			const results = line.match(/\[([^\]]+)\]\(([^)]+)\)/);

			firstSource = {};
			if (results) {
				const path = results[1];
				const url = results[2];
				const fileName = path
					.substring(path.lastIndexOf("/") + 1, path.lastIndexOf(":"))
					.trim();

				contents.push(`**Source:** [${fileName}](${url})`);
				firstSource.fileName = fileName;
				firstSource.url = url;
			}
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

			description = description.replace(/\`/g, "").trim().split("\n")[0].trim();

			if (description.length) {
				frontmatter.description = description;
			} else {
				const lines = event.contents.split("\n")
					.map((line) => line.trim())
					.filter((line) => line.length > 0);
				const firstSection = lines.findIndex((line) => line.startsWith("##"));

				if (firstSection >= 0) {
					description = lines[firstSection - 1];
					if (!description.startsWith("**Source")) {
						frontmatter.description = description;
					}
				}
			}
		}
	} else {
		// Replace header image with title 
		event.contents = event.contents.replace(/^\s*\<div(.|\s)*?\<\/div\>/, "# " + event.project.packageName);
		
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
		event.contents = event.contents.replaceAll(/^\`{3}ts\s*$/gm, "```tsx");
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
			event.contents = event.contents.replace(/^## Enumeration Members\s*$/mi, "## Members\n");
		}
	}
}

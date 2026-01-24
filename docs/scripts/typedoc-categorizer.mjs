// @ts-check
import { Converter, ReflectionKind, CommentTag, Comment, DeclarationReflection } from "typedoc";
import { MarkdownPageEvent } from "typedoc-plugin-markdown";

/**
 * @param {import("typedoc-plugin-markdown").MarkdownApplication} app
 */
export function load (app) {
	app.converter.on(Converter.EVENT_CREATE_DECLARATION, (context, reflection) => {
		addReactGroups(reflection);
		addTypesGroup(reflection);
	});

	app.renderer.on(MarkdownPageEvent.END, (event) => {
		reformatSources(event);
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
function addTypesGroup(reflection) {
	if (reflection.kind !== ReflectionKind.TypeAlias)
		return;

	addGroup(reflection, "Types");
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
	let firstSource = true;

	event.contents.split("\n").forEach((line) => {
		if (line.startsWith("Defined in: node\\_modules")) {
			// TO DO: add support for CSS exports (e.g., utilStyles)
			return;
		}

		if (!line.startsWith("Defined in: [")) {
			contents.push(line);
			return;
		}

		if (firstSource) {
			const results = line.match(/\[([^\]]+)\]\(([^)]+)\)/);

			if (results) {
				const path = results[1];
				const url = results[2];
				const fileName = path.substring(path.lastIndexOf("/") + 1, path.lastIndexOf(":"));

				contents.push(`**Source:** [${fileName}](${url})`);
			}

			firstSource = false;
		}
	});
	
	event.contents = contents.join("\n");
}
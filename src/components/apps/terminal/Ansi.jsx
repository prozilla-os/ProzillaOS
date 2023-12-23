import Anser, { AnserJsonEntry } from "anser";
import { escapeCarriageReturn } from "escape-carriage";
import * as React from "react";
import styles from "./Terminal.module.css";

/**
 * This was copied from
 * https://github.com/nteract/ansi-to-react/blob/master/src/index.ts
 */

/**
 * Converts ANSI strings into JSON output.
 * @name ansiToJSON
 * @function
 * @param {string} input - The input string.
 * @param {boolean=} use_classes - If `true`, HTML classes will be appended
 *                              to the HTML output.
 * @returns {AnserJsonEntry[]} The parsed input.
 */
function ansiToJSON(input, use_classes) {
	input = escapeCarriageReturn(fixBackspace(input));
	return Anser.ansiToJson(input, {
		json: true,
		remove_empty: true,
		use_classes,
	});
}

/**
 * Create a class string.
 * @param {AnserJsonEntry} bundle
 * @returns {string} class name(s)
 */
function createClass(bundle) {
	const classNames = [];

	if (bundle.bg) {
		classNames.push(styles[`${bundle.bg}-bg`]);
	}
	if (bundle.fg) {
		classNames.push(styles[`${bundle.fg}-fg`]);
	}
	if (bundle.decoration) {
		classNames.push(styles[`ansi-${bundle.decoration}`]);
	}

	if (classNames.length === 0) {
		return null;
	}

	return classNames.join(" ");
}

/**
 * Create the style attribute.
 * @param {AnserJsonEntry} bundle
 * @returns {object} returns the style object
 */
function createStyle(bundle) {
	const style = {};
	if (bundle.bg) {
		style.backgroundColor = `rgb(${bundle.bg})`;
	}
	if (bundle.fg) {
		style.color = `rgb(${bundle.fg})`;
	}
	switch (bundle.decoration) {
		case "bold":
			style.fontWeight = "bold";
			break;
		case "dim":
			style.opacity = "0.5";
			break;
		case "italic":
			style.fontStyle = "italic";
			break;
		case "hidden":
			style.visibility = "hidden";
			break;
		case "strikethrough":
			style.textDecoration = "line-through";
			break;
		case "underline":
			style.textDecoration = "underline";
			break;
		case "blink":
			style.textDecoration = "blink";
			break;
		default:
			break;
	}
	return style;
}

/**
 * Converts an Anser bundle into a React Node.
 * @param {boolean} linkify - whether links should be converting into clickable anchor tags.
 * @param {boolean} useClasses - should render the span with a class instead of style.
 * @param {AnserJsonEntry} bundle - Anser output.
 * @param {number} key
 */
function convertBundleIntoReact(linkify, useClasses, bundle, key) {
	const style = useClasses ? null : createStyle(bundle);
	const className = useClasses ? createClass(bundle) : null;

	if (!linkify) {
		return React.createElement(
			"pre",
			{ style, key, className },
			bundle.content
		);
	}

	const content = [];
	const linkRegex = /(\s|^)(https?:\/\/(?:www\.|(?!www))[^\s.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/g;

	let index = 0;
	let match;
	while ((match = linkRegex.exec(bundle.content)) !== null) {
		const [, pre, url] = match;

		const startIndex = match.index + pre.length;
		if (startIndex > index) {
			content.push(bundle.content.substring(index, startIndex));
		}

		// Make sure the href we generate from the link is fully qualified. We assume http
		// if it starts with a www because many sites don't support https
		const href = url.startsWith("www.") ? `http://${url}` : url;
		content.push(
			React.createElement(
				"a",
				{
					key: index,
					href,
					target: "_blank",
				},
				`${url}`
			)
		);

		index = linkRegex.lastIndex;
	}

	if (index < bundle.content.length) {
		content.push(bundle.content.substring(index));
	}

	return React.createElement("span", { style, key, className }, content);
}

/**
 * @param {object} props 
 * @param {string=} props.children
 * @param {boolean=} props.linkify
 * @param {string=} props.className
 * @param {boolean=} props.useClasses
 */
export default function Ansi(props) {
	const { className, useClasses, children, linkify } = props;
	return React.createElement(
		"code",
		{ className },
		ansiToJSON(children ?? "", useClasses ?? false).map(
			convertBundleIntoReact.bind(null, linkify ?? false, useClasses ?? false)
		)
	);
}

// This is copied from the Jupyter Classic source code
// notebook/static/base/js/utils.js to handle \b in a way
// that is **compatible with Jupyter classic**.   One can
// argue that this behavior is questionable:
//   https://stackoverflow.com/questions/55440152/multiple-b-doesnt-work-as-expected-in-jupyter#
function fixBackspace(txt) {
	let tmp = txt;
	do {
		txt = tmp;
		// Cancel out anything-but-newline followed by backspace
		// eslint-disable-next-line no-control-regex
		tmp = txt.replace(/[^\n]\x08/gm, "");
	} while (tmp.length < txt.length);
	return txt;
}

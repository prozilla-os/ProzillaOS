import { NAME } from "../../config/branding.config.js";

/**
 * Simulates closing the viewport by opening a blank page
 * @param {boolean} requireConfirmation
 */
export function closeViewport(requireConfirmation = false) {
	if (requireConfirmation && window.confirm(`Are you sure you want to shut down ${NAME}?`)) {
		console.info("Closing viewport");
		window.open("about:blank", "_self");
	}
}

/**
 * Reloads the viewport
 * @param {boolean} bypassCache 
 */
export function reloadViewport(bypassCache = false) {
	console.info("Reloading viewport");
	window.location.reload(bypassCache);
}

/**
 * @param {string} string 
 * @returns {boolean}
 */
export function isValidUrl(string) {
	try {
		new URL(string);
		return true;
	} catch (err) {
		return false;
	}
}

/**
 * @param {string} title 
 */
export function setViewportTitle(title) {
	document.title = title;
}

/**
 * @param {string} url 
 */
export function setViewportIcon(url) {
	let link = document.querySelector("link[rel~='icon']");
	if (!link) {
		link = document.createElement("link");
		link.rel = "icon";
		document.head.appendChild(link);
	}
	link.href = url;
}
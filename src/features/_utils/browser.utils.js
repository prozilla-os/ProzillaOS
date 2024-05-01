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

/**
 * @returns {URLSearchParams}
 */
export function getViewportParams() {
	const query = window.location.search.slice(1);

	const params = {};
	query.split("&").forEach((param) => {
		// For some reason, URI components only decode when decoded twice
		// Please find a fix, or create a custom function
		const [key, value] = param.split("=").map((item) => decodeURIComponent(decodeURIComponent(item)));
		params[key] = value;
	});

	return params;
}

/**
 * @param {object} options 
 * @param {string} options.appId
 * @param {boolean} options.fullscreen
 */
export function generateUrl(options) {
	const baseUrl = window.location.origin + "/";

	if (!options || Object.keys(options).length === 0)
		return baseUrl;

	const { appId, fullscreen, ...extraOptions } = options;
	const params = new URLSearchParams();

	if (appId)
		params.set("app", appId);
	if (fullscreen)
		params.set("fullscreen", fullscreen.toString());

	if (extraOptions && Object.keys(extraOptions).length > 0) {
		Object.entries(extraOptions).forEach(([key, value]) => {
			if (key && value)
				params.set(key, encodeURIComponent(value));
		});
	}

	if (params.size === 0)
		return baseUrl;

	const url = `${baseUrl}?${params.toString()}`;
	return url;
}

/**
 * @param {string} string 
 * @param {Function} onSuccess 
 * @param {Function} onFail 
 */
export function copyToClipboard(string, onSuccess, onFail) {
	navigator.clipboard.writeText(string).then(onSuccess, onFail);
}
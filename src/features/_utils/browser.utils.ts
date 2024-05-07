import { NAME } from "../../config/branding.config";

/**
 * Simulates closing the viewport by opening a blank page
 */
export function closeViewport(requireConfirmation: boolean = false) {
	if (requireConfirmation && window.confirm(`Are you sure you want to shut down ${NAME}?`)) {
		console.info("Closing viewport");
		window.open("about:blank", "_self");
	}
}

/**
 * Reloads the viewport
 */
export function reloadViewport() {
	console.info("Reloading viewport");
	window.location.reload();
}

export function isValidUrl(string: string): boolean {
	try {
		new URL(string);
		return true;
	} catch (err) {
		return false;
	}
}

export function setViewportTitle(title: string) {
	document.title = title;
}

export function setViewportIcon(url: string) {
	let link: HTMLLinkElement = document.querySelector("link[rel~='icon']");
	if (!link) {
		link = document.createElement("link");
		link.rel = "icon";
		document.head.appendChild(link);
	}
	link.href = url;
}

export function getViewportParams(): Record<string, string> {
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

export function generateUrl(options: { appId: string; fullscreen: boolean; }) {
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
				params.set(key, encodeURIComponent(value as string));
		});
	}

	if (params.size === 0)
		return baseUrl;

	const url = `${baseUrl}?${params.toString()}`;
	return url;
}

export function copyToClipboard(string: string, onSuccess: (value: void) => void, onFail: (value: void) => void) {
	navigator.clipboard.writeText(string).then(onSuccess, onFail);
}
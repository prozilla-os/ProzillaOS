/**
 * Simulates closing the viewport by opening a blank page
 * @param {boolean} requireConfirmation
 */
export function closeViewport(requireConfirmation = false) {
	if (requireConfirmation && window.confirm("Are you sure you want to shut down ProzillaOS?")) {
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
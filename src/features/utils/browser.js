export function closeTab() {
	if (window.confirm("Are you sure you want to shut down ProzillaOS?")) {
		window.open("about:blank", "_self");
	}
}
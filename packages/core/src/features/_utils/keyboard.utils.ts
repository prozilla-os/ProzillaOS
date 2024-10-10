/**
 * Formats a shortcut (combination of keys) into a human-readable format.
 * 
 * For a list of valid key values, refer to this page: <https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values>
 */
export function formatShortcut(shortcut: string[]): string {
	const specialKeys: string[] = [];
	const singleKeys: string[] = [];

	shortcut.forEach((key) => {
		if (key.length > 1) {
			switch (key) {
				case "Control":
					specialKeys.push("Ctrl");
					break;
				default:
					specialKeys.push(key);
					break;
			}
		} else {
			switch (key) {
				case "+":
					singleKeys.push("Plus");
					break;
				case "-":
					singleKeys.push("Minus");
					break;
				default:
					singleKeys.push(key.toUpperCase());
					break;
			}
		}
	});

	return specialKeys.concat(singleKeys).join("+");
}
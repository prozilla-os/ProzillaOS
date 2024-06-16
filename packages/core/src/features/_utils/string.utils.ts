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
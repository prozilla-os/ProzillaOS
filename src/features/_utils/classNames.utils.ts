export function classNames(...args: string[]) {
	let className = "";

	for (let i = 0; i < args.length; i++) {
		const value = args[i];

		if (typeof value === "string") {
			className += value + " ";
		} else if (Array.isArray(value)) {
			className += classNames(...value as string[]) + " ";
		}
	}

	return className.trim();
}
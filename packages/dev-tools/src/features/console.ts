import { ANSI } from "@prozilla-os/shared";

export type Status = "error" | "info" | "file" | "success" | "start";

/**
 * @deprecated Use {@link Print} instead
 */
export function print(message: string, status?: Status, newLine?: boolean) {
	if (newLine)
		console.log("");

	if (status == null)
		return console.log(message);

	switch (status) {
		case "start":
			console.log(`${ANSI.fg.yellow}${message}...${ANSI.reset}`);
			break;
		case "file":
			console.log(`- ${ANSI.fg.cyan}${message}${ANSI.reset}`);
			break;
		case "success":
			console.log(`${ANSI.fg.green}✓ ${message}${ANSI.reset}`);
			break;
		case "error":
			console.error(`${ANSI.fg.red}⚠ ${message}${ANSI.reset}`);
			break;
		default:
			console.log(message);
			break;
	}
}
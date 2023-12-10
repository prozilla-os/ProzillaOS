import { reloadViewport } from "../../../utils/browser.js";
import Command from "../command.js";

export const reboot = new Command("reboot", () => {
	reloadViewport();
	return { blank: true };
});
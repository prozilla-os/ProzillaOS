import { START_DATE } from "../../../../index.js";
import { formatRelativeTime } from "../../../utils/date.js";
import Command from "../command.js";


export const uptime = new Command("uptime")
	.setManual({
		purpose: "Displays the current uptime of the system"
	})
	.setExecute(() => {
		return `Uptime: ${formatRelativeTime(START_DATE, 2, false)}`;
	});
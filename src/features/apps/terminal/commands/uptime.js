import { START_DATE } from "../../../../index";
import { formatRelativeTime } from "../../../_utils/date.utils.js";
import Command from "../command";


export const uptime = new Command()
	.setManual({
		purpose: "Display the current uptime of the system"
	})
	.setExecute(() => {
		return `Uptime: ${formatRelativeTime(START_DATE, 2, false)}`;
	});
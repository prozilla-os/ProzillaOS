import { formatRelativeTime } from "@prozilla-os/shared";

export class TimeManager {
	static START_DATE: Date;

	/**
	 * Resets the time
	 */
	static reset() {
		TimeManager.START_DATE = new Date();
	}

	/**
	 * Get the current uptime
	 */
	static getUptime(precision = 2) {
		return formatRelativeTime(TimeManager.START_DATE, precision, false);
	}
}
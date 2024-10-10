import { formatRelativeTime } from "@prozilla-os/shared";

export class TimeManager {
	static startDate: Date;

	/**
	 * Resets the time
	 */
	static reset() {
		TimeManager.startDate = new Date();
	}

	/**
	 * Get the current uptime
	 */
	static getUptime(precision = 2) {
		return formatRelativeTime(TimeManager.startDate, precision, false);
	}
}
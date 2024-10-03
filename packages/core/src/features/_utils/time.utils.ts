import { formatRelativeTime } from "@prozilla-os/shared";

export class TimeManager {
	static startDate: Date;

	static reset() {
		TimeManager.startDate = new Date();
	}

	static getUptime(precision = 2) {
		return formatRelativeTime(TimeManager.startDate, precision, false);
	}
}
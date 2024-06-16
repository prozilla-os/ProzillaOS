const TIME_INDICATORS = {
	"s": 1000,
	"m": 1000 * 60,
	"h": 1000 * 60 * 60,
	"d": 1000 * 60 * 60 * 24,
	"w": 1000 * 60 * 60 * 24 * 7,
	"n": 1000 * 60 * 60 * 24 * 31,
	"y": 1000 * 60 * 60 * 24 * 365,
	"c": 1000 * 60 * 60 * 24 * 365 * 100
};

/**
 * Format a time
 * @param time - Time in milliseconds
 * @param maxLength - The maximum amount of units, e.g.: 3 => years, months, days
 */
export function formatTime(time: number, maxLength: number = 3, allowAffixes: boolean): string {
	const result: string[] = [];

	const formatResult = (result: string[], inPast: boolean): string => {
		if (!allowAffixes)
			return result.join(", ");

		let prefix = "";
		let suffix = "";

		if (inPast) {
			suffix = "ago";
		} else {
			prefix = "in";
		}

		return [prefix, result.join(", "), suffix].join(" ").trim();
	};

	let inPast = false;

	if (time < 0) {
		time = -time;
		inPast = true;
	}

	if (Math.abs(time) < TIME_INDICATORS.s) {
		return formatResult(["less than a second"], inPast);
	}

	const units: { amount: number, label: string }[] = [];
	const unitLabels: Record<string, string> = {
		"s": "seconds",
		"m": "minutes",
		"h": "hours",
		"d": "days",
		"n": "months",
		"y": "years",
	};

	for (const [key, value] of Object.entries(TIME_INDICATORS).reverse()) {
		if (key === "w" || key === "c")
			continue;

		const amount = Math.floor(time / value);
		time -= amount * value;

		if (amount > 0)
			units.push({ amount, label: unitLabels[key] });
	}

	for (let i = 0; i < maxLength; i++) {
		const unit = units[i];

		if (unit)
			result.push(`${unit.amount} ${unit.label}`);
	}

	if (result.length === 0) {
		return formatResult(["less than a second"], inPast);
	} else {
		return formatResult(result, inPast);
	}
};

/**
 * Format a time relative to now
 * @param date - The date
 * @param maxLength - The maximum amount of units, e.g.: 3 => years, months, days
 */
export function formatRelativeTime(date: Date, maxLength: number = 3, allowAffixes: boolean): string {
	const difference = date.valueOf() - Date.now();
	return formatTime(difference, maxLength, allowAffixes);
};
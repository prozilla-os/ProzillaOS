export function clamp(value: number, min: number, max: number): number {
	if (value < min) {
		return min;
	} else if (value > max) {
		return max;
	} else {
		return value;
	}
}

export function randomRange(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}

export function round(value: number, precision: number): number {
	const multiplier = Math.pow(10, precision || 0);
	return Math.round(value * multiplier) / multiplier;
}
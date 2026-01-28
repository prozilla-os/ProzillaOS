/**
 * Clamps a value between an upper and lower bound.
 * @param value - The value to clamp.
 * @param min - The lower bound.
 * @param max - The upper bound.
 * @returns The clamped value.
 */
export function clamp(value: number, min: number, max: number): number {
	if (value < min) {
		return min;
	} else if (value > max) {
		return max;
	} else {
		return value;
	}
}

/**
 * Returns a random value inside a range.
 * @param min - The lower bound.
 * @param max - The upper bound.
 */
export function randomRange(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}

/**
 * Rounds a value.
 * @param value - The value to round.
 * @param precision - The precision to round with.
 */
export function round(value: number, precision?: number): number {
	const factor = Math.pow(10, precision ?? 0);
	return Math.round(value * factor) / factor;
}
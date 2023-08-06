/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomRange(min, max) {
	return Math.random() * (max - min) + min;
}
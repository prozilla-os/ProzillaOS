/**
 * @param {number} value 
 * @param {number} precision 
 * @returns {number}
 */
export function round(value, precision) {
	const multiplier = Math.pow(10, precision || 0);
	return Math.round(value * multiplier) / multiplier;
}
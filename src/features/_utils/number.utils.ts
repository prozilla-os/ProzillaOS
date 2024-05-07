export function isValidInteger(number: number | string): number| boolean {
	return (typeof number === "number" || parseInt(number) || parseInt(number) === 0);
}
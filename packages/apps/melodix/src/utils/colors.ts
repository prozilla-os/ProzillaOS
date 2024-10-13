export function hsl(values: string) {
	return `hsl(${values})`;
}

export function hsla(values: string, opacity: string) {
	return `hsla(${values}, ${opacity})`;
}
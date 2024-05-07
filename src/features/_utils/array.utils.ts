export function removeFromArray(item: any, array: any[]) {
	const index = array.indexOf(item);
	if (index !== -1) {
		array.splice(index, 1);
	}
}

export function randomFromArray(array: any[]): any {
	return array[Math.floor(Math.random() * array.length)];
}

export function removeDuplicatesFromArray(array: any[]): any[] {
	return array.filter((item, index) => array.indexOf(item) === index);
}
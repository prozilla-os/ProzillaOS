/**
 * Removes an item from an array.
 * @param item - The item to remove.
 */
export function removeFromArray<Type>(item: Type, array: Type[]) {
	const index = array.indexOf(item);
	if (index !== -1) {
		array.splice(index, 1);
	}
}

/**
 * Returns a random item from an array.
 */
export function randomFromArray<Type>(array: Type[]): Type {
	return array[Math.floor(Math.random() * array.length)];
}

/**
 * Removes all duplicate items from an array.
 */
export function removeDuplicatesFromArray<Type>(array: Type[]): Type[] {
	return array.filter((item, index) => array.indexOf(item) === index);
}

/**
 * Inserts an item in between every item in an array.
 * @param item - The item to insert.
 * @param array - The array to insert into.
 */
export function interleave<Type>(item: Type, array: Type[]) {
	return array.flatMap((nextItem) => [item, nextItem]).slice(1);
}

export function replaceAll<Type>(array: Type[], searchItem: Type, replaceItem: Type) {
	return array.map((item) => item === searchItem ? replaceItem : item);
}
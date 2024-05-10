export function removeFromArray<Type>(item: Type, array: Type[]) {
	const index = array.indexOf(item);
	if (index !== -1) {
		array.splice(index, 1);
	}
}

export function randomFromArray<Type>(array: Type[]): Type {
	return array[Math.floor(Math.random() * array.length)];
}

export function removeDuplicatesFromArray<Type>(array: Type[]): Type[] {
	return array.filter((item, index) => array.indexOf(item) === index);
}
/**
 * @param {*} item 
 * @param {*[]} array 
 */
export function removeFromArray(item, array) {
	const index = array.indexOf(item);
	if (index !== -1) {
		array.splice(index, 1);
	}
}

/**
 * @param {*[]} array 
 * @returns {*}
 */
export function randomFromArray(array) {
	return array[Math.floor(Math.random() * array.length)];
}
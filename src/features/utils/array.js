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
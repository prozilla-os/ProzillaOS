export default class Application {
	/**
	 * @param {String} name 
	 * @param {String} id 
	 * @param {React.ReactElement} windowContent 
	 */
	constructor(name, id, windowContent) {
		Object.assign(this, { name, id, windowContent });
	}
}
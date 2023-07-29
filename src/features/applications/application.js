export default class Application {
	/**
	 * @param {String} name 
	 * @param {String} id
	 * @param {React.ReactElement} windowContent 
	 * @param {Object|null} windowOptions - Default window options
	 */
	constructor(name, id, windowContent, windowOptions) {
		Object.assign(this, { name, id, windowContent, windowOptions });

		if (this.windowContent == null)
			console.warn(`App (${this.id}) is missing the windowContent property.`);
	}

	WindowContent = (props) => {
		props = {...props, ...this.windowOptions};

		if (this.windowContent == null) {
			return null;
		}

		return <this.windowContent {...props}/>;
	}
}
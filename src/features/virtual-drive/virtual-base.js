
export class VirtualBase {
	/**
	 * @param {String} name 
	 */
	constructor(name) {
		this.name = name;
	}

	get id() {
		return this.name;
	}

	/**
	 * @param {String} name 
	 */
	setName(name) {
		this.name = name;
		return this;
	}

	setAlias(alias) {
		this.alias = alias;
		this.getRoot().addShortcut(alias, this);
		return this;
	}

	/**
	 * @param {VirtualBase} parent 
	 */
	setParent(parent) {
		this.parent = parent;
		return this;
	}

	delete() {
		this.parent.remove?.(this);
	}

	open() {
		
	}

	get path() {
		return this.alias ?? this.absolutePath;
	}

	get absolutePath() {
		return this.parent?.path + "/" + this.id;
	}

	getRoot() {
		const root = this.root ?? this.parent.getRoot();

		if (root === null) {
			throw new Error("Root not found");
		}

		return root;
	}
}
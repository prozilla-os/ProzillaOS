export class State {
	value: number;

	static readonly LOW = new State(0);
	static readonly HIGH = new State(1);

	constructor(value: number) {
		this.value = value;
	}

	static invert(state: State) {
		return new State(1 - state.value);
	}

	isEqual(state: State) {
		return this.value === state.value;
	}

	isLow() {
		return this.value === 0;
	}

	isHigh() {
		return this.value === 1;
	}
}
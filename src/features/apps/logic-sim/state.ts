export class State {
	value: number;

	static LOW = new State(0);
	static HIGH = new State(1);

	constructor(value: number) {
		this.value = value;
	}

	static invert(state: State) {
		return new State(1 - state.value);
	}

	isEqual(state: State) {
		return this.value === state.value;
	}
}
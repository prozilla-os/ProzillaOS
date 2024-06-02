import Vector2 from "../../math/vector2";
import { Circuit } from "./circuit";
import { Pin } from "./pin";
import { State } from "./state";

export class Chip {
	color: string;
	name: string;
	position: Vector2;
	circuit: Circuit;

	inputCount: number;
	outputCount: number;
	inputPins: Pin[];
	outputPins: Pin[];
	logic: (inputStates: State[]) => State[];

	constructor(circuit: Circuit | null, name: string, color: string, inputCount: number, outputCount: number) {
		Object.assign(this, { circuit, name, color, inputCount, outputCount });

		if (this.circuit == null)
			this.circuit = this as unknown as Circuit;

		this.inputPins = [];
		for (let i = 0; i < inputCount; i++) {
			this.inputPins.push(new Pin(this.circuit, "IN " + i, true, this, i));
		}

		this.outputPins = [];
		for (let i = 0; i < outputCount; i++) {
			this.outputPins.push(new Pin(this.circuit, "OUT " + i, false, this, i));
		}
	}

	setInputState(index: number, state: State) {
		if (this.inputPins[index].state.isEqual(state))
			return;

		this.inputPins[index].state = state;
		this.update();
	}

	update() {
		const inputStates: State[] = [];
		for (let i = 0; i < this.inputCount; i++) {
			const state = this.inputPins[i].state ?? State.LOW;
			inputStates.push(state);
		}

		const outputStates: State[] = this.logic(inputStates);

		for (let i = 0; i < this.outputCount; i++) {
			this.outputPins[i].state = outputStates[i];
		}
	}

	drawPins() {
		this.inputPins.forEach((pin) => pin.draw());
		this.outputPins.forEach((pin) => pin.draw());
	}

	draw() {
		this.drawPins();
	}
}
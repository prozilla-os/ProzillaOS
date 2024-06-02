import { CHIP, COLORS } from "../../../config/apps/logicSim.config";
import Vector2 from "../../math/vector2";
import { Circuit } from "./circuit";
import { Pin } from "./pin";
import { State } from "./state";

export class Chip {
	color: string;
	name: string;
	position: Vector2;
	size: Vector2;
	circuit: Circuit;
	isCircuit = true;

	inputCount: number;
	outputCount: number;
	inputPins: Pin[];
	outputPins: Pin[];
	logic: (inputStates: State[]) => State[];

	constructor(circuit: Circuit | null, name: string, color: string, size: Vector2, inputCount: number, outputCount: number) {
		Object.assign(this, { circuit, name, color, size, inputCount, outputCount });

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

	setCircuit(circuit: Circuit) {
		this.circuit = circuit;

		this.inputPins.concat(this.outputPins).forEach((pin) => { pin.circuit = circuit; });
	}

	setLogic(logic: (inputStates: State[]) => State[]) {
		this.logic = logic;
		return this;
	}

	update() {
		if (this.logic == null)
			return;

		const inputStates: State[] = [];
		for (let i = 0; i < this.inputCount; i++) {
			const state = this.inputPins[i].state ?? State.LOW;
			inputStates.push(state);
		}

		const outputStates: State[] = this.logic(inputStates);

		for (let i = 0; i < this.outputCount; i++) {
			this.outputPins[i].setState(outputStates[i]);
		}
	}

	drawPins(reposition = true) {
		this.inputPins.forEach((pin, index) => {
			if (reposition) {
				const gap = this.size.y / (this.inputCount + 1);
				pin.position.x = this.position.x;
				pin.position.y = this.position.y + gap * (index + 1);
			}

			pin.draw();
		});

		this.outputPins.forEach((pin, index) => {
			if (reposition) {
				const gap = this.size.y / (this.outputCount + 1);
				pin.position.x = this.position.x + this.size.x;
				pin.position.y = this.position.y + gap * (index + 1);
			}

			pin.draw();
		});
	}

	draw() {
		this.circuit.drawRect(
			this.circuit.getColor(this.color + "-b"),
			this.position.x, this.position.y,
			this.size.x, this.size.y
		);
		this.circuit.drawRect(
			this.circuit.getColor(this.color + "-a"),
			this.position.x + CHIP.padding, this.position.y + CHIP.padding,
			this.size.x - CHIP.padding * 2, this.size.y - CHIP.padding * 2
		);

		this.circuit.drawText(
			this.circuit.getColor(COLORS.chip.text),
			"center",
			this.position.x + this.size.x / 2, this.position.y + this.size.y / 2,
			CHIP.fontSize,
			this.name
		);

		this.drawPins();
	}
}
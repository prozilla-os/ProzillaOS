import { Circuit } from "../circuit";
import { Pin, PinJson } from "../pins/pin";
import { State } from "../_utils/state";
import { Vector2 } from "@prozilla-os/core";
import { CHIP, COLORS, PIN } from "../../constants/logicSim.const";

export interface ChipJson {
	color: string;
	name: string;
	position: {
		x: number;
		y: number;
	};
	inputPins?: PinJson[];
	outputPins?: PinJson[];
}

export class Chip {
	color!: string;
	name!: string;
	position = Vector2.ZERO;
	size!: Vector2;
	circuit!: Circuit;
	isCircuit = false;
	isBlueprint = false;

	inputCount = 0;
	outputCount = 0;
	inputPins!: Pin[];
	outputPins!: Pin[];
	logic!: (inputStates: State[]) => State[];

	constructor(circuit: Circuit | null, name: string, color: string, isBlueprint: boolean, inputCount: number, outputCount: number) {
		Object.assign(this, { circuit, name, color, isBlueprint, inputCount, outputCount });

		if (this.circuit == null && !isBlueprint) {
			this.circuit = this as unknown as Circuit;
			this.isCircuit = true;
		}

		if (this.isCircuit || this.isBlueprint)
			return;


		if (this.circuit != null) {
			const textRect = this.circuit.getTextRect(CHIP.fontSize, this.name);

			const width = textRect.x + (CHIP.padding + CHIP.BorderWidth) * 2;
			const minHeight = textRect.y + (CHIP.padding + CHIP.BorderWidth) * 2;
	
			this.size = new Vector2(width, minHeight);
		}

		this.inputPins = [];
		for (let i = 0; i < inputCount; i++) {
			const newPin = new Pin(this.circuit, "IN " + i, true, this);
			this.inputPins.push(newPin);

			if (this.isCircuit)
				newPin.isControlled = true;
		}

		this.outputPins = [];
		for (let i = 0; i < outputCount; i++) {
			const newPin = new Pin(this.circuit, "OUT " + i, false, this);
			this.outputPins.push(newPin);

			if (this.isCircuit)
				newPin.isControlled = true;
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
				const gap = (this.size.y - this.inputCount * PIN.radius * 2) / (this.inputCount + 1);
				pin.position.x = this.position.x;
				pin.position.y = this.position.y + (gap * (index + 1) + PIN.radius * (2 * index + 1)) / this.circuit.size.y;
			}

			const isPlacingPin = this.circuit.inputHandler.isPlacingPin(pin, index);
			pin.draw(isPlacingPin);
		});

		this.outputPins.forEach((pin, index) => {
			if (reposition) {
				const gap = (this.size.y - this.outputCount * PIN.radius * 2) / (this.outputCount + 1);
				pin.position.x = this.position.x + this.size.x / this.circuit.size.x;
				pin.position.y = this.position.y + (gap * (index + 1) + PIN.radius * (2 * index + 1)) / this.circuit.size.y;
			}

			const isPlacingPin = this.circuit.inputHandler.isPlacingPin(pin, index);
			pin.draw(isPlacingPin);
		});
	}

	draw(isPlacing: boolean) {
		const positionX = this.position.x * this.circuit.size.x;
		const positionY = this.position.y * this.circuit.size.y;

		this.circuit.drawRect(
			this.circuit.getColor(this.color + "-1"),
			positionX, positionY,
			this.size.x, this.size.y
		);
		this.circuit.drawRect(
			this.circuit.getColor(this.color + "-0"),
			positionX + CHIP.BorderWidth, positionY + CHIP.BorderWidth,
			this.size.x - CHIP.BorderWidth * 2, this.size.y - CHIP.BorderWidth * 2
		);

		this.circuit.drawText(
			this.circuit.getColor(COLORS.chip.text),
			"center",
			positionX + this.size.x / 2, positionY + this.size.y / 2,
			CHIP.fontSize,
			this.name
		);

		if (isPlacing) {
			this.circuit.setDrawingOpacity(0.25);
			this.circuit.drawRect(
				this.circuit.getColor(COLORS.chip.outline),
				positionX - CHIP.placingOutline, positionY - CHIP.placingOutline,
				this.size.x + CHIP.placingOutline * 2, this.size.y + CHIP.placingOutline * 2
			);
			this.circuit.resetDrawingOpacity();
		}

		this.drawPins();
	}

	toJson(): ChipJson {
		const object: ChipJson = {
			color: this.color,
			name: this.name,
			position: {
				x: this.position.x,
				y: this.position.y,
			},
		};

		if (this.inputPins.length > 0)
			object.inputPins = this.inputPins.map((pin) => pin.toJson());

		if (this.outputPins.length > 0)
			object.outputPins = this.outputPins.map((pin) => pin.toJson());

		return object;
	}
}
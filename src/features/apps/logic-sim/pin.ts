import { COLORS, CURSORS, PIN } from "../../../config/apps/logicSim.config";
import Vector2 from "../../math/vector2";
import { Chip } from "./chip";
import { Circuit } from "./circuit";
import { State } from "./state";
import { Wire } from "./wire";

export class Pin {
	name: string;
	position: Vector2;
	attachedChip: Chip;
	index: number;
	circuit: Circuit;

	state = State.LOW;
	isInput: boolean;
	outputWire: Wire;

	constructor(circuit: Circuit, name: string, isInput: boolean, attachedChip: Chip, index: number) {
		Object.assign(this, { circuit, name, isInput, attachedChip, index });
	}

	setOutputWire(wire: Wire) {
		this.outputWire = wire;
		this.outputWire.setState(this.state);
	}

	setState(state: State) {
		if (this.state.isEqual(state))
			return;

		this.state = state;
		this.update();
	}

	update() {
		if (this.isInput) {
			this.outputWire?.setState(this.state);
		}
	}

	draw() {
		let color = COLORS.pin.fill;

		if (this.circuit.mousePosition.getDistance(this.position.x, this.position.y) <= PIN.radius) {
			this.circuit.cursor = CURSORS.pointer;
			color = COLORS.pin.fillHover;
		}

		this.circuit.drawCircle(
			this.circuit.getColor(color),
			this.position.x, this.position.y,
			PIN.radius
		);
	}
}
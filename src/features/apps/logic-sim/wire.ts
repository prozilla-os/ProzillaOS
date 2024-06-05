import { WIRE } from "../../../config/apps/logicSim.config";
import Vector2 from "../../math/vector2";
import { Circuit } from "./circuit";
import { Pin } from "./pin";
import { State } from "./state";

export class Wire {
	color: string;
	state = State.LOW;
	inputPin: Pin;
	outputPin: Pin;
	anchorPoints: Vector2[];
	circuit: Circuit;

	constructor(circuit: Circuit, color: string, inputPin?: Pin, outputPin?: Pin, anchorPoints?: Vector2[]) {
		Object.assign(this, { circuit, color, inputPin, outputPin, anchorPoints });
	}

	setState(state: State) {
		if (this.state.isEqual(state))
			return;

		this.state = state;
		this.update();
	}

	update() {
		if (this.outputPin == null)
			return;

		this.outputPin.setState(this.state);
	}

	draw(isPlacingWire: boolean) {
		const positions = [...this.anchorPoints];

		if (this.inputPin != null)
			positions.unshift(this.inputPin.position);
		if (this.outputPin != null)
			positions.push(this.outputPin.position);

		let color: string;

		if (isPlacingWire) {
			color = `${this.color}-2`;
		} else if (this.state.value === 1) {
			color = `${this.color}-0`;
		} else {
			color = `${this.color}-2`;
		}

		this.circuit.drawLine(this.circuit.getColor(color), positions, WIRE.width);
	}
}
import Vector2 from "../../math/vector2";
import { Pin } from "./pin";
import { State } from "./state";

export class Wire {
	color: string;
	state = State.LOW;
	inputPin: Pin;
	outputPin: Pin;
	anchorPoints: Vector2[];

	constructor(color: string, inputPin?: Pin, outputPin?: Pin, anchorPoints?: Vector2[]) {
		Object.assign(this, { color, inputPin, outputPin, anchorPoints });
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
}
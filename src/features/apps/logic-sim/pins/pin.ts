import { COLORS, CONTROLLER, CURSORS, PIN } from "../../../../config/apps/logicSim.config";
import { Vector2 } from "../../../math/vector2";
import { Chip } from "../chips/chip";
import { Circuit } from "../core/circuit";
import { State } from "../_utils/state";
import { Wire } from "../wires/wire";

export interface PinJson {
	name: string;
	id: number;
	position: {
		x: number;
		y: number;
	};
}

export class Pin {
	id: number;
	name!: string;
	position = Vector2.ZERO;
	attachedChip!: Chip;
	circuit!: Circuit;

	state = State.LOW;
	isInput!: boolean;
	isControlled: boolean = false;
	outputWires: Wire[] = [];

	constructor(circuit: Circuit, name: string, isInput: boolean, attachedChip: Chip, id?: number) {
		Object.assign(this, { circuit, name, isInput, attachedChip });
		this.id = id ?? this.circuit.getUniqueId();
	}

	addOutputWire(wire: Wire) {
		this.outputWires.push(wire);
		wire.setState(this.state);
	}

	setState(state: State) {
		if (this.state.isEqual(state))
			return;

		this.state = state;
		this.update();
	}

	update() {
		// TO DO: clean this mess
		this.outputWires.forEach((wire) => {
			wire.setState(this.state);
		});
		this.attachedChip?.update();
	}

	get isPointingRight() {
		return this.isInput === this.isControlled;
	}

	draw(isPlacing: boolean) {
		let color = COLORS.pin.fill;

		if (this.circuit.inputHandler.mousePosition.getDistance(this.position.x, this.position.y) <= PIN.radius) {
			this.circuit.cursor = CURSORS.pointer;
			color = COLORS.pin.fillHover;

			// Draw label
			let positionX = this.position.x;
			const leftAligned = this.isPointingRight;
			const textRect = this.circuit.getTextRect(PIN.label.fontSize, this.name);

			if (leftAligned) {
				positionX += PIN.radius + PIN.label.offset;
			} else {
				positionX -= PIN.radius + PIN.label.offset;
			}

			const backgroundSize = {
				x: textRect.x + PIN.label.padding * 2,
				y: textRect.y + PIN.label.padding * 2
			};

			this.circuit.drawRect(
				this.circuit.getColor(COLORS.pin.labelBackground),
				leftAligned ? positionX : positionX - backgroundSize.x, this.position.y - textRect.y / 2 - PIN.label.padding,
				backgroundSize.x, backgroundSize.y
			);

			if (leftAligned) {
				positionX += PIN.label.padding;
			} else {
				positionX -= PIN.label.padding;
			}

			this.circuit.drawText(
				this.circuit.getColor(COLORS.pin.labelText),
				leftAligned ? "left" : "right",
				positionX, this.position.y,
				PIN.label.fontSize,
				this.name
			);
		}

		if (isPlacing)
			this.circuit.setDrawingOpacity(CONTROLLER.placingOpacity);

		this.circuit.drawCircle(
			this.circuit.getColor(color),
			this.position.x, this.position.y,
			PIN.radius
		);

		if (isPlacing)
			this.circuit.resetDrawingOpacity();
	}

	toJson(): PinJson {
		const object = {
			name: this.name,
			id: this.id,
			position: this.position
		} as PinJson;

		return object;
	}
}
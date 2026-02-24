import { Chip } from "../chips/chip";
import { Circuit } from "../circuit";
import { State } from "../_utils/state";
import { Wire } from "../wires/wire";
import { COLORS, CONTROLLER, CURSORS, PIN } from "../../constants/logicSim.const";
import { Vector2 } from "@prozilla-os/shared";

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

	getRawPosition() {
		return Vector2.product(this.position, this.circuit.size);
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

		const { x: positionX, y: positionY } = this.getRawPosition();
		if (this.circuit.inputHandler.rawMousePosition.getDistance(this.position.x * this.circuit.size.x, positionY) <= PIN.radius) {
			this.circuit.cursor = CURSORS.pointer;
			color = COLORS.pin.fillHover;

			// Draw label
			let offsetPositionX = positionX;
			const leftAligned = this.isPointingRight;
			const textRect = this.circuit.getTextRect(PIN.label.fontSize, this.name);

			if (leftAligned) {
				offsetPositionX += PIN.radius + PIN.label.offset;
			} else {
				offsetPositionX -= PIN.radius + PIN.label.offset;
			}

			const backgroundSize = {
				x: textRect.x + PIN.label.padding * 2,
				y: textRect.y + PIN.label.padding * 2,
			};

			this.circuit.drawRect(
				this.circuit.getColor(COLORS.pin.labelBackground),
				leftAligned ? offsetPositionX : offsetPositionX - backgroundSize.x, positionY - textRect.y / 2 - PIN.label.padding,
				backgroundSize.x, backgroundSize.y
			);

			if (leftAligned) {
				offsetPositionX += PIN.label.padding;
			} else {
				offsetPositionX -= PIN.label.padding;
			}

			this.circuit.drawText(
				this.circuit.getColor(COLORS.pin.labelText),
				leftAligned ? "left" : "right",
				offsetPositionX, positionY,
				PIN.label.fontSize,
				this.name
			);
		}

		if (isPlacing)
			this.circuit.setDrawingOpacity(CONTROLLER.placingOpacity);

		this.circuit.drawCircle(
			this.circuit.getColor(color),
			positionX, positionY,
			PIN.radius
		);

		if (isPlacing)
			this.circuit.resetDrawingOpacity();
	}

	toJson(): PinJson {
		const object: PinJson = {
			name: this.name,
			id: this.id,
			position: this.position,
		};

		return object;
	}
}
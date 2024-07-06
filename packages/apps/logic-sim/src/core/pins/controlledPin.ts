import { Vector2 } from "@prozilla-os/core";
import { Circuit } from "../circuit";
import { Pin } from "./pin";
import { COLORS, CONTROLLER, CURSORS } from "../../constants/logicSim.const";

export class ControlledPin extends Pin {
	constructor(circuit: Circuit, name: string, isInput: boolean, id?: number) {
		super(circuit, name, isInput, circuit, id);
		this.isControlled = true;
	}

	drawControllerHandle(isPlacing: boolean) {
		const size = { x: CONTROLLER.handleWidth, y: CONTROLLER.radius * 2 };

		let positionX = this.position.x;
		const positionY = this.position.y - size.y / 2;


		if (this.isInput) {
			positionX -= CONTROLLER.pinOffset + CONTROLLER.handleTrackWidth + CONTROLLER.radius;
		} else {
			positionX += CONTROLLER.pinOffset + (CONTROLLER.handleTrackWidth - CONTROLLER.handleWidth) + CONTROLLER.radius;
		}

		const rect = {
			position: { x: positionX, y: positionY } as Vector2,
			size: { x: size.x, y: size.y } as Vector2
		};

		let color: string;

		if (this.circuit.isPointInsideRect(rect, this.circuit.inputHandler.mousePosition)) {
			color = COLORS.controller.handleHover;
			this.circuit.cursor = CURSORS.pointer;
		} else {
			color = COLORS.controller.handle;
		}

		if (isPlacing)
			this.circuit.setDrawingOpacity(CONTROLLER.placingOpacity);

		this.circuit.drawRect(
			this.circuit.getColor(color),
			rect.position.x, rect.position.y,
			rect.size.x, rect.size.y
		);

		if (isPlacing)
			this.circuit.resetDrawingOpacity();
	}

	drawController(isPlacing: boolean) {
		const positionX = this.isInput ? this.position.x - CONTROLLER.pinOffset : this.position.x + CONTROLLER.pinOffset;
		const positionY = this.position.y;

		let color: string;

		if (this.state.value === 1) {
			color = COLORS.controller.on;
		} else {
			color = COLORS.controller.off;
		}

		if (isPlacing)
			this.circuit.setDrawingOpacity(CONTROLLER.placingOpacity);

		this.circuit.drawCircle(
			this.circuit.getColor(COLORS.controller.stroke),
			positionX, positionY,
			CONTROLLER.radius
		);
		this.circuit.drawCircle(
			this.circuit.getColor(color),
			positionX, positionY,
			CONTROLLER.radius - CONTROLLER.borderWidth
		);

		const isInteractable = this.isInput && this.isControlled && !isPlacing;
		if (isInteractable && this.circuit.inputHandler.mousePosition.getDistance(positionX, positionY) <= CONTROLLER.radius) {
			this.circuit.setDrawingOpacity(0.125);
			this.circuit.drawCircle(
				this.circuit.getColor(COLORS.controller.hover),
				positionX, positionY,
				CONTROLLER.radius - CONTROLLER.borderWidth
			);
			this.circuit.resetDrawingOpacity();
			this.circuit.cursor = CURSORS.pointer;
		}

		if (isPlacing)
			this.circuit.resetDrawingOpacity();
	}

	drawConnector(isPlacing: boolean) {
		if (isPlacing)
			return;

		const positionX = this.isInput ? this.position.x - CONTROLLER.pinOffset : this.position.x;
		const positionY = this.position.y;

		if (isPlacing)
			this.circuit.setDrawingOpacity(CONTROLLER.placingOpacity);

		this.circuit.drawRect(
			this.circuit.getColor(COLORS.controller.connector),
			positionX, positionY - CONTROLLER.connectorWidth / 2,
			CONTROLLER.pinOffset, CONTROLLER.connectorWidth
		);

		if (isPlacing)
			this.circuit.resetDrawingOpacity();
	}

	draw(isPlacing: boolean) {
		this.drawConnector(isPlacing);
		this.drawController(isPlacing);
		this.drawControllerHandle(isPlacing);

		super.draw(isPlacing);
	}
}
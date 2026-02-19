import { Chip } from "./chips/chip";
import { Circuit } from "./circuit";
import { ControlledPin } from "./pins/controlledPin";
import { Pin } from "./pins/pin";
import { State } from "./_utils/state";
import { Wire } from "./wires/wire";
import { Vector2 } from "@prozilla-os/core";
import { CONTROLLER, PIN, WIRE } from "../constants/logicSim.const";

export class InputHandler {
	circuit!: Circuit;
	canvas!: HTMLCanvasElement;

	mousePosition = Vector2.ZERO;
	rawMousePosition = Vector2.ZERO;

	isPlacing = false;
	snapping = false;
	placingOffset = Vector2.ZERO;
	previousPlacement!: Vector2 | null;
	placingWire!: Wire | null;
	placingChip!: Chip | null;
	placingPin!: ControlledPin | null;

	constructor(circuit: Circuit) {
		Object.assign(this, { circuit });
	}

	setMousePosition(event: MouseEvent) {
		const rect = this.canvas.getBoundingClientRect();
		this.rawMousePosition.x = event.clientX - rect.left;
		this.rawMousePosition.y = event.clientY - rect.top;
		this.mousePosition.x = this.rawMousePosition.x / this.circuit.size.x;
		this.mousePosition.y = this.rawMousePosition.y / this.circuit.size.y;
	}

	init() {
		this.canvas = this.circuit.canvas;
		this.mousePosition = Vector2.ZERO;

		// TO DO: add support for touch devices

		this.canvas.addEventListener("mousemove", this.onMouseMove);
		this.canvas.addEventListener("mouseup", this.onMouseUp);
		this.canvas.addEventListener("contextmenu", this.onMouseUp);
		this.canvas.addEventListener("mousedown", this.onMouseDown);
		this.canvas.addEventListener("mouseleave", this.onMouseLeave);

		window.addEventListener("keydown", this.onKeyDown);
		window.addEventListener("keyup", this.onKeyUp);
	}

	cleanup() {
		this.canvas.removeEventListener("mousemove", this.onMouseMove);
		this.canvas.removeEventListener("mouseup", this.onMouseUp);
		this.canvas.removeEventListener("contextmenu", this.onMouseUp);
		this.canvas.removeEventListener("mousedown", this.onMouseDown);
		this.canvas.removeEventListener("mouseleave", this.onMouseLeave);

		window.removeEventListener("keydown", this.onKeyDown);
		window.removeEventListener("keyup", this.onKeyUp);
	}

	reset() {
		this.placingWire = null;
		this.placingChip = null;
		this.placingPin = null;
		this.previousPlacement = null;
		this.placingOffset = Vector2.ZERO;
		this.isPlacing = false;
	}

	onMouseMove = (event?: MouseEvent) => {
		if (event != null)
			this.setMousePosition(event);

		if (this.placingWire != null) {
			this.updateWirePlacement();
			return;
		}

		if (this.placingChip != null) {
			this.updateChipPlacement();
			return;
		}

		const isHoveringPinHandle = (pin: ControlledPin) => {
			const pinPositionY = pin.position.y * this.circuit.size.y;
			const top = pinPositionY - CONTROLLER.handleHeight / 2;
			const bottom = pinPositionY + CONTROLLER.handleHeight / 2;

			return (this.rawMousePosition.y > top && this.rawMousePosition.y < bottom);
		};

		if (this.placingPin != null) {
			let invalidPlacement = this.rawMousePosition.x > CONTROLLER.handleTrackWidth && this.rawMousePosition.x < this.circuit.size.x - CONTROLLER.handleTrackWidth;

			if (invalidPlacement) {
				this.cancelPinPlacement();
				return;
			}

			if (this.placingPin.isInput) {
				this.circuit.inputPins.forEach((pin, index) => {
					if (invalidPlacement || index == this.circuit.inputPins.length - 1)
						return;

					if (isHoveringPinHandle(pin))
						invalidPlacement = true;
				});
			} else {
				this.circuit.outputPins.forEach((pin, index) => {
					if (invalidPlacement || index == this.circuit.outputPins.length - 1)
						return;

					if (isHoveringPinHandle(pin))
						invalidPlacement = true;
				});
			}

			if (invalidPlacement) {
				this.cancelPinPlacement();
			} else {
				this.updatePinPlacement();
			}
		} else {
			if (this.rawMousePosition.x < CONTROLLER.handleTrackWidth) {
				let invalidPlacement = false;

				this.circuit.inputPins.forEach((pin) => {
					if (invalidPlacement)
						return;

					if (isHoveringPinHandle(pin))
						invalidPlacement = true;
				});

				if (!invalidPlacement)
					this.startPinPlacement(true);
			} else if (this.rawMousePosition.x > this.circuit.size.x - CONTROLLER.handleTrackWidth) {
				let invalidPlacement = false;

				this.circuit.outputPins.forEach((pin) => {
					if (invalidPlacement)
						return;

					if (isHoveringPinHandle(pin))
						invalidPlacement = true;
				});

				if (!invalidPlacement)
					this.startPinPlacement(false);
			}
		}
	};

	onClickPin(pin: Pin) {
		if (this.placingWire != null) {
			this.endWirePlacement(pin);
		} else {
			this.startWirePlacement(pin);
		}
	}

	onMouseUp = (event: MouseEvent) => {
		event.preventDefault();
		this.setMousePosition(event);

		if (event.button === 2) {
			if (this.placingWire != null)
				this.cancelWirePlacement();
			if (this.placingChip != null)
				this.cancelChipPlacement();
		} else if (event.button === 0) {
			let eventComplete = false;

			this.circuit.inputPins.forEach((pin: Pin) => {
				const rawPinPosition = pin.getRawPosition();
				if (this.rawMousePosition.getDistance(rawPinPosition.x - CONTROLLER.pinOffset, rawPinPosition.y) <= CONTROLLER.radius) {
					pin.setState(State.invert(pin.state));
					eventComplete = true;
				} else if (this.rawMousePosition.getDistance(rawPinPosition) <= PIN.radius) {
					this.onClickPin(pin);
					eventComplete = true;
				}
			});
	
			if (eventComplete)
				return;
	
			this.circuit.outputPins.forEach((pin: Pin) => {
				if (this.rawMousePosition.getDistance(pin.getRawPosition()) <= PIN.radius) {
					this.onClickPin(pin);
					eventComplete = true;
				}
			});
	
			if (eventComplete)
				return;

			this.circuit.chips.forEach((chip) => {
				chip.inputPins.concat(chip.outputPins).forEach((pin) => {
					if (this.rawMousePosition.getDistance(pin.getRawPosition()) <= PIN.radius) {
						this.onClickPin(pin);
						eventComplete = true;
					}
				});
			});

			if (eventComplete)
				return;
	
			if (this.placingWire != null)
				this.anchorWirePlacement();

			if (this.placingChip != null)
				this.endChipPlacement();

			if (this.placingPin != null)
				this.endPinPlacement();
		}
	};

	onMouseDown = (event: MouseEvent) => {
		event.preventDefault();
		this.setMousePosition(event);

		if (event.button !== 0 || this.isPlacing)
			return;

		this.circuit.chips.forEach((chip, index) => {
			if (!this.isPlacing && this.circuit.isPointInsideRect(chip, this.mousePosition)) {
				let hoveringPin = false;

				chip.inputPins.concat(chip.outputPins).forEach((pin) => {
					if (pin.position.getDistance(this.mousePosition.x, this.mousePosition.y) <= PIN.radius)
						hoveringPin = true;
				});

				if (!hoveringPin)
					this.editChipPlacement(chip, index);
			}
		});
	};

	onKeyDown = (event: KeyboardEvent) => {
		switch (event.key) {
			case "Shift":
				event.preventDefault();
				this.snapping = true;
				this.onMouseMove();
				break;
			case "Backspace":
			case "Delete":
			case "Escape":
				event.preventDefault();
				if (this.placingWire != null)
					this.cancelWirePlacement();
				if (this.placingChip != null)
					this.cancelChipPlacement();
				break;
		}
	};

	onKeyUp = (event: KeyboardEvent) => {
		switch (event.key) {
			case "Shift":
				event.preventDefault();
				this.snapping = false;
				this.onMouseMove();
				break;
		}
	};

	onMouseLeave = (_event: MouseEvent) => {
		// this.cancelPinPlacement();
	};

	startWirePlacement(pin: Pin) {
		const isInputPin = pin.isPointingRight;

		// Start wire placement
		const inputPin = isInputPin ? pin : undefined;
		const outputPin = !isInputPin ? pin : undefined;
		const anchorPoint = this.mousePosition.clone;

		this.placingWire = new Wire(this.circuit, "red", inputPin, outputPin, [anchorPoint]);

		if (!isInputPin)
			this.placingWire.placedBackwards = true;

		this.circuit.wires.push(this.placingWire);
	}

	snapWireHorizontally(lastAnchorPoint: Vector2, previousAnchorPoint: Vector2) {
		lastAnchorPoint.x = this.mousePosition.x;
		lastAnchorPoint.y = previousAnchorPoint.y;

		// Snapping horizontal wire to other wires
		let anchorPoints: Vector2[] = [];

		this.circuit.wires.forEach((wire, index) => {
			if (index < this.circuit.wires.length - 1)
				anchorPoints = anchorPoints.concat(wire.anchorPoints);
		});

		let closestPositionX: number | undefined;
		let closestDistance: number | undefined;

		anchorPoints.forEach((point) => {
			const distance = Math.abs(this.mousePosition.x - point.x);

			if (closestDistance == null || closestDistance > distance) {
				closestPositionX = point.x;
				closestDistance = distance;
			}
		});

		if (closestDistance != null && closestPositionX != null && closestDistance < WIRE.snappingSensitivity)
			lastAnchorPoint.x = closestPositionX;
	}

	snapWireVertically(lastAnchorPoint: Vector2, previousAnchorPoint: Vector2) {
		lastAnchorPoint.x = previousAnchorPoint.x;
		lastAnchorPoint.y = this.mousePosition.y;

		// Snapping vertical wire to pins
		let pins: Pin[];

		if (!this.placingWire?.placedBackwards) {
			pins = this.circuit.outputPins;

			this.circuit.chips.forEach((chip) => {
				pins = pins.concat(chip.inputPins);
			});
		} else {
			pins = this.circuit.inputPins;

			this.circuit.chips.forEach((chip) => {
				pins = pins.concat(chip.outputPins);
			});
		}

		let closestPositionY: number | undefined;
		let closestDistance: number | undefined;

		pins.forEach((pin) => {
			const distance = Math.abs(this.mousePosition.y - pin.position.y);

			if (closestDistance == null || closestDistance > distance) {
				closestPositionY = pin.position.y;
				closestDistance = distance;
			}
		});

		if (closestDistance !== undefined && closestPositionY !== undefined && closestDistance < WIRE.snappingSensitivity)
			lastAnchorPoint.y = closestPositionY;
	}

	updateWirePlacement() {
		const anchorCount = this.placingWire?.anchorPoints.length;
		if (anchorCount == null) return;
		const lastAnchorPoint = this.placingWire?.anchorPoints[anchorCount - 1];
		if (lastAnchorPoint == null) return;

		if (!this.snapping) {
			lastAnchorPoint.x = this.mousePosition.x;
			lastAnchorPoint.y = this.mousePosition.y;
		} else {
			// Wire snapping
			let previousAnchorPoint: Vector2 | undefined;

			if (anchorCount >= 2) {
				previousAnchorPoint = this.placingWire?.anchorPoints[anchorCount - 2];
			} else if (!this.placingWire?.placedBackwards) {
				previousAnchorPoint = this.placingWire?.inputPin.position;
			} else {
				previousAnchorPoint = this.placingWire?.outputPin.position;
			}

			if (previousAnchorPoint == null) return;
	
			const deltaX = Math.abs(this.mousePosition.x - previousAnchorPoint.x);
			const deltaY = Math.abs(this.mousePosition.y - previousAnchorPoint.y);
	
			if (deltaX > deltaY) {
				this.snapWireHorizontally(lastAnchorPoint, previousAnchorPoint);
			} else {
				this.snapWireVertically(lastAnchorPoint, previousAnchorPoint);
			}
		}
	}

	anchorWirePlacement() {
		this.placingWire?.anchorPoints.push(this.mousePosition.clone);
	}

	cancelWirePlacement() {
		this.placingWire = null;
		this.isPlacing = false;
		this.circuit.wires.pop();
	}

	endWirePlacement(pin: Pin) {
		const isInputPin = pin.isPointingRight;

		if (this.placingWire == null) return;

		let correctPlacement = false;
		if (!isInputPin && !this.placingWire.placedBackwards) {
			this.placingWire.outputPin = pin;
			correctPlacement = true;
		} else if (isInputPin && this.placingWire.placedBackwards) {
			this.placingWire.inputPin = pin;
			correctPlacement = true;
		}

		if (correctPlacement) {
			this.placingWire.anchorPoints.pop();
			this.placingWire.inputPin.addOutputWire(this.placingWire);
			this.placingWire.inputPin.update();

			this.placingWire = null;
			this.isPlacing = false;
		}
	}

	startChipPlacement(chip: Chip) {
		const newChip = new Chip(this.circuit, chip.name, chip.color, false, chip.inputCount, chip.outputCount);
		newChip.setLogic(chip.logic);
		newChip.position = new Vector2(
			this.mousePosition.x - (newChip.size.x / 2) / this.circuit.size.x,
			this.mousePosition.y - (newChip.size.y / 2) / this.circuit.size.y
		);

		this.placingChip = newChip;
		this.isPlacing = true;
		this.circuit.chips.push(newChip);
	}

	editChipPlacement(chip: Chip, index: number) {
		this.placingOffset = new Vector2(
			(chip.position.x + (chip.size.x / 2) / this.circuit.size.x) - this.mousePosition.x,
			(chip.position.y + (chip.size.y / 2) / this.circuit.size.y) - this.mousePosition.y
		);
		this.previousPlacement = chip.position.clone;
		this.circuit.chips.push(this.circuit.chips.splice(index, 1)[0]);

		this.placingChip = chip;
		this.isPlacing = true;
	}

	updateChipPlacement() {
		if (this.placingChip == null) return;
		this.placingChip.position.x = this.mousePosition.x - (this.placingChip.size.x / 2) / this.circuit.size.x + this.placingOffset.x;
		this.placingChip.position.y = this.mousePosition.y - (this.placingChip.size.y / 2) / this.circuit.size.y + this.placingOffset.y;
	}

	cancelChipPlacement() {
		if (this.placingChip == null) return;

		if (this.previousPlacement != null) {
			this.placingChip.position = this.previousPlacement;
			this.previousPlacement = null;
		} else {
			this.circuit.chips.pop();
		}

		this.placingChip = null;
		this.isPlacing = false;
	}

	endChipPlacement() {
		this.placingChip = null;
		this.isPlacing = false;
		this.placingOffset = Vector2.ZERO;
	}

	startPinPlacement(isInput: boolean) {
		const newPin = new ControlledPin(this.circuit, "PIN", isInput);

		newPin.position.x = (CONTROLLER.handleTrackWidth + CONTROLLER.pinOffset + CONTROLLER.radius) / this.circuit.size.x;
		newPin.position.y = this.mousePosition.y;

		if (isInput) {
			this.circuit.inputPins.push(newPin);
		} else {
			newPin.position.x = 1 - newPin.position.x;
			this.circuit.outputPins.push(newPin);
		}

		this.placingPin = newPin;
	}

	updatePinPlacement() {
		if (this.placingPin != null)
			this.placingPin.position.y = this.mousePosition.y;
	}

	cancelPinPlacement() {
		if (this.placingPin?.isInput) {
		 	this.circuit.inputPins.pop();
		} else {
			this.circuit.outputPins.pop();
		}

		this.placingPin = null;
	}

	endPinPlacement() {
		this.placingPin = null;
	}

	isPlacingPin(pin: Pin, index: number) {
		if (!pin.isControlled || this.placingPin == null || this.placingPin.isInput != pin.isInput)
			return false;

		if (pin.isInput) {
			return index == this.circuit.inputPins.length - 1;
		} else {
			return index == this.circuit.outputPins.length - 1;
		}
	}
}
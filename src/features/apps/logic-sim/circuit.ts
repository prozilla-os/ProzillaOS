import { BACKGROUND, COLORS, CURSORS, FONT, INPUT_OUTPUT, PIN } from "../../../config/apps/logicSim.config";
import Vector2 from "../../math/vector2";
import { Chip } from "./chip";
import { Pin } from "./pin";
import { State } from "./state";
import { Wire } from "./wire";

export class Circuit extends Chip {
	canvas: HTMLCanvasElement;
	size = Vector2.ZERO;
	context: CanvasRenderingContext2D;
	colors: { [key: string]: string } = {};
	mousePosition = Vector2.ZERO;
	isCircuit = true;

	isPlacing = false;
	snapping = false;
	placingWire: Wire;
	wires: Wire[] = [];
	placingChip: Chip;
	chips: Chip[] = [];

	cursor = CURSORS.default;

	constructor(name: string, color: string, inputCount: number, outputCount: number) {
		super(null, name, color, null, inputCount, outputCount);
	}

	resize() {
		this.size.x = this.canvas.clientWidth;
		this.size.y = this.canvas.clientHeight;

		// Set pin positions to the side of the screen
		this.inputPins.forEach((pin, index) => {
			const positionX = BACKGROUND.padding + BACKGROUND.borderWidth / 2 + INPUT_OUTPUT.pinOffset;
			const positionY = BACKGROUND.padding * 2 + (INPUT_OUTPUT.radius * 2 + 15) * index;
			pin.position = new Vector2(positionX, positionY);
		});
		this.outputPins.forEach((pin, index) => {
			const positionX = this.size.x - (BACKGROUND.padding + BACKGROUND.borderWidth / 2 + INPUT_OUTPUT.pinOffset);
			const positionY = BACKGROUND.padding * 2 + (INPUT_OUTPUT.radius * 2 + 15) * index;
			pin.position = new Vector2(positionX, positionY);
		});
	}

	setMousePosition(event: MouseEvent) {
		const rect = this.canvas.getBoundingClientRect();
		this.mousePosition.x = event.clientX - rect.left;
		this.mousePosition.y = event.clientY - rect.top;
	}

	init(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.context = this.canvas.getContext("2d");
		this.resize();
		this.mousePosition = Vector2.ZERO;

		// Detect size changes of canvas
		const observer = new ResizeObserver((entries) => {
			entries.forEach(({ target }) => {
				if (target === this.canvas && (target.clientWidth != this.size.x || target.clientHeight != this.size.y)) {
					this.resize();
				}
			});
		});

		observer.observe(this.canvas);

		this.canvas.addEventListener("mousemove", this.onMouseMove);
		this.canvas.addEventListener("click", this.onClick);
		this.canvas.addEventListener("contextmenu", this.onClick);

		window.addEventListener("keydown", this.onKeyDown);
		window.addEventListener("keyup", this.onKeyUp);

		this.render();
	}

	cleanup() {
		this.canvas.removeEventListener("mousemove", this.onMouseMove);
		this.canvas.removeEventListener("click", this.onClick);
		this.canvas.removeEventListener("contextmenu", this.onClick);

		window.removeEventListener("keydown", this.onKeyDown);
		window.removeEventListener("keyup", this.onKeyUp);
	}

	onMouseMove = (event?: MouseEvent) => {
		if (event != null)
			this.setMousePosition(event);

		if (this.placingWire != null) {
			const anchorCount = this.placingWire.anchorPoints.length;
			const lastAnchorPoint = this.placingWire.anchorPoints[anchorCount - 1];

			if (this.snapping) {
				const previousAnchorPoint = anchorCount >= 2
					? this.placingWire.anchorPoints[anchorCount - 2]
					: this.placingWire.inputPin.position;

				const deltaX = Math.abs(this.mousePosition.x - previousAnchorPoint.x);
				const deltaY = Math.abs(this.mousePosition.y - previousAnchorPoint.y);

				if (deltaX > deltaY) {
					lastAnchorPoint.x = this.mousePosition.x;
					lastAnchorPoint.y = previousAnchorPoint.y;
				} else {
					lastAnchorPoint.x = previousAnchorPoint.x;
					lastAnchorPoint.y = this.mousePosition.y;
				}
			} else {
				lastAnchorPoint.x = this.mousePosition.x;
				lastAnchorPoint.y = this.mousePosition.y;
			}
			
		}

		if (this.placingChip != null) {
			this.placingChip.position.x = this.mousePosition.x - this.placingChip.size.x / 2;
			this.placingChip.position.y = this.mousePosition.y - this.placingChip.size.y / 2;
		}
	};

	onClickPin(pin: Pin, isInputOutput = false) {
		const isInputPin = isInputOutput ? !pin.isInput : pin.isInput;

		if (this.placingWire != null) {
			if (isInputPin) {
				this.placingWire.outputPin = pin;
				this.placingWire.anchorPoints.pop();

				this.placingWire.inputPin.setOutputWire(this.placingWire);
				this.placingWire.inputPin.update();

				this.placingWire = null;
				this.isPlacing = false;
			}

			return;
		}

		const inputConnection = isInputPin ? null : pin;
		const outputConnection = isInputPin ? pin : null;
		const anchorPoint = this.mousePosition.clone;

		this.placingWire = new Wire(this, "red", inputConnection, outputConnection, [anchorPoint]);
		this.wires.push(this.placingWire);
	}

	onClick = (event: MouseEvent) => {
		event.preventDefault();
		this.setMousePosition(event);

		if (event.button === 2) {
			if (this.placingWire != null) {
				this.placingWire = null;
				this.isPlacing = false;
				this.wires.pop();
				return;
			}

			console.log(this);
		} else if (event.button === 0) {
			let eventComplete = false;

			this.inputPins.forEach((pin: Pin) => {
				if (this.mousePosition.getDistance(pin.position.x - INPUT_OUTPUT.pinOffset, pin.position.y) <= INPUT_OUTPUT.radius) {
					pin.setState(State.invert(pin.state));
					eventComplete = true;
				} else if (this.mousePosition.getDistance(pin.position.x, pin.position.y) <= PIN.radius) {
					this.onClickPin(pin, true);
					eventComplete = true;
				}
			});
	
			if (eventComplete)
				return;
	
			this.outputPins.forEach((pin: Pin) => {
				if (this.mousePosition.getDistance(pin.position.x, pin.position.y) <= PIN.radius) {
					this.onClickPin(pin, true);
					eventComplete = true;
				}
			});
	
			if (eventComplete)
				return;

			this.chips.forEach((chip) => {
				chip.inputPins.concat(chip.outputPins).forEach((pin) => {
					if (this.mousePosition.getDistance(pin.position.x, pin.position.y) <= PIN.radius) {
						this.onClickPin(pin);
						eventComplete = true;
					}
				});
			});

			if (eventComplete)
				return;
	
			// Create wire anchor point
			if (this.placingWire != null) {
				this.placingWire.anchorPoints.push(this.mousePosition.clone);
				return;
			}

			// Place chip
			if (this.placingChip != null) {
				this.placingChip = null;
				this.isPlacing = false;
				return;
			}
		}
	};

	onKeyDown = (event: KeyboardEvent) => {
		if (event.key === "Shift") {
			event.preventDefault();
			this.snapping = true;
			this.onMouseMove();
			return;
		}
	};

	onKeyUp = (event: KeyboardEvent) => {
		if (event.key === "Shift") {
			event.preventDefault();
			this.snapping = false;
			this.onMouseMove();
			return;
		}
	};

	addChip(chip: Chip) {
		const newChip = new Chip(this, chip.name, chip.color, chip.size, chip.inputCount, chip.outputCount);
		newChip.setLogic(chip.logic);
		newChip.position = new Vector2(
			this.mousePosition.x - newChip.size.x / 2,
			this.mousePosition.y - newChip.size.y / 2
		);

		this.placingChip = newChip;
		this.isPlacing = true;
		this.chips.push(newChip);
	}

	getColor(key: string) {
		if (this.colors[key] != null)
			return this.colors[key];

		const color = getComputedStyle(this.canvas).getPropertyValue("--" + key);

		this.colors[key] = color;
		return color;
	}

	drawRect(style: string, positionX: number, positionY: number, sizeX: number, sizeY: number) {
		this.context.fillStyle = style;
		this.context.fillRect(positionX, positionY, sizeX, sizeY);
	}

	drawCircle(style: string, positionX: number, positionY: number, radius: number) {
		this.context.beginPath();
		this.context.arc(positionX, positionY, radius, 0, 2 * Math.PI);

		this.context.fillStyle = style;
		this.context.fill();
	}

	drawLine(style: string, positions: Vector2[], width: number) {
		if (positions.length < 2)
			return;

		this.context.lineWidth = width;
		this.context.lineJoin = "round";
		this.context.lineCap = "round";

		this.context.beginPath();
		this.context.moveTo(positions[0].x, positions[0].y);

		for (let i = 1; i < positions.length; i++) {
			this.context.lineTo(positions[i].x, positions[i].y);
		}

		this.context.strokeStyle = style;
		this.context.stroke();
	}

	drawText(style: string, align: CanvasTextAlign, positionX: number, positionY: number, size: number, content: string) {
		this.context.fillStyle = style;
		this.context.textAlign = align;
		this.context.textBaseline = "middle";
		this.context.font = `bold ${size}px ${FONT}`;
		this.context.fillText(content, positionX, positionY);
	}

	drawBackground() {
		let offset = 0;
		this.drawRect(this.getColor(COLORS.background.outer), offset, offset, this.size.x, this.size.y);

		offset = BACKGROUND.padding - BACKGROUND.borderWidth;
		this.drawRect(
			this.getColor(COLORS.background.border),
			offset, offset,
			this.size.x - offset * 2, this.size.y - offset * 2
		);

		offset = BACKGROUND.padding;
		this.drawRect(
			this.getColor(COLORS.background.inner),
			offset, offset,
			this.size.x - offset * 2, this.size.y - offset * 2
		);
	}

	drawWires() {
		this.wires.forEach((wire, index) => {
			const isPlacingWire = this.placingWire != null && index == this.wires.length - 1;
			wire.draw(isPlacingWire);
		});
	}

	drawChips() {
		this.chips.forEach((chip) => { chip.draw(); });
	}

	drawInputOutput(state: State, isInteractable: boolean, positionX: number, positionY: number) {
		let color: string;

		if (isInteractable && this.mousePosition.getDistance(positionX, positionY) <= INPUT_OUTPUT.radius) {
			if (state.value === 1) {
				color = COLORS.inputOutput.onHover;
			} else {
				color = COLORS.inputOutput.offHover;
			}
			this.cursor = CURSORS.pointer;
		} else {
			if (state.value === 1) {
				color = COLORS.inputOutput.on;
			} else {
				color = COLORS.inputOutput.off;
			}
		}

		this.drawCircle(
			this.getColor(COLORS.inputOutput.stroke),
			positionX, positionY,
			INPUT_OUTPUT.radius
		);
		this.drawCircle(
			this.getColor(color),
			positionX, positionY,
			INPUT_OUTPUT.radius - INPUT_OUTPUT.borderWidth
		);
	}

	drawPins() {
		this.inputPins.forEach((pin) => {
			const positionX = pin.position.x - INPUT_OUTPUT.pinOffset;
			const positionY = pin.position.y;

			this.drawRect(
				this.getColor(COLORS.inputOutput.connector),
				positionX, positionY - INPUT_OUTPUT.connectorWidth / 2,
				INPUT_OUTPUT.pinOffset, INPUT_OUTPUT.connectorWidth
			);

			this.drawInputOutput(pin.state, true, positionX, positionY);
		});
		this.outputPins.forEach((pin) => {
			const positionX = pin.position.x + INPUT_OUTPUT.pinOffset;
			const positionY = pin.position.y;

			this.drawRect(
				this.getColor(COLORS.inputOutput.connector),
				positionX - INPUT_OUTPUT.pinOffset, positionY - INPUT_OUTPUT.connectorWidth / 2,
				INPUT_OUTPUT.pinOffset, INPUT_OUTPUT.connectorWidth
			);

			this.drawInputOutput(pin.state, false, positionX, pin.position.y);
		});

		super.drawPins(false);
	}

	draw() {
		this.drawBackground();
		this.drawWires();
		this.drawChips();
		this.drawPins();		
	}

	render() {
		if (this.canvas.width != this.size.x)
			this.canvas.width = this.size.x;
		if (this.canvas.height != this.size.y)
			this.canvas.height = this.size.y;

		this.cursor = CURSORS.default;

		this.draw();

		if (this.isPlacing) {
			this.canvas.style.cursor = CURSORS.default;
		} else {
			this.canvas.style.cursor = this.cursor;
		}

		window.requestAnimationFrame(() => {
			this.render();
		});
	}
}
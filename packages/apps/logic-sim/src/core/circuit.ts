import { Vector2 } from "@prozilla-os/core";
import { Chip, ChipJson } from "./chips/chip";
import { ControlledPin } from "./pins/controlledPin";
import { InputHandler } from "./inputHandler";
import { Wire, WireJson } from "./wires/wire";
import { BACKGROUND, COLORS, CONTROLLER, CURSORS, ENABLE_COLOR_CACHING, FONT } from "../constants/logicSim.const";
import { clamp } from "@prozilla-os/shared";

export interface CircuitJson extends ChipJson {
	wires: WireJson[];
	chips: ChipJson[];
}

export class Circuit extends Chip {
	canvas!: HTMLCanvasElement;
	size = Vector2.ZERO;
	context!: CanvasRenderingContext2D;
	colors: { [key: string]: string } = {};
	inputHandler: InputHandler;

	inputPins: ControlledPin[] = [];
	outputPins: ControlledPin[] = [];

	wires: Wire[] = [];
	chips: Chip[] = [];

	cursor = CURSORS.default;

	lastId = 0;

	constructor(name: string, color: string, inputCount: number, outputCount: number) {
		super(null, name, color, false, inputCount, outputCount);
		this.inputHandler = new InputHandler(this);
	}

	resize() {
		this.size.x = this.canvas.clientWidth;
		this.size.y = this.canvas.clientHeight;
	}

	init(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
		this.resize();

		// Detect size changes of canvas
		const observer = new ResizeObserver((entries) => {
			entries.forEach(({ target }) => {
				if (target === this.canvas && (target.clientWidth != this.size.x || target.clientHeight != this.size.y)) {
					this.resize();
				}
			});
		});

		observer.observe(this.canvas);

		this.inputHandler.init();

		this.render();
	}

	cleanup() {
		this.inputHandler.cleanup();
	}

	reset() {
		this.inputPins = [];
		this.outputPins = [];
		this.wires = [];
		this.chips = [];

		this.inputHandler.reset();
	}

	getColor(key: string) {
		if (this.colors[key] != null)
			return this.colors[key];

		const color = getComputedStyle(this.canvas).getPropertyValue("--" + key);

		if (ENABLE_COLOR_CACHING)
			this.colors[key] = color;

		return color;
	}

	isPointInsideRect(rect: { position: Vector2, size: Vector2 }, point: Vector2) {
		return point.x > rect.position.x && point.y > rect.position.y
			&& point.x < rect.position.x + rect.size.x && point.y < rect.position.y + rect.size.y;
	}

	getUniqueId() {
		return this.lastId++;
	}

	getTextRect(size: number, content: string) {
		this.context.textBaseline = "middle";
		this.context.font = `bold ${size}px ${FONT}`;
		const metrics = this.context.measureText(content);

		const width = metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft;
		const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

		return { x: width, y: height };
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

	drawCurvedLine(style: string, positions: Vector2[], width: number, radius: number, resolution: number) {
		if (positions.length < 2)
			return;

		this.context.lineWidth = width;
		this.context.lineJoin = "round";
		this.context.lineCap = "round";

		/**
		 * Based on https://github.com/SebLague/Digital-Logic-Sim/blob/main/Assets/Modules/Chip%20Creation/Scripts/Chip/Wires/WireRenderer.cs
		 * TO DO: optimize.
		 */

		const drawPoints: Vector2[] = [];
		drawPoints.push(positions[0]);

		for (let i = 1; i < positions.length - 1; i++) {
			const targetPoint = positions[i];
			const targetDir = Vector2.normalize(Vector2.subtract(positions[i], positions[i - 1]));
			const distanceToTarget = Vector2.magnitude(Vector2.subtract(positions[i], positions[i - 1]));
			const distanceToCurveStart = Math.max(distanceToTarget - radius, distanceToTarget / 2);

			const nextTargetDir = Vector2.normalize(Vector2.subtract(positions[i + 1], positions[i]));
			const nextLineLength = Vector2.magnitude(Vector2.subtract(positions[i + 1], positions[i]));

			const curveStartPoint = Vector2.add(positions[i - 1], Vector2.scale(targetDir, distanceToCurveStart));
			const curveEndPoint = Vector2.add(targetPoint, Vector2.scale(nextTargetDir, Math.min(radius, nextLineLength / 2)));

			// Bezier
			for (let j = 0; j < resolution; j++) {
				const t = j / (resolution - 1);
				const a = Vector2.lerp(curveStartPoint, targetPoint, t);
				const b = Vector2.lerp(targetPoint, curveEndPoint, t);
				const p = Vector2.lerp(a, b, t);

				if (Vector2.sqrDistance(p, drawPoints[drawPoints.length - 1]) > 0.001) {
					drawPoints.push(p);
				}
			}
		}

		drawPoints.push(positions[positions.length - 1]);

		this.context.beginPath();
		this.context.moveTo(drawPoints[0].x, drawPoints[0].y);

		for (let i = 1; i < drawPoints.length; i++) {
			this.context.lineTo(drawPoints[i].x, drawPoints[i].y);
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

	setDrawingOpacity(alpha: number) {
		this.context.globalAlpha = clamp(alpha, 0, 1);
	}

	resetDrawingOpacity() {
		this.setDrawingOpacity(1);
	}

	drawBackground() {
		const margin = CONTROLLER.handleTrackWidth;
		const padding = BACKGROUND.padding;

		this.drawRect(this.getColor(COLORS.background.margin), 0, 0, this.size.x, this.size.y);

		let offset = 0;

		this.drawRect(
			this.getColor(COLORS.background.outer),
			offset + margin, offset,
			this.size.x - margin * 2, this.size.y
		);

		offset = padding - BACKGROUND.borderWidth;
		this.drawRect(
			this.getColor(COLORS.background.border),
			offset + margin, offset,
			this.size.x - offset * 2 - margin * 2, this.size.y - offset * 2
		);

		offset = padding;
		this.drawRect(
			this.getColor(COLORS.background.inner),
			offset + margin, offset,
			this.size.x - offset * 2 - margin * 2, this.size.y - offset * 2
		);
	}

	drawWires() {
		this.wires.forEach((wire, index) => {
			const isPlacingWire = this.inputHandler.placingWire != null && index == this.wires.length - 1;
			wire.draw(isPlacingWire);
		});
	}

	drawChips() {
		this.chips.forEach((chip, index) => {
			const isPlacingChip = this.inputHandler.placingChip != null && index == this.chips.length - 1;
			chip.draw(isPlacingChip);
		});
	}

	draw() {
		this.drawBackground();
		this.drawWires();
		this.drawChips();
		super.drawPins(false);
	}

	render() {
		if (this.canvas.width != this.size.x)
			this.canvas.width = this.size.x;
		if (this.canvas.height != this.size.y)
			this.canvas.height = this.size.y;

		this.cursor = CURSORS.default;

		this.draw();

		if (this.inputHandler.isPlacing) {
			this.canvas.style.cursor = CURSORS.default;
		} else {
			this.canvas.style.cursor = this.cursor;
		}

		window.requestAnimationFrame(() => {
			this.render();
		});
	}

	toJson() {
		const object = super.toJson() as CircuitJson;

		if (this.wires.length > 0)
			object.wires = this.wires.map((wire) => wire.toJson());

		if (this.chips.length > 0)
			object.chips = this.chips.map((chip) => chip.toJson());

		return object;
	}

	toString(): string {
		const json = this.toJson();
		return JSON.stringify(json);
	}
}
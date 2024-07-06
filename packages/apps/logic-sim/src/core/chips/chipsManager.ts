import { Chip } from "./chip";
import { State } from "../_utils/state";
import { Circuit, CircuitJson } from "../circuit";
import { ControlledPin } from "../pins/controlledPin";
import { Pin } from "../pins/pin";
import { Wire } from "../wires/wire";
import { Vector2, VirtualFolder } from "@prozilla-os/core";

export class ChipsManager {
	static CHIPS: Record<string, Chip> = {
		AND: new Chip(null, "AND", "blue", true, 2, 1).setLogic((inputStates: State[]) => {
			if (inputStates[0].value === 1 && inputStates[1].value === 1) {
				return [State.HIGH];
			} else {
				return [State.LOW];
			}
		}),
		NOT: new Chip(null, "NOT", "red", true, 1, 1).setLogic((inputStates: State[]) => {
			return [State.invert(inputStates[0])];
		}),
	};

	static saveCircuit(circuit: Circuit, virtualFolder: VirtualFolder) {
		virtualFolder.createFile(circuit.name, "json", (file) => {
			file.setContent(circuit.toString());
		});
	}

	static loadCircuit(circuit: Circuit, virtualFolder: VirtualFolder) {
		circuit.reset();
		const virtualFile = virtualFolder.findFile(circuit.name, "json");

		if (virtualFile == null)
			return;

		virtualFile.read()?.then((content) => {
			const data = JSON.parse(content as string) as CircuitJson;

			circuit.color = data.color;
			circuit.name = data.name;

			const pins: { [id: number]: Pin } = {};

			// Load input pins
			circuit.inputCount = data.inputPins?.length ?? 0;
			data.inputPins?.forEach((pinData) => {
				const newPin = new ControlledPin(circuit, pinData.name, true, pinData.id);
				newPin.position = pinData.position as Vector2;

				circuit.inputPins.push(newPin);
				pins[pinData.id] = newPin;
			});

			// Load output pins
			circuit.outputCount = data.outputPins?.length ?? 0;
			data.outputPins?.forEach((pinData) => {
				const newPin = new ControlledPin(circuit, pinData.name, false, pinData.id);
				newPin.position = pinData.position as Vector2;

				circuit.outputPins.push(newPin);
				pins[pinData.id] = newPin;
			});

			// Load chips
			data.chips?.forEach((chipData) => {
				const newChip = new Chip(circuit, chipData.name, chipData.color, false, 0, 0);
				newChip.position = chipData.position as Vector2;

				// Load input pins
				newChip.inputCount = chipData.inputPins?.length ?? 0;
				chipData.inputPins?.forEach((pinData) => {
					const newPin = new Pin(circuit, pinData.name, true, newChip, pinData.id);
					newChip.inputPins.push(newPin);
					pins[pinData.id] = newPin;
				});

				// Load output pins
				newChip.outputCount = chipData.outputPins?.length ?? 0;
				chipData.outputPins?.forEach((pinData) => {
					const newPin = new Pin(circuit, pinData.name, false, newChip, pinData.id);
					newChip.outputPins.push(newPin);
					pins[pinData.id] = newPin;
				});

				// Load logic
				newChip.setLogic((ChipsManager.CHIPS[chipData.name]).logic);
				newChip.update();

				circuit.chips.push(newChip);
			});

			// Load wires
			data.wires?.forEach((wireData) => {
				const inputPin = pins[wireData.inputId];
				const outputPin = pins[wireData.outputId];
				const anchorPoints = wireData.anchorPoints as Vector2[] ?? [];

				const newWire = new Wire(circuit, wireData.color, inputPin, outputPin, anchorPoints);
				inputPin?.addOutputWire(newWire);
				circuit.wires.push(newWire);
			});
		}).catch((error) => {
			console.error(error);
		});
	}
}
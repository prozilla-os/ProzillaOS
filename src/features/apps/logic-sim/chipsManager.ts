import { CHIP } from "../../../config/apps/logicSim.config";
import Vector2 from "../../math/vector2";
import { Chip } from "./chip";
import { State } from "./state";

export class ChipsManager {
	static CHIPS = {
		AND: new Chip(null, "AND", "cyan", new Vector2(CHIP.width, CHIP.height), 2, 1).setLogic((inputStates: State[]) => {
			if (inputStates[0].value === 1 && inputStates[1].value === 1) {
				return [State.HIGH];
			} else {
				return [State.LOW];
			}
		}),
		NOT: new Chip(null, "NOT", "yellow", new Vector2(CHIP.width, CHIP.height), 1, 1).setLogic((inputStates: State[]) => {
			return [State.invert(inputStates[0])];
		}),
	};
}
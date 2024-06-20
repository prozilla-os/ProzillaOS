import { OptionalInterface } from "../../../types/utils";
import { Vector2 } from "../../math/vector2";

export interface ModalsConfigOptions {
	/**
	 * Default size of a dialog box
	 * @default new Vector2(400, 200)
	 */
	defaultDialogSize: Vector2;

	/**
	 * Default size of a file selector
	 * @default new Vector2(700, 400)
	 */
	defaultFileSelectorSize: Vector2;
}

export class ModalsConfig {
	defaultDialogSize: ModalsConfigOptions["defaultDialogSize"];
	defaultFileSelectorSize: ModalsConfigOptions["defaultFileSelectorSize"];

	constructor(options: OptionalInterface<ModalsConfigOptions> = {}) {
		const { defaultDialogSize, defaultFileSelectorSize } = options as ModalsConfigOptions;
		
		this.defaultDialogSize = defaultDialogSize ?? new Vector2(400, 200);
		this.defaultFileSelectorSize = defaultFileSelectorSize ?? new Vector2(700, 400);
	}
}
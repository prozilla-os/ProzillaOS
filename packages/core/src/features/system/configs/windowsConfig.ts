import { Vector2 } from "../../math/vector2";

export interface WindowsConfigOptions {
	/**
	 * @default 32
	 */
	screenMargin: number;

	/**
	 * @default "-"
	 */
	titleSeparator: string;

	/**
	 * If the user's screen is smaller than these values, windows will always be maximized
	 * @default new Vector2(350, 350)
	 */
	minScreenSize: Vector2;
}

export class WindowsConfig {
	screenMargin: WindowsConfigOptions["screenMargin"];
	titleSeparator: WindowsConfigOptions["titleSeparator"];
	minScreenSize: WindowsConfigOptions["minScreenSize"];

	constructor(options: Partial<WindowsConfigOptions> = {}) {
		const { screenMargin, titleSeparator, minScreenSize } = options as WindowsConfigOptions;
		
		this.screenMargin = screenMargin ?? 32;
		this.titleSeparator = titleSeparator ?? "-";
		this.minScreenSize = minScreenSize ?? new Vector2(350, 350);
	}
}
import { OptionalInterface } from "../../../types/global";

export interface MiscConfigOptions {
	/**
	 * The maximum time between two clicks to register as a double click (in ms)
	 * @default 250
	 * */
	doubleClickDelay: number;
}

export class MiscConfig {
	doubleClickDelay: MiscConfigOptions["doubleClickDelay"];

	constructor(options?: OptionalInterface<MiscConfigOptions>) {
		const { doubleClickDelay } = options as MiscConfigOptions;
		this.doubleClickDelay = doubleClickDelay ?? 250;
	}
}
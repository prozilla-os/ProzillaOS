import { OptionalInterface } from "../../../types/utils";

export interface VirtualDriveConfigOptions {
	[key: string]: unknown;
}

export class VirtualDriveConfig {
	constructor(_options: OptionalInterface<VirtualDriveConfigOptions> = {}) {
		// const { } = options as VirtualDriveConfigOptions;
	}
}
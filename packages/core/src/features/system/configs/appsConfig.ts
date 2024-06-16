import { OptionalInterface } from "../../../types/global";
import { App } from "../../apps";

export interface AppsConfigOptions {
	apps: App[];
}

export class AppsConfig {
	apps: AppsConfigOptions["apps"];

	constructor(options?: OptionalInterface<AppsConfigOptions>) {
		const { apps } = options as AppsConfigOptions;
		this.apps = apps ?? [];
	}
}
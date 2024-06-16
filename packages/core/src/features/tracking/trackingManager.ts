import ReactGA from "react-ga4";
import { UaEventOptions } from "react-ga4/types/ga4";
import { SystemManager } from "../system/systemManager";

export class TrackingManager {
	#systemManager: SystemManager;

	measurementId?: string | null;

	constructor(systemManager: SystemManager) {
		this.#systemManager = systemManager;
	}

	init(): this {
		const { trackingConfig } = this.#systemManager;
		this.measurementId = trackingConfig.enabled ? trackingConfig.GAMeasurementId : null;

		if (this.measurementId != null)
			ReactGA.initialize(this.measurementId);

		return this;
	}

	event(options: UaEventOptions | string) {
		console.info(options);

		if (this.measurementId == null)
			return;

		ReactGA.event(options);
	}
}

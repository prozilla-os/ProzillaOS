import ReactGA from "react-ga4";
import { GA_MEASUREMENT_ID } from "../../config/tracking.config";
import { UaEventOptions } from "react-ga4/types/ga4";

export class TrackingManager {
	static initialize() {
		if (GA_MEASUREMENT_ID != null)
			ReactGA.initialize(GA_MEASUREMENT_ID);
	}

	static event(options: UaEventOptions | string) {
		console.info(options);

		if (GA_MEASUREMENT_ID == null)
			return;

		ReactGA.event(options);
	}
}

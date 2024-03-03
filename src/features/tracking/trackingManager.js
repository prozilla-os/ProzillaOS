import ReactGA from "react-ga4";
import { GA_MEASUREMENT_ID } from "../../config/tracking.config.js";

export class TrackingManager {
	static initialize() {
		if (GA_MEASUREMENT_ID != null)
			ReactGA.initialize(GA_MEASUREMENT_ID);
	}

	/** @type {ReactGA["event"]} */
	static event(options) {
		console.info(options);

		if (GA_MEASUREMENT_ID == null)
			return;

		ReactGA.event(options);
	}
}

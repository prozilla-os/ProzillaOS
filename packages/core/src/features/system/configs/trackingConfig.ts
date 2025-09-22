export interface TrackingConfigOptions {
	/**
	 * Enable tracking
	 * @default true
	*/
	enabled: boolean;

	/** Google Analytics measurement ID */
	GAMeasurementId: string;
}

export class TrackingConfig {
	enabled: TrackingConfigOptions["enabled"];
	googleAnalyticsMeasurementId: TrackingConfigOptions["GAMeasurementId"];

	constructor(options: Partial<TrackingConfigOptions> = {}) {
		const { enabled, GAMeasurementId } = options as TrackingConfigOptions;
		
		this.enabled = enabled ?? true;
		this.googleAnalyticsMeasurementId = GAMeasurementId ?? "G-ZFQRR9DP3C";
	}
}
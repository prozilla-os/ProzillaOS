import { ReactElement } from "react";
import { appsConfig } from "./config/apps.config";
import { ProzillaOS, Router } from "prozilla-os";
import { defaultSkin } from "./config/skin.config";
import { trackingConfig } from "./config/tracking.config";
import { NAME, TAG_LINE } from "./config/branding.config";
import { virtualDriveConfig } from "./config/virtualDrive.config";

export function Main(): ReactElement {
	return (
		<ProzillaOS
			systemName={NAME}
			tagLine={TAG_LINE}
			skin={defaultSkin}
			config={{
				apps: appsConfig,
				tracking: trackingConfig, // Disabled - Requires Google Analytics.
				virtualDrive: virtualDriveConfig,
			}}
		>
			<Router />
		</ProzillaOS>
	);
}

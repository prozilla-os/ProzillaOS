import { ReactElement } from "react";
import { defaultSkin } from "./config/skin.config";
import { NAME, TAG_LINE } from "./config/branding.config";
import { appsConfig } from "./config/apps.config";
import { getViewportParams, ProzillaOS, Router, useSingleton } from "prozilla-os";
import { macOsSkin, minimalSkin, pixelSkin, windows95Skin } from "@prozilla-os/skins";

export function Main(): ReactElement {
	const skin = useSingleton(() => {
		const params = getViewportParams();

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (params.skin != null) {
			switch (params.skin) {
				case "mac":
					return macOsSkin;
				case "minimal":
					return minimalSkin;
				case "pixel":
					return pixelSkin;
				case "win95":
					return windows95Skin;
			}
		}

		return defaultSkin;
	});

	return <ProzillaOS
		systemName={NAME}
		tagLine={TAG_LINE}
		skin={skin}
		config={{
			apps: appsConfig,
		}}
	>
		<Router/>
	</ProzillaOS>;
}
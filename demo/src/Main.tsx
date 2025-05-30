import { ReactElement, useEffect, useState } from "react";
import { defaultSkin } from "./config/skin.config";
import { NAME, TAG_LINE } from "./config/branding.config";
import { appsConfig } from "./config/apps.config";
import { getViewportParams, ProzillaOS, Router } from "prozilla-os";
import { macOsSkin, minimalSkin, pixelSkin, windows95Skin } from "@prozilla-os/skins";

export function Main(): ReactElement {
	const [skin, setSkin] = useState(defaultSkin);

	useEffect(() => {
		const params = getViewportParams();

		if (params.skin == null)
			return;

		switch (params.skin) {
			case "mac":
				setSkin(macOsSkin);
				break;
			case "minimal":
				setSkin(minimalSkin);
				break;
			case "pixel":
				setSkin(pixelSkin);
				break;
			case "win95":
				setSkin(windows95Skin);
				break;
		}
	}, []);

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
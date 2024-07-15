import { ReactElement } from "react";
import { Router } from "./router/Router";
import { skin } from "./config/skin.config";
import { NAME, TAG_LINE } from "./config/branding.config";
import { appsConfig } from "./config/apps.config";
import { ProzillaOS } from "prozilla-os";

export function Main(): ReactElement {
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
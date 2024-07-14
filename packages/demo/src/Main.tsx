import { ReactElement } from "react";
import { Router } from "./router/Router";
import { desktopConfig } from "./config/desktop.config";
import { NAME, TAG_LINE } from "./config/branding.config";
import { appsConfig } from "./config/apps.config";
import { virtualDriveConfig } from "./config/virtualDrive.config";
import { ProzillaOS } from "prozilla-os";
import { macOsSkin } from "@prozilla-os/skins";

export function Main(): ReactElement {
	return <ProzillaOS
		systemName={NAME}
		tagLine={TAG_LINE}
		skin={macOsSkin}
		config={{
			desktop: desktopConfig,
			apps: appsConfig,
			virtualDrive: virtualDriveConfig,
		}}
	>
		<Router/>
	</ProzillaOS>;
}
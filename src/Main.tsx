import { ReactElement } from "react";
import { Router } from "./router/Router";
import { ProzillaOS } from "@prozilla-os/core";
import { desktopConfig } from "./config/desktop.config";

export function Main(): ReactElement {
	return <ProzillaOS
		config={{
			desktop: desktopConfig
		}}
	>
		<Router/>
	</ProzillaOS>;
};
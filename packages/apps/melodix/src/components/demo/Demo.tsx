import { Desktop, ModalsView, ProzillaOS, Taskbar, WindowsView } from "@prozilla-os/core";
import { appsConfig } from "../../config/demo/apps.config";

export function Demo() {
	return <ProzillaOS
		config={{
			apps: appsConfig
		}}
	>
		<Taskbar/>
		<WindowsView/>
		<ModalsView/>
		<Desktop/>
	</ProzillaOS>;
}
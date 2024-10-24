import { Desktop, ModalsView, ProzillaOS, Taskbar, WindowsView } from "prozilla-os";
import { defaultSkin } from "../config/skin.config";
import { appsConfig } from "../config/apps.config";
import { virtualDriveConfig } from "../config/virtualDrive.config";

export function App() {
	return (
		<ProzillaOS
			systemName="Portfolio"
			tagLine="ProzillaOS examples"
			skin={defaultSkin}
			config={{
				apps: appsConfig,
				virtualDrive: virtualDriveConfig,
			}}
		>
			<Taskbar/>
			<WindowsView/>
			<ModalsView/>
			<Desktop/>
		</ProzillaOS>
	);
}

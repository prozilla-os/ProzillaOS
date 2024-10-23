import { Desktop, ModalsView, ProzillaOS, Taskbar, WindowsView } from "prozilla-os";
import { appsConfig } from "../config/appsConfig";
import { defaultSkin } from "../config/skin.config";

export function App() {
	return (
		<ProzillaOS
			systemName="Portfolio"
			tagLine="Portfolio | ProzillaOS examples"
			skin={defaultSkin}
			config={{
				apps: appsConfig,
			}}
		>
			<Taskbar/>
			<WindowsView/>
			<ModalsView/>
			<Desktop/>
		</ProzillaOS>
	);
}

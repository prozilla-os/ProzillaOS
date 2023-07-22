import "./App.css";
import { Taskbar } from "./components/TaskBar.js";
import { WindowsManagerProvider } from "./hooks/WindowsManagerContext.js";
import { WindowsView } from "./components/WindowsView.js";
import { VirtualRootProvider } from "./hooks/VirtualRootContext.js";
import { SETTINGS } from "./config/settings.js";

function App() {
	return (
		<VirtualRootProvider>
			<WindowsManagerProvider>
				<div className="App" style={{ backgroundImage: `url(${SETTINGS.wallpaper})` }}>
					<Taskbar/>
					<WindowsView/>
				</div>
			</WindowsManagerProvider>
		</VirtualRootProvider>
	);
}

export default App;

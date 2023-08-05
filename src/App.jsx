import styles from "./App.module.css";
import { Taskbar } from "./components/task-bar/TaskBar.jsx";
import { WindowsManagerProvider } from "./hooks/windows/WindowsManagerContext.js";
import { WindowsView } from "./components/windows/WindowsView.jsx";
import { VirtualRootProvider } from "./hooks/virtual-drive/VirtualRootContext.js";
import { Desktop } from "./components/desktop/Desktop.jsx";
import { SettingsProvider } from "./hooks/settings/SettingsContext.js";

function App() {
	return (
		<VirtualRootProvider>
			<WindowsManagerProvider>
				<SettingsProvider>
					<div className={styles.App}>
						<Taskbar/>
						<WindowsView/>
						<Desktop/>
					</div>
				</SettingsProvider>
			</WindowsManagerProvider>
		</VirtualRootProvider>
	);
}

export default App;

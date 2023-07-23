import styles from "./App.module.css";
import { Taskbar } from "./components/task-bar/TaskBar.jsx";
import { WindowsManagerProvider } from "./hooks/windows/WindowsManagerContext.js";
import { WindowsView } from "./components/windows/WindowsView.jsx";
import { VirtualRootProvider } from "./hooks/virtual-drive/VirtualRootContext.js";
import { SETTINGS } from "./config/settings.js";

function App() {
	return (
		<VirtualRootProvider>
			<WindowsManagerProvider>
				<div className={styles.App} style={{ backgroundImage: `url(${SETTINGS.wallpaper})` }}>
					<Taskbar/>
					<WindowsView/>
				</div>
			</WindowsManagerProvider>
		</VirtualRootProvider>
	);
}

export default App;

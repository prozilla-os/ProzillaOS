import styles from "./App.module.css";
import { Taskbar } from "./components/task-bar/TaskBar.jsx";
import { WindowsManagerProvider } from "./hooks/windows/WindowsManagerContext.js";
import { WindowsView } from "./components/windows/WindowsView.jsx";
import { VirtualRootProvider } from "./hooks/virtual-drive/VirtualRootContext.js";
import { Desktop } from "./components/desktop/Desktop.jsx";
import { SettingsManagerProvider } from "./hooks/settings/SettingsContext.js";
import { ModalsView } from "./components/modals/ModalsView.jsx";
import { useEffect } from "react";

function App() {
	useEffect(() => {
		const onContextMenu = (event) => {
			event.preventDefault();
		};

		document.addEventListener("contextmenu", onContextMenu);

		return () => {
			document.removeEventListener("contextmenu", onContextMenu);
		};
	}, []);

	return (
		<VirtualRootProvider>
			<WindowsManagerProvider>
				<SettingsManagerProvider>
					<div className={styles.App}>
						<Taskbar/>
						<WindowsView/>
						<ModalsView/>
						<Desktop/>
					</div>
				</SettingsManagerProvider>
			</WindowsManagerProvider>
		</VirtualRootProvider>
	);
}

export default App;

import styles from "./App.module.css";
import { Taskbar } from "./components/taskbar/Taskbar.jsx";
import { WindowsManagerProvider } from "./hooks/windows/windowsManagerContext.js";
import { WindowsView } from "./components/windows/WindowsView.jsx";
import { VirtualRootProvider } from "./hooks/virtual-drive/virtualRootContext.js";
import { Desktop } from "./components/desktop/Desktop.jsx";
import { SettingsManagerProvider } from "./hooks/settings/settingsManagerContext.js";
import { ModalsView } from "./components/modals/ModalsView.jsx";
import { useEffect } from "react";
import { ZIndexManagerProvider } from "./hooks/z-index/zIndexManagerContext.js";

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
			<ZIndexManagerProvider>
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
			</ZIndexManagerProvider>
		</VirtualRootProvider>
	);
}

export default App;

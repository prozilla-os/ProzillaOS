import styles from "./App.module.css";
import { Taskbar } from "./components/taskbar/Taskbar";
import { WindowsManagerProvider } from "./hooks/windows/windowsManagerContext";
import { WindowsView } from "./components/windows/WindowsView";
import { VirtualRootProvider } from "./hooks/virtual-drive/virtualRootContext";
import { Desktop } from "./components/desktop/Desktop";
import { SettingsManagerProvider } from "./hooks/settings/settingsManagerContext";
import { ModalsView } from "./components/modals/ModalsView";
import { ReactElement, useEffect } from "react";
import { ZIndexManagerProvider } from "./hooks/z-index/zIndexManagerContext";
import { ModalsManagerProvider } from "./hooks/modals/modalsManagerContext";
import { ThemeProvider } from "./hooks/themes/themes";

export default function App(): ReactElement {
	useEffect(() => {
		const onContextMenu = (event: Event) => {
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
					<ModalsManagerProvider>
						<SettingsManagerProvider>
							<ThemeProvider>
								<div className={styles.App}>
									<Taskbar/>
									<WindowsView/>
									<ModalsView/>
									<Desktop/>
								</div>
							</ThemeProvider>
						</SettingsManagerProvider>
					</ModalsManagerProvider>
				</WindowsManagerProvider>
			</ZIndexManagerProvider>
		</VirtualRootProvider>
	);
};
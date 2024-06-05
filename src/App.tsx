import styles from "./App.module.css";
import { Taskbar } from "./components/taskbar/Taskbar";
import { WindowsView } from "./components/windows/WindowsView";
import { Desktop } from "./components/desktop/Desktop";
import { ModalsView } from "./components/modals/ModalsView";
import { ReactElement, useEffect } from "react";
import { ZIndexManagerProvider } from "./hooks/z-index/zIndexManagerProvider";
import { ThemeProvider } from "./hooks/themes/themes";
import { VirtualRootProvider } from "./hooks/virtual-drive/virtualRootProvider";
import { WindowsManagerProvider } from "./hooks/windows/windowsManagerProvider";
import { ModalsManagerProvider } from "./hooks/modals/modalsManagerProvider";
import { SettingsManagerProvider } from "./hooks/settings/settingsManagerProvider";

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

	return <VirtualRootProvider>
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
	</VirtualRootProvider>;
};
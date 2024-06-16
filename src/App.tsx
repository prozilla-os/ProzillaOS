import styles from "./App.module.css";
import { ReactElement, useEffect } from "react";
import { ZIndexManagerProvider } from "./hooks/z-index/zIndexManagerProvider";
import { ThemeProvider } from "./hooks/themes/themes";
import { VirtualRootProvider } from "./hooks/virtual-drive/virtualRootProvider";
import { WindowsManagerProvider } from "./hooks/windows/windowsManagerProvider";
import { ModalsManagerProvider } from "./hooks/modals/modalsManagerProvider";
import { SettingsManagerProvider } from "./hooks/settings/settingsManagerProvider";
import { Router } from "./components/router/Router";

export function App(): ReactElement {
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
								<Router/>
							</div>
						</ThemeProvider>
					</SettingsManagerProvider>
				</ModalsManagerProvider>
			</WindowsManagerProvider>
		</ZIndexManagerProvider>
	</VirtualRootProvider>;
};
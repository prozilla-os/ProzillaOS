import { memo, ReactElement, ReactNode } from "react";
import styles from "./ProzillaOS.module.css";
import { VirtualRootProvider } from "../../hooks/virtual-drive/virtualRootProvider";
import { ZIndexManagerProvider } from "../../hooks/z-index/zIndexManagerProvider";
import { WindowsManagerProvider } from "../../hooks/windows/windowsManagerProvider";
import { ModalsManagerProvider } from "../../hooks/modals/modalsManagerProvider";
import { SettingsManagerProvider } from "../../hooks/settings/settingsManagerProvider";
import { ThemeProvider } from "../../hooks/themes/themes";
import { SystemManagerParams } from "../../features/system/systemManager";
import { SystemManagerProvider } from "../../hooks/system/systemManagerProvider";
import { DesktopConfig, DesktopConfigOptions } from "../../features/system/configs/desktopConfig";
import { AppsConfig, AppsConfigOptions } from "../../features/system/configs/appsConfig";
import { MiscConfig, MiscConfigOptions } from "../../features/system/configs/miscConfig";
import { ModalsConfig, ModalsConfigOptions } from "../../features/system/configs/modalsConfig";
import { TaskbarConfig, TaskbarConfigOptions } from "../../features/system/configs/taskbarConfig";
import { TrackingConfig, TrackingConfigOptions } from "../../features/system/configs/trackingConfig";
import { WindowsConfig, WindowsConfigOptions } from "../../features/system/configs/windowsConfig";
import { OptionalInterface } from "../../types/global";
import { TrackingManagerProvider } from "../../hooks/tracking/trackingManagerProvider";

interface ProzillaOSProps {
	systemName?: string;
	tagLine?: string;
	config?: {
		apps?: OptionalInterface<AppsConfigOptions>;
		desktop?: OptionalInterface<DesktopConfigOptions>;
		misc?: OptionalInterface<MiscConfigOptions>;
		modals?: OptionalInterface<ModalsConfigOptions>;
		taskbar?: OptionalInterface<TaskbarConfigOptions>;
		tracking?: OptionalInterface<TrackingConfigOptions>;
		windows?: OptionalInterface<WindowsConfigOptions>;
	}
	children?: ReactNode;
}

export const ProzillaOS = memo(function(props: ProzillaOSProps): ReactElement {
	const { systemName, tagLine, config, children } = props;

	const systemParams = {
		systemName,
		tagLine,
		appsConfig: new AppsConfig(config?.apps),
		desktopConfig: new DesktopConfig(config?.desktop),
		miscConfig: new MiscConfig(config?.misc),
		modalsConfig: new ModalsConfig(config?.modals),
		taskbarConfig: new TaskbarConfig(config?.taskbar),
		trackingConfig: new TrackingConfig(config?.tracking),
		windowsConfig: new WindowsConfig(config?.windows)
	} as SystemManagerParams;

	return <SystemManagerProvider {...systemParams}>
		<VirtualRootProvider>
			<ZIndexManagerProvider>
				<TrackingManagerProvider>
					<WindowsManagerProvider>
						<ModalsManagerProvider>
							<SettingsManagerProvider>
								<ThemeProvider>
									<div
										onContextMenu={(event) => { event.preventDefault(); }}
										className={styles.ProzillaOS}
									>
										{children}
									</div>
								</ThemeProvider>
							</SettingsManagerProvider>
						</ModalsManagerProvider>
					</WindowsManagerProvider>
				</TrackingManagerProvider>
			</ZIndexManagerProvider>
		</VirtualRootProvider>
	</SystemManagerProvider>;
});
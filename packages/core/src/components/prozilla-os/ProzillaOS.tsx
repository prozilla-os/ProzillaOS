import { memo, ReactElement, ReactNode } from "react";
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
import { TrackingManagerProvider } from "../../hooks/tracking/trackingManagerProvider";
import { VirtualDriveConfig, VirtualDriveConfigOptions } from "../../features/system/configs/virtualDriveConfig";
import { Main } from "./Main";
import { Skin } from "@prozilla-os/skins";

export interface ProzillaOSProps {
	/** The name of the system */
	systemName?: string;
	/** The tagline/short description of the system */
	tagLine?: string;
	/** The system configuration */
	config?: {
		apps?: Partial<AppsConfigOptions>;
		desktop?: Partial<DesktopConfigOptions>;
		misc?: Partial<MiscConfigOptions>;
		modals?: Partial<ModalsConfigOptions>;
		taskbar?: Partial<TaskbarConfigOptions>;
		tracking?: Partial<TrackingConfigOptions>;
		windows?: Partial<WindowsConfigOptions>;
		virtualDrive?: Partial<VirtualDriveConfigOptions>;
	},
	skin?: Skin;
	children?: ReactNode;
}

/**
 * Main component that contains everything 
 */
export const ProzillaOS = memo(function(props: ProzillaOSProps): ReactElement {
	const { systemName, tagLine, skin, config, children } = props;

	const systemParams = {
		systemName,
		tagLine,
		skin,
		appsConfig: new AppsConfig(config?.apps),
		desktopConfig: new DesktopConfig(config?.desktop),
		miscConfig: new MiscConfig(config?.misc),
		modalsConfig: new ModalsConfig(config?.modals),
		taskbarConfig: new TaskbarConfig(config?.taskbar),
		trackingConfig: new TrackingConfig(config?.tracking),
		windowsConfig: new WindowsConfig(config?.windows),
		virtualDriveConfig: new VirtualDriveConfig(config?.virtualDrive),
	} as SystemManagerParams;

	return <SystemManagerProvider {...systemParams}>
		<VirtualRootProvider>
			<ZIndexManagerProvider>
				<TrackingManagerProvider>
					<WindowsManagerProvider>
						<ModalsManagerProvider>
							<SettingsManagerProvider>
								<ThemeProvider>
									<Main>
										{children}
									</Main>
								</ThemeProvider>
							</SettingsManagerProvider>
						</ModalsManagerProvider>
					</WindowsManagerProvider>
				</TrackingManagerProvider>
			</ZIndexManagerProvider>
		</VirtualRootProvider>
	</SystemManagerProvider>;
});
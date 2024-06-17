import { FC, ReactNode } from "react";
import { SystemManagerContext } from "./systemManagerContext";
import { SystemManager, SystemManagerParams } from "../../features/system/systemManager";

interface SystemManagerProviderProps {
	systemName: SystemManagerParams["systemName"];
	tagLine: SystemManagerParams["tagLine"];
	appsConfig: SystemManagerParams["appsConfig"];
	desktopConfig: SystemManagerParams["desktopConfig"];
	miscConfig: SystemManagerParams["miscConfig"];
	modalsConfig: SystemManagerParams["modalsConfig"];
	taskbarConfig: SystemManagerParams["taskbarConfig"];
	trackingConfig: SystemManagerParams["trackingConfig"];
	windowsConfig: SystemManagerParams["windowsConfig"];
	virtualDriveConfig: SystemManagerParams["virtualDriveConfig"];
	children: ReactNode;
}

export const SystemManagerProvider: FC<SystemManagerProviderProps> = (props) =>  {
	const { children, ...systemManagerParams } = props;
	const systemManager = new SystemManager(systemManagerParams);

	return <SystemManagerContext.Provider value={systemManager}>
		{children}
	</SystemManagerContext.Provider>;
};